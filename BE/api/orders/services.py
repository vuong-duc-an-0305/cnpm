"""
Service Layer - Business Logic cho Hóa đơn và Chi tiết đơn hàng
"""
from django.db import transaction
from django.db.models import Q, Count, Sum, Avg, F
from django.db.models.functions import TruncDate, Coalesce
from django.utils import timezone
from datetime import datetime, timedelta

from .models import HoaDon, ChiTietDonHang
from api.products.models import SanPham
from api.customers.services import CustomerService
from api.ingredients.services import IngredientService
from api.recipes.models import CongThuc


class OrderService:
    """Service xử lý business logic cho đơn hàng"""
    
    @staticmethod
    def get_all_orders(customer_id=None, employee_id=None, status=None, 
                       from_date=None, to_date=None, search=None):
        """
        Lấy danh sách đơn hàng với filter
        """
        queryset = HoaDon.objects.select_related(
            'CustomerID',
            'EmployeeID'
        ).annotate(
            items_count=Count('chitietdonhang')
        )
        
        if customer_id:
            queryset = queryset.filter(CustomerID=customer_id)
        
        if employee_id:
            queryset = queryset.filter(EmployeeID=employee_id)
        
        if status:
            queryset = queryset.filter(Status=status)
        
        if from_date:
            queryset = queryset.filter(OrderDate__gte=from_date)
        
        if to_date:
            # Thêm 1 ngày để bao gồm cả ngày to_date
            queryset = queryset.filter(OrderDate__lt=to_date + timedelta(days=1))
        
        if search:
            queryset = queryset.filter(
                Q(OrderID__icontains=search) |
                Q(CustomerID__FullName__icontains=search) |
                Q(CustomerID__PhoneNumber__icontains=search)
            )
        
        return queryset.order_by('-OrderDate')
    
    @staticmethod
    def get_order_by_id(order_id):
        """Lấy đơn hàng theo ID"""
        try:
            return HoaDon.objects.select_related(
                'CustomerID',
                'EmployeeID'
            ).prefetch_related(
                'chitietdonhang_set__ProductID'
            ).get(OrderID=order_id)
        except HoaDon.DoesNotExist:
            return None
    
    @staticmethod
    @transaction.atomic
    def create_order(order_data, items_data):
        """
        Tạo đơn hàng mới với chi tiết
        
        Args:
            order_data: Dict chứa thông tin đơn hàng
            items_data: List of dict chứa thông tin sản phẩm
        
        Returns:
            (success, message/order, errors)
        """
        # Kiểm tra nhân viên
        from api.employees.models import NhanVien
        try:
            employee = NhanVien.objects.get(EmployeeID=order_data['EmployeeID'])
        except NhanVien.DoesNotExist:
            return False, "Nhân viên không tồn tại", []
        
        # Kiểm tra khách hàng (nếu có)
        customer = None
        if order_data.get('CustomerID'):
            customer = CustomerService.get_customer_by_id(order_data['CustomerID'])
            if not customer:
                return False, "Khách hàng không tồn tại", []
        
        # Kiểm tra sản phẩm và tính toán
        order_details = []
        total_amount = 0
        errors = []
        
        for item in items_data:
            try:
                product = SanPham.objects.get(ProductID=item['ProductID'])
                
                # Kiểm tra sản phẩm còn hàng không
                if product.Status != 1:
                    errors.append(f"Sản phẩm '{product.ProductName}' hiện không có sẵn")
                    continue
                
                # Kiểm tra nguyên liệu đủ không
                is_available, missing = OrderService._check_ingredients_for_product(
                    product.ProductID,
                    item['Quantity']
                )
                
                if not is_available:
                    errors.append(f"Không đủ nguyên liệu cho '{product.ProductName}': {missing}")
                    continue
                
                # Tính toán
                unit_price = product.Price
                quantity = item['Quantity']
                subtotal = unit_price * quantity
                total_amount += subtotal
                
                order_details.append({
                    'product': product,
                    'quantity': quantity,
                    'unit_price': unit_price,
                    'subtotal': subtotal,
                    'topping_note': item.get('ToppingNote', '')
                })
                
            except SanPham.DoesNotExist:
                errors.append(f"Sản phẩm ID {item['ProductID']} không tồn tại")
        
        if errors:
            return False, "Có lỗi khi tạo đơn hàng", errors
        
        if not order_details:
            return False, "Không có sản phẩm hợp lệ trong đơn hàng", []
        
        # Tính giảm giá và thành tiền
        discount = order_data.get('Discount', 0)
        if discount > total_amount:
            discount = total_amount
        
        final_amount = total_amount - discount
        
        # Tạo hóa đơn
        order = HoaDon.objects.create(
            CustomerID=customer,
            EmployeeID=employee,
            TotalAmount=total_amount,
            Discount=discount,
            FinalAmount=final_amount,
            PaymentMethod=order_data.get('PaymentMethod', 'CASH'),
            Status='PENDING'
        )
        
        # Tạo chi tiết đơn hàng
        for detail in order_details:
            ChiTietDonHang.objects.create(
                OrderID=order,
                ProductID=detail['product'],
                Quantity=detail['quantity'],
                UnitPrice=detail['unit_price'],
                Subtotal=detail['subtotal'],
                ToppingNote=detail['topping_note']
            )
        
        # Trừ nguyên liệu
        OrderService._reduce_ingredients_for_order(order.OrderID)
        
        # Cộng điểm cho khách hàng (nếu có)
        if customer:
            CustomerService.add_points_from_order(customer.CustomerID, final_amount)
        
        return True, order, []
    
    @staticmethod
    def _check_ingredients_for_product(product_id, quantity):
        """Kiểm tra nguyên liệu có đủ không"""
        recipes = CongThuc.objects.filter(ProductID=product_id).select_related('IngredientID')
        
        missing = []
        for recipe in recipes:
            required = recipe.Quantity * quantity
            available = recipe.IngredientID.QuantityInStock
            
            if available < required:
                missing.append(
                    f"{recipe.IngredientID.IngredientName} (cần {required}, có {available})"
                )
        
        return len(missing) == 0, ', '.join(missing) if missing else ''
    
    @staticmethod
    @transaction.atomic
    def _reduce_ingredients_for_order(order_id):
        """Trừ nguyên liệu khi tạo đơn hàng"""
        order = OrderService.get_order_by_id(order_id)
        if not order:
            return
        
        for detail in order.chitietdonhang_set.all():
            recipes = CongThuc.objects.filter(
                ProductID=detail.ProductID
            ).select_related('IngredientID')
            
            for recipe in recipes:
                quantity_to_reduce = recipe.Quantity * detail.Quantity
                ingredient = recipe.IngredientID
                ingredient.QuantityInStock -= quantity_to_reduce
                ingredient.save()
    
    @staticmethod
    @transaction.atomic
    def _restore_ingredients_for_order(order_id):
        """Hoàn nguyên liệu khi hủy đơn hàng"""
        order = OrderService.get_order_by_id(order_id)
        if not order:
            return
        
        for detail in order.chitietdonhang_set.all():
            recipes = CongThuc.objects.filter(
                ProductID=detail.ProductID
            ).select_related('IngredientID')
            
            for recipe in recipes:
                quantity_to_restore = recipe.Quantity * detail.Quantity
                ingredient = recipe.IngredientID
                ingredient.QuantityInStock += quantity_to_restore
                ingredient.save()
    
    @staticmethod
    def update_order_status(order_id, new_status):
        """
        Cập nhật trạng thái đơn hàng
        
        Returns:
            (success, message, order)
        """
        order = OrderService.get_order_by_id(order_id)
        if not order:
            return False, "Không tìm thấy đơn hàng", None
        
        old_status = order.Status
        
        # Nếu hủy đơn, hoàn nguyên liệu
        if new_status == 'CANCELLED' and old_status != 'CANCELLED':
            OrderService._restore_ingredients_for_order(order_id)
        
        order.Status = new_status
        order.save()
        
        return True, "Cập nhật trạng thái thành công", order
    
    @staticmethod
    def delete_order(order_id):
        """Xóa đơn hàng (chỉ cho phép nếu đang ở trạng thái PENDING hoặc CANCELLED)"""
        order = OrderService.get_order_by_id(order_id)
        if not order:
            return False, "Không tìm thấy đơn hàng"
        
        if order.Status not in ['PENDING', 'CANCELLED']:
            return False, "Chỉ có thể xóa đơn hàng ở trạng thái Chờ xác nhận hoặc Đã hủy"
        
        # Hoàn nguyên liệu nếu chưa hủy
        if order.Status != 'CANCELLED':
            OrderService._restore_ingredients_for_order(order_id)
        
        order.delete()
        return True, "Xóa đơn hàng thành công"
    
    @staticmethod
    def get_revenue_statistics(from_date=None, to_date=None):
        """Thống kê doanh thu"""
        queryset = HoaDon.objects.filter(Status='COMPLETED')
        
        if from_date:
            queryset = queryset.filter(OrderDate__gte=from_date)
        
        if to_date:
            queryset = queryset.filter(OrderDate__lt=to_date + timedelta(days=1))
        
        stats = queryset.aggregate(
            total_orders=Count('OrderID'),
            total_revenue=Coalesce(Sum('FinalAmount'), 0),
            total_discount=Coalesce(Sum('Discount'), 0),
            average_order_value=Coalesce(Avg('FinalAmount'), 0)
        )
        
        # Thống kê theo ngày
        daily_stats = queryset.annotate(
            date=TruncDate('OrderDate')
        ).values('date').annotate(
            orders=Count('OrderID'),
            revenue=Sum('FinalAmount')
        ).order_by('date')
        
        return {
            'summary': stats,
            'daily': list(daily_stats)
        }
    
    @staticmethod
    def get_best_selling_products(from_date=None, to_date=None, limit=10):
        """Lấy sản phẩm bán chạy nhất"""
        queryset = ChiTietDonHang.objects.filter(
            OrderID__Status='COMPLETED'
        )
        
        if from_date:
            queryset = queryset.filter(OrderID__OrderDate__gte=from_date)
        
        if to_date:
            queryset = queryset.filter(OrderID__OrderDate__lt=to_date + timedelta(days=1))
        
        best_selling = queryset.values(
            'ProductID',
            'ProductID__ProductName'
        ).annotate(
            total_quantity=Sum('Quantity'),
            total_revenue=Sum('Subtotal'),
            order_count=Count('OrderID', distinct=True)
        ).order_by('-total_quantity')[:limit]
        
        return list(best_selling)
