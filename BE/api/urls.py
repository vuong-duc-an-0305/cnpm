"""
API URLs configuration
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.reports.views import export_report_xlsx

# Import routers từ các app
from api.categories.urls import router as categories_router
from api.products.urls import router as products_router
from api.ingredients.urls import router as ingredients_router
from api.recipes.urls import router as recipes_router
from api.customers.urls import router as customers_router
from api.employees.urls import router as employees_router
from api.orders.urls import router as orders_router
from api.inventory.urls import router as inventory_router

# Tạo main router
router = DefaultRouter()

# Extend router với các router con
router.registry.extend(categories_router.registry)
router.registry.extend(products_router.registry)
router.registry.extend(ingredients_router.registry)
router.registry.extend(recipes_router.registry)
router.registry.extend(customers_router.registry)
router.registry.extend(employees_router.registry)
router.registry.extend(orders_router.registry)
router.registry.extend(inventory_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
    path('reports/export.xlsx', export_report_xlsx),
]
