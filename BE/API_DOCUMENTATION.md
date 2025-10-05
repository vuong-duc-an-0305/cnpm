# Coffee Shop Management System - API Documentation

## Base URL
```
http://127.0.0.1:8000
```

## Mục lục
1. [Categories (Danh mục sản phẩm)](#categories)
2. [Products (Sản phẩm)](#products)
3. [Ingredients (Nguyên liệu)](#ingredients)
4. [Recipes (Công thức)](#recipes)
5. [Customers (Khách hàng)](#customers)
6. [Employees (Nhân viên)](#employees)
7. [Orders (Đơn hàng)](#orders)
8. [Inventory (Nhập kho)](#inventory)

---

## <a name="categories"></a>1. Categories (Danh mục sản phẩm)

### 1.1. Lấy danh sách danh mục
```http
GET /api/categories/
```

**Response:**
```json
[
    {
        "CategoryID": 1,
        "CategoryName": "Cà phê",
        "product_count": 10
    }
]
```

### 1.2. Tạo danh mục mới
```http
POST /api/categories/
```

**Request Body:**
```json
{
    "CategoryName": "Trà sữa"
}
```

### 1.3. Chi tiết danh mục
```http
GET /api/categories/{id}/
```

### 1.4. Cập nhật danh mục
```http
PUT /api/categories/{id}/
```

### 1.5. Xóa danh mục
```http
DELETE /api/categories/{id}/
```

---

## <a name="products"></a>2. Products (Sản phẩm)

### 2.1. Lấy danh sách sản phẩm
```http
GET /api/products/
GET /api/products/?category_id=1
GET /api/products/?status=1
GET /api/products/?search=cafe
```

**Response:**
```json
[
    {
        "ProductID": 1,
        "ProductName": "Cà phê đen",
        "Price": "25000.00",
        "ImageUrl": "http://...",
        "CategoryID": 1,
        "category_name": "Cà phê",
        "Status": 1,
        "status_display": "Còn hàng"
    }
]
```

### 2.2. Tạo sản phẩm mới
```http
POST /api/products/
```

**Request Body:**
```json
{
    "ProductName": "Cà phê sữa",
    "Price": 30000,
    "ImageUrl": "http://...",
    "CategoryID": 1,
    "Status": 1
}
```

### 2.3. Lấy sản phẩm còn hàng
```http
GET /api/products/available/
```

### 2.4. Kiểm tra nguyên liệu
```http
POST /api/products/{id}/check-ingredients/
```

**Request Body:**
```json
{
    "quantity": 5
}
```

**Response:**
```json
{
    "product_id": 1,
    "product_name": "Cà phê đen",
    "quantity": 5,
    "is_available": true,
    "missing_ingredients": []
}
```

### 2.5. Cập nhật trạng thái
```http
PATCH /api/products/{id}/update-status/
```

**Request Body:**
```json
{
    "status": 0
}
```

---

## <a name="ingredients"></a>3. Ingredients (Nguyên liệu)

### 3.1. Lấy danh sách nguyên liệu
```http
GET /api/ingredients/
GET /api/ingredients/?search=cafe
```

**Response:**
```json
[
    {
        "IngredientID": 1,
        "IngredientName": "Cà phê hạt",
        "QuantityInStock": "5000.000",
        "MinQuantity": "1000.000",
        "is_low_stock": false,
        "stock_percentage": 500.0
    }
]
```

### 3.2. Tạo nguyên liệu mới
```http
POST /api/ingredients/
```

**Request Body:**
```json
{
    "IngredientName": "Sữa tươi",
    "QuantityInStock": 100,
    "MinQuantity": 20
}
```

### 3.3. Nguyên liệu sắp hết
```http
GET /api/ingredients/low-stock/
```

### 3.4. Thêm tồn kho
```http
POST /api/ingredients/{id}/add-stock/
```

**Request Body:**
```json
{
    "quantity": 50,
    "note": "Nhập thêm kho"
}
```

### 3.5. Trừ tồn kho
```http
POST /api/ingredients/{id}/reduce-stock/
```

---

## <a name="recipes"></a>4. Recipes (Công thức)

### 4.1. Lấy danh sách công thức
```http
GET /api/recipes/
GET /api/recipes/?product_id=1
GET /api/recipes/?ingredient_id=1
```

**Response:**
```json
[
    {
        "ProductID": 1,
        "product_name": "Cà phê đen",
        "IngredientID": 1,
        "ingredient_name": "Cà phê hạt",
        "ingredient_stock": "5000.000",
        "Quantity": "20.000",
        "Unit": "gram"
    }
]
```

### 4.2. Tạo công thức mới
```http
POST /api/recipes/
```

**Request Body:**
```json
{
    "ProductID": 1,
    "IngredientID": 1,
    "Quantity": 20,
    "Unit": "gram"
}
```

### 4.3. Tạo công thức hàng loạt
```http
POST /api/recipes/bulk-create/
```

**Request Body:**
```json
{
    "ProductID": 1,
    "ingredients": [
        {
            "IngredientID": 1,
            "Quantity": 20,
            "Unit": "gram"
        },
        {
            "IngredientID": 2,
            "Quantity": 100,
            "Unit": "ml"
        }
    ]
}
```

### 4.4. Công thức theo sản phẩm
```http
GET /api/recipes/by-product/?product_id=1
```

### 4.5. Xóa công thức của sản phẩm
```http
DELETE /api/recipes/delete-by-product/?product_id=1
```

---

## <a name="customers"></a>5. Customers (Khách hàng)

### 5.1. Lấy danh sách khách hàng
```http
GET /api/customers/
GET /api/customers/?search=0901234567
```

**Response:**
```json
[
    {
        "CustomerID": 1,
        "FullName": "Nguyễn Văn A",
        "PhoneNumber": "0901234567",
        "Email": "nguyenvana@gmail.com",
        "LoyaltyPoints": 250,
        "membership_level": "Silver"
    }
]
```

### 5.2. Tạo khách hàng mới
```http
POST /api/customers/
```

**Request Body:**
```json
{
    "FullName": "Trần Thị B",
    "PhoneNumber": "0987654321",
    "Email": "tranthib@gmail.com"
}
```

### 5.3. Tìm theo số điện thoại
```http
GET /api/customers/by-phone/?phone=0901234567
```

### 5.4. Khách hàng VIP
```http
GET /api/customers/vip/
GET /api/customers/vip/?min_points=500
```

### 5.5. Thêm điểm
```http
POST /api/customers/{id}/add-points/
```

**Request Body:**
```json
{
    "points": 100,
    "note": "Khuyến mãi sinh nhật"
}
```

### 5.6. Đổi điểm
```http
POST /api/customers/{id}/redeem-points/
```

**Request Body:**
```json
{
    "points": 50,
    "note": "Đổi voucher giảm giá"
}
```

### 5.7. Lịch sử đơn hàng
```http
GET /api/customers/{id}/order-history/
```

---

## <a name="employees"></a>6. Employees (Nhân viên)

### 6.1. Lấy danh sách nhân viên
```http
GET /api/employees/
GET /api/employees/?work_shift=SANG
GET /api/employees/?job_title=Pha chế
```

**Response:**
```json
[
    {
        "EmployeeID": 1,
        "FullName": "Lê Văn C",
        "PhoneNumber": "0912345678",
        "JobTitle": "Pha chế",
        "WorkShift": "SANG",
        "work_shift_display": "Ca sáng"
    }
]
```

### 6.2. Tạo nhân viên mới
```http
POST /api/employees/
```

**Request Body:**
```json
{
    "FullName": "Phạm Thị D",
    "PhoneNumber": "0923456789",
    "JobTitle": "Thu ngân",
    "WorkShift": "CHIEU"
}
```

**Work Shifts:**
- `SANG`: Ca sáng
- `CHIEU`: Ca chiều
- `TOI`: Ca tối
- `FULL`: Full time

### 6.3. Nhân viên theo ca
```http
GET /api/employees/by-shift/?shift=SANG
```

### 6.4. Hiệu suất làm việc
```http
GET /api/employees/{id}/performance/
```

**Response:**
```json
{
    "employee_id": 1,
    "employee_name": "Lê Văn C",
    "total_orders": 150,
    "total_revenue": "45000000.00",
    "average_order_value": "300000.00",
    "total_imports": 20,
    "total_import_value": "15000000.00"
}
```

---

## <a name="orders"></a>7. Orders (Đơn hàng)

### 7.1. Lấy danh sách đơn hàng
```http
GET /api/orders/
GET /api/orders/?customer_id=1
GET /api/orders/?employee_id=1
GET /api/orders/?status=COMPLETED
GET /api/orders/?from_date=2024-01-01&to_date=2024-12-31
GET /api/orders/?search=0901234567
```

**Response:**
```json
[
    {
        "OrderID": 1,
        "CustomerID": 1,
        "customer_name": "Nguyễn Văn A",
        "EmployeeID": 1,
        "employee_name": "Lê Văn C",
        "OrderDate": "2024-01-15T10:30:00Z",
        "TotalAmount": "150000.00",
        "Discount": "15000.00",
        "FinalAmount": "135000.00",
        "PaymentMethod": "CASH",
        "Status": "COMPLETED",
        "status_display": "Hoàn thành",
        "items_count": 3
    }
]
```

### 7.2. Tạo đơn hàng mới
```http
POST /api/orders/
```

**Request Body:**
```json
{
    "CustomerID": 1,
    "EmployeeID": 1,
    "PaymentMethod": "CASH",
    "Discount": 0,
    "items": [
        {
            "ProductID": 1,
            "Quantity": 2,
            "ToppingNote": "Ít đường"
        },
        {
            "ProductID": 2,
            "Quantity": 1,
            "ToppingNote": ""
        }
    ]
}
```

**Payment Methods:**
- `CASH`: Tiền mặt
- `CARD`: Thẻ
- `MOMO`: MoMo
- `BANKING`: Chuyển khoản

**Order Status:**
- `PENDING`: Chờ xác nhận
- `PREPARING`: Đang chuẩn bị
- `COMPLETED`: Hoàn thành
- `CANCELLED`: Đã hủy

**Business Logic khi tạo đơn:**
1. Kiểm tra sản phẩm còn hàng
2. Kiểm tra nguyên liệu đủ không
3. Tự động trừ nguyên liệu
4. Tự động cộng điểm cho khách hàng (10,000đ = 1 điểm)
5. Tính tổng tiền, giảm giá, thành tiền

### 7.3. Chi tiết đơn hàng
```http
GET /api/orders/{id}/
```

**Response:**
```json
{
    "OrderID": 1,
    "CustomerID": 1,
    "customer": { ... },
    "EmployeeID": 1,
    "employee": { ... },
    "OrderDate": "2024-01-15T10:30:00Z",
    "TotalAmount": "150000.00",
    "Discount": "15000.00",
    "FinalAmount": "135000.00",
    "PaymentMethod": "CASH",
    "payment_method_display": "Tiền mặt",
    "Status": "COMPLETED",
    "status_display": "Hoàn thành",
    "order_details": [
        {
            "OrderDetailID": 1,
            "ProductID": 1,
            "product_name": "Cà phê đen",
            "Quantity": 2,
            "UnitPrice": "25000.00",
            "Subtotal": "50000.00",
            "ToppingNote": "Ít đường"
        }
    ]
}
```

### 7.4. Cập nhật trạng thái đơn hàng
```http
PATCH /api/orders/{id}/update-status/
```

**Request Body:**
```json
{
    "Status": "COMPLETED",
    "note": "Đã giao hàng"
}
```

**Lưu ý:** Khi hủy đơn (`CANCELLED`), hệ thống tự động hoàn nguyên liệu.

### 7.5. Xóa đơn hàng
```http
DELETE /api/orders/{id}/
```

**Lưu ý:** Chỉ có thể xóa đơn ở trạng thái `PENDING` hoặc `CANCELLED`.

### 7.6. Thống kê doanh thu
```http
GET /api/orders/revenue-stats/
GET /api/orders/revenue-stats/?from_date=2024-01-01&to_date=2024-12-31
```

**Response:**
```json
{
    "summary": {
        "total_orders": 1250,
        "total_revenue": "375000000.00",
        "total_discount": "12500000.00",
        "average_order_value": "300000.00"
    },
    "daily": [
        {
            "date": "2024-01-15",
            "orders": 45,
            "revenue": "13500000.00"
        }
    ]
}
```

### 7.7. Sản phẩm bán chạy
```http
GET /api/orders/best-selling/
GET /api/orders/best-selling/?from_date=2024-01-01&to_date=2024-12-31&limit=10
```

**Response:**
```json
{
    "best_selling_products": [
        {
            "ProductID": 1,
            "ProductID__ProductName": "Cà phê đen",
            "total_quantity": 450,
            "total_revenue": "11250000.00",
            "order_count": 320
        }
    ]
}
```

### 7.8. Đơn hàng theo khách hàng
```http
GET /api/orders/by-customer/?customer_id=1
```

### 7.9. Đơn hàng theo trạng thái
```http
GET /api/orders/by-status/?status=PENDING
```

---

## <a name="inventory"></a>8. Inventory (Nhập kho)

### 8.1. Lấy danh sách phiếu nhập kho
```http
GET /api/inventory/
GET /api/inventory/?employee_id=1
GET /api/inventory/?from_date=2024-01-01&to_date=2024-12-31
```

**Response:**
```json
[
    {
        "ImportID": 1,
        "EmployeeID": 1,
        "employee_name": "Lê Văn C",
        "ImportDate": "2024-01-10T09:00:00Z",
        "TotalAmount": "5000000.00",
        "items_count": 5
    }
]
```

### 8.2. Tạo phiếu nhập kho mới
```http
POST /api/inventory/
```

**Request Body:**
```json
{
    "EmployeeID": 1,
    "items": [
        {
            "IngredientID": 1,
            "Quantity": 5000,
            "UnitPrice": 200
        },
        {
            "IngredientID": 2,
            "Quantity": 100,
            "UnitPrice": 15000
        }
    ]
}
```

**Business Logic khi nhập kho:**
1. Kiểm tra nguyên liệu tồn tại
2. Tự động cộng vào `QuantityInStock`
3. Tính tổng tiền nhập

### 8.3. Chi tiết phiếu nhập kho
```http
GET /api/inventory/{id}/
```

**Response:**
```json
{
    "ImportID": 1,
    "EmployeeID": 1,
    "employee": { ... },
    "ImportDate": "2024-01-10T09:00:00Z",
    "TotalAmount": "5000000.00",
    "import_details": [
        {
            "ImportID": 1,
            "IngredientID": 1,
            "ingredient_name": "Cà phê hạt",
            "Quantity": "5000.000",
            "UnitPrice": "200.00",
            "subtotal": "1000000.00"
        }
    ],
    "items_count": 5
}
```

### 8.4. Xóa phiếu nhập kho
```http
DELETE /api/inventory/{id}/
```

**Lưu ý:** Khi xóa, hệ thống tự động trừ số lượng đã nhập khỏi `QuantityInStock`.

### 8.5. Thống kê nhập kho
```http
GET /api/inventory/statistics/
GET /api/inventory/statistics/?from_date=2024-01-01&to_date=2024-12-31
```

**Response:**
```json
{
    "summary": {
        "total_imports": 50,
        "total_cost": "75000000.00",
        "average_import_value": "1500000.00"
    },
    "top_ingredients": [
        {
            "IngredientID": 1,
            "IngredientID__IngredientName": "Cà phê hạt",
            "total_quantity": "25000.000",
            "total_cost": "5000000.00",
            "import_count": 15
        }
    ]
}
```

### 8.6. Lịch sử nhập nguyên liệu
```http
GET /api/inventory/ingredient-history/?ingredient_id=1
```

**Response:**
```json
[
    {
        "ImportID": 1,
        "IngredientID": 1,
        "ingredient_name": "Cà phê hạt",
        "Quantity": "5000.000",
        "UnitPrice": "200.00",
        "subtotal": "1000000.00"
    }
]
```

---

## Chi tiết đơn hàng (Order Details)

### Lấy chi tiết đơn hàng
```http
GET /api/order-details/
GET /api/order-details/?order_id=1
GET /api/order-details/?product_id=1
```

---

## Chi tiết nhập kho (Import Details)

### Lấy chi tiết nhập kho
```http
GET /api/import-details/
GET /api/import-details/?import_id=1
GET /api/import-details/?ingredient_id=1
```

---

## Error Responses

### 400 Bad Request
```json
{
    "error": "Validation error message",
    "details": ["Specific error 1", "Specific error 2"]
}
```

### 404 Not Found
```json
{
    "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
    "error": "Internal server error",
    "detail": "Error details"
}
```

---

## Pagination

Tất cả các list endpoints đều hỗ trợ pagination (20 items/page):

```http
GET /api/products/?page=2
```

**Response:**
```json
{
    "count": 100,
    "next": "http://127.0.0.1:8000/api/products/?page=3",
    "previous": "http://127.0.0.1:8000/api/products/?page=1",
    "results": [ ... ]
}
```

---

## Testing với cURL

### Tạo danh mục
```bash
curl -X POST http://127.0.0.1:8000/api/categories/ \
  -H "Content-Type: application/json" \
  -d '{"CategoryName": "Cà phê"}'
```

### Tạo đơn hàng
```bash
curl -X POST http://127.0.0.1:8000/api/orders/ \
  -H "Content-Type: application/json" \
  -d '{
    "CustomerID": 1,
    "EmployeeID": 1,
    "PaymentMethod": "CASH",
    "Discount": 0,
    "items": [
      {"ProductID": 1, "Quantity": 2, "ToppingNote": "Ít đường"}
    ]
  }'
```

---

## Notes

- Tất cả các date fields sử dụng format ISO 8601: `YYYY-MM-DDTHH:MM:SSZ`
- Decimal fields có độ chính xác: `max_digits=12, decimal_places=2` hoặc `3`
- API hiện tại đang ở chế độ `AllowAny` cho development
- Trong production nên bật authentication và thay đổi thành `IsAuthenticated`
