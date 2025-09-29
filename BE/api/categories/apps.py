from django.apps import AppConfig


class CategoriesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api.categories'
    verbose_name = 'Danh mục sản phẩm'
