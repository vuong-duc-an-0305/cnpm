"""
Signals cho Inventory app
"""
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import ChiTietNhapKho


@receiver(post_save, sender=ChiTietNhapKho)
def update_import_total_on_detail_save(sender, instance, created, **kwargs):
    """
    Tự động cập nhật tổng tiền của phiếu nhập kho khi chi tiết thay đổi
    """
    import_receipt = instance.ImportID
    import_receipt.TotalAmount = import_receipt.calculate_total()
    import_receipt.save()


@receiver(post_delete, sender=ChiTietNhapKho)
def update_import_total_on_detail_delete(sender, instance, **kwargs):
    """
    Tự động cập nhật tổng tiền của phiếu nhập kho khi xóa chi tiết
    """
    import_receipt = instance.ImportID
    import_receipt.TotalAmount = import_receipt.calculate_total()
    import_receipt.save()
