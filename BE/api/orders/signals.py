"""
Signals cho Orders app
"""
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import ChiTietDonHang


@receiver(post_save, sender=ChiTietDonHang)
def update_order_total_on_detail_save(sender, instance, created, **kwargs):
    """
    Tự động cập nhật tổng tiền của hóa đơn khi chi tiết thay đổi
    """
    order = instance.OrderID
    order.TotalAmount = order.calculate_total()
    order.FinalAmount = order.calculate_final_amount()
    order.save()


@receiver(post_delete, sender=ChiTietDonHang)
def update_order_total_on_detail_delete(sender, instance, **kwargs):
    """
    Tự động cập nhật tổng tiền của hóa đơn khi xóa chi tiết
    """
    order = instance.OrderID
    order.TotalAmount = order.calculate_total()
    order.FinalAmount = order.calculate_final_amount()
    order.save()
