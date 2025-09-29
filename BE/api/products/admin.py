"""
Admin configuration cho Products
"""
from django.contrib import admin
from .models import SanPham


@admin.register(SanPham)
class SanPhamAdmin(admin.ModelAdmin):
    list_display = ['ProductID', 'ProductName', 'Price', 'CategoryID', 'Status']
    list_filter = ['Status', 'CategoryID']
    search_fields = ['ProductName', 'CategoryID__CategoryName']
    ordering = ['ProductName']
    list_per_page = 20
