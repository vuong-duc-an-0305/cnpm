from django.apps import AppConfig


class InventoryConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api.inventory'
    verbose_name = 'Nhập kho'
    
    def ready(self):
        import api.inventory.signals
