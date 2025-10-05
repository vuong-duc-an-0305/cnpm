# Quick Start Guide - Coffee Shop API

## ⚡ Cài đặt nhanh (5 phút)

### Bước 1: Chuẩn bị
```bash
# Di chuyển vào thư mục BE
cd BE

# Kích hoạt virtual environment
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

### Bước 2: Cài đặt PostgreSQL
1. Tải PostgreSQL: https://www.postgresql.org/download/
2. Cài đặt và nhớ password của user `postgres`
3. Mở pgAdmin hoặc psql
4. Tạo database:
```sql
CREATE DATABASE coffee_db;
```

### Bước 3: Cấu hình .env
Tạo file `.env` trong thư mục BE:
```env
SECRET_KEY=django-insecure-xs5#k0fzny7wc+uly8&da!b9gu(wqw8cwm54s5vnx0fl#^alrn
DEBUG=True

DB_NAME=coffee_db
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
```

### Bước 4: Cài đặt packages
```bash
pip install -r requirements.txt
```

### Bước 5: Chạy migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Bước 6: Tạo superuser (tùy chọn)
```bash
python manage.py createsuperuser
```

### Bước 7: Chạy server
```bash
python manage.py runserver
```

## ✅ Kiểm tra

### 1. Truy cập API Root
```
http://127.0.0.1:8000/
```

Bạn sẽ thấy:
```json
{
    "message": "Chào mừng đến với Coffee Shop Management API",
    "version": "1.0.0",
    "endpoints": { ... }
}
```

### 2. Truy cập Admin Panel
```
http://127.0.0.1:8000/admin/
```

### 3. Test API endpoints
```bash
# Lấy danh sách danh mục
curl http://127.0.0.1:8000/api/categories/

# Tạo danh mục mới
curl -X POST http://127.0.0.1:8000/api/categories/ \
  -H "Content-Type: application/json" \
  -d '{"CategoryName": "Cà phê"}'
```

## 🎯 Dữ liệu mẫu (Demo Data)

Tạo file `load_sample_data.py` trong thư mục BE:

```python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BE_coffee.settings')
django.setup()

from api.categories.models import DanhMucSanPham
from api.products.models import SanPham
from api.ingredients.models import NguyenLieu
from api.customers.models import KhachHang
from api.employees.models import NhanVien

# Tạo danh mục
cafe = DanhMucSanPham.objects.create(CategoryName="Cà phê")
tra = DanhMucSanPham.objects.create(CategoryName="Trà")
trasua = DanhMucSanPham.objects.create(CategoryName="Trà sữa")

# Tạo nguyên liệu
cafe_hat = NguyenLieu.objects.create(
    IngredientName="Cà phê hạt",
    QuantityInStock=5000,
    MinQuantity=1000
)
sua = NguyenLieu.objects.create(
    IngredientName="Sữa tươi",
    QuantityInStock=2000,
    MinQuantity=500
)
duong = NguyenLieu.objects.create(
    IngredientName="Đường",
    QuantityInStock=3000,
    MinQuantity=500
)

# Tạo sản phẩm
cafe_den = SanPham.objects.create(
    ProductName="Cà phê đen",
    Price=25000,
    CategoryID=cafe,
    Status=1
)
cafe_sua = SanPham.objects.create(
    ProductName="Cà phê sữa",
    Price=30000,
    CategoryID=cafe,
    Status=1
)

# Tạo nhân viên
nv1 = NhanVien.objects.create(
    FullName="Nguyễn Văn A",
    PhoneNumber="0901234567",
    JobTitle="Pha chế",
    WorkShift="SANG"
)

# Tạo khách hàng
kh1 = KhachHang.objects.create(
    FullName="Trần Thị B",
    PhoneNumber="0987654321",
    Email="tranthib@gmail.com",
    LoyaltyPoints=100
)

print("✅ Đã tạo dữ liệu mẫu thành công!")
print(f"- {DanhMucSanPham.objects.count()} danh mục")
print(f"- {SanPham.objects.count()} sản phẩm")
print(f"- {NguyenLieu.objects.count()} nguyên liệu")
print(f"- {NhanVien.objects.count()} nhân viên")
print(f"- {KhachHang.objects.count()} khách hàng")
```

Chạy:
```bash
python load_sample_data.py
```

## 🔥 Các endpoints thường dùng

### Danh mục
```bash
GET    /api/categories/          # Lấy danh sách
POST   /api/categories/          # Tạo mới
GET    /api/categories/1/        # Chi tiết
PUT    /api/categories/1/        # Cập nhật
DELETE /api/categories/1/        # Xóa
```

### Sản phẩm
```bash
GET  /api/products/                     # Lấy danh sách
GET  /api/products/?category_id=1       # Lọc theo danh mục
GET  /api/products/available/           # Sản phẩm còn hàng
POST /api/products/                     # Tạo mới
```

### Đơn hàng
```bash
POST /api/orders/                       # Tạo đơn mới
GET  /api/orders/                       # Danh sách đơn
GET  /api/orders/?status=PENDING        # Lọc theo trạng thái
GET  /api/orders/revenue-stats/         # Thống kê doanh thu
```

### Nhập kho
```bash
POST /api/inventory/                    # Tạo phiếu nhập
GET  /api/inventory/                    # Danh sách phiếu nhập
GET  /api/inventory/statistics/         # Thống kê nhập kho
```

## 📚 Tài liệu chi tiết

- **API Documentation**: Xem file `API_DOCUMENTATION.md`
- **README**: Xem file `README.md`
- **Admin Panel**: http://127.0.0.1:8000/admin/

## 🐛 Troubleshooting

### Lỗi "No module named 'psycopg2'"
```bash
pip install psycopg2-binary
```

### Lỗi kết nối database
- Kiểm tra PostgreSQL đã chạy chưa
- Kiểm tra thông tin trong `.env` đúng chưa
- Thử ping: `psql -U postgres -h localhost`

### Lỗi migrations
```bash
python manage.py migrate --run-syncdb
```

### Port 8000 đã được sử dụng
```bash
python manage.py runserver 8001
```

## 🚀 Bước tiếp theo

1. Đọc `API_DOCUMENTATION.md` để hiểu rõ các endpoints
2. Test API với Postman hoặc cURL
3. Tích hợp với Frontend
4. Thêm authentication cho production
5. Deploy lên server

## 💡 Tips

- Sử dụng Admin Panel để quản lý dữ liệu nhanh
- Xem logs trong console khi có lỗi
- Dùng Django Debug Toolbar trong development
- Backup database thường xuyên

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy:
1. Kiểm tra logs trong console
2. Xem file README.md và API_DOCUMENTATION.md
3. Kiểm tra database connection
4. Đảm bảo tất cả packages đã được cài đặt

Chúc bạn code vui vẻ! 🎉
