# Coffee Shop Management System API

API Backend cho hệ thống quản lý quán cafe sử dụng Django REST Framework.

## 📋 Tính năng

### 1. **Quản lý Danh mục Sản phẩm (Categories)**
- CRUD danh mục sản phẩm
- Xem số lượng sản phẩm trong mỗi danh mục

### 2. **Quản lý Sản phẩm (Products)**
- CRUD sản phẩm
- Lọc sản phẩm theo danh mục, trạng thái
- Tìm kiếm sản phẩm
- Kiểm tra nguyên liệu có đủ để làm sản phẩm
- Cập nhật trạng thái sản phẩm

### 3. **Quản lý Nguyên liệu (Ingredients)**
- CRUD nguyên liệu
- Cảnh báo nguyên liệu sắp hết
- Cập nhật tồn kho (thêm/trừ)

### 4. **Quản lý Công thức (Recipes)**
- CRUD công thức cho sản phẩm
- Xem nguyên liệu của từng sản phẩm
- Xem sản phẩm sử dụng nguyên liệu nào
- Tạo công thức hàng loạt

### 5. **Quản lý Khách hàng (Customers)**
- CRUD khách hàng
- Tìm kiếm theo SĐT, email
- Quản lý điểm thành viên
- Xem lịch sử mua hàng
- Phân loại khách hàng VIP

### 6. **Quản lý Nhân viên (Employees)**
- CRUD nhân viên
- Quản lý ca làm việc
- Xem hiệu suất làm việc

### 7. **Quản lý Đơn hàng (Orders)**
- Tạo đơn hàng mới
- Tự động kiểm tra nguyên liệu
- Tự động trừ nguyên liệu khi tạo đơn
- Tự động cộng điểm cho khách hàng
- Cập nhật trạng thái đơn hàng
- Thống kê doanh thu
- Xem sản phẩm bán chạy

### 8. **Quản lý Nhập kho (Inventory)**
- Tạo phiếu nhập kho
- Tự động cộng vào tồn kho
- Xem lịch sử nhập kho
- Thống kê nhập kho

## 🏗️ Kiến trúc

Dự án sử dụng **Layered Architecture**:

```
api/
├── categories/
│   ├── models.py         # Data models
│   ├── serializers.py    # Data validation & serialization
│   ├── services.py       # Business logic
│   ├── views.py          # API endpoints
│   ├── urls.py           # URL routing
│   └── admin.py          # Admin interface
├── products/
├── ingredients/
├── recipes/
├── customers/
├── employees/
├── orders/
└── inventory/
```

**Phân tách rõ ràng:**
- **Models**: Định nghĩa cấu trúc dữ liệu
- **Serializers**: Validate và chuyển đổi dữ liệu
- **Services**: Xử lý business logic
- **Views**: Xử lý HTTP requests/responses
- **Signals**: Tự động xử lý sự kiện

## 🚀 Cài đặt

### 1. Clone repository

```bash
cd BE
```

### 2. Tạo virtual environment

```bash
python -m venv venv
```

### 3. Kích hoạt virtual environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 4. Cài đặt dependencies

```bash
pip install -r requirements.txt
```

### 5. Cấu hình database

Tạo file `.env` từ `.env.example`:

```bash
copy .env.example .env  # Windows
cp .env.example .env    # Linux/Mac
```

Cập nhật thông tin database trong `.env`:

```env
DB_NAME=coffee_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### 6. Tạo database

Mở PostgreSQL và tạo database:

```sql
CREATE DATABASE coffee_db;
```

### 7. Chạy migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 8. Tạo superuser

```bash
python manage.py createsuperuser
```

### 9. Chạy development server

```bash
python manage.py runserver
```

Server sẽ chạy tại: http://127.0.0.1:8000/

## 📚 API Endpoints

### **Danh mục Sản phẩm**
- `GET /api/categories/` - Lấy danh sách
- `POST /api/categories/` - Tạo mới
- `GET /api/categories/{id}/` - Chi tiết
- `PUT /api/categories/{id}/` - Cập nhật
- `DELETE /api/categories/{id}/` - Xóa

### **Sản phẩm**
- `GET /api/products/` - Lấy danh sách
- `POST /api/products/` - Tạo mới
- `GET /api/products/{id}/` - Chi tiết
- `PUT /api/products/{id}/` - Cập nhật
- `DELETE /api/products/{id}/` - Xóa
- `GET /api/products/available/` - Sản phẩm còn hàng
- `POST /api/products/{id}/check-ingredients/` - Kiểm tra nguyên liệu

### **Nguyên liệu**
- `GET /api/ingredients/` - Lấy danh sách
- `POST /api/ingredients/` - Tạo mới
- `GET /api/ingredients/{id}/` - Chi tiết
- `PUT /api/ingredients/{id}/` - Cập nhật
- `DELETE /api/ingredients/{id}/` - Xóa
- `GET /api/ingredients/low-stock/` - Nguyên liệu sắp hết
- `POST /api/ingredients/{id}/add-stock/` - Thêm tồn kho
- `POST /api/ingredients/{id}/reduce-stock/` - Trừ tồn kho

### **Công thức**
- `GET /api/recipes/` - Lấy danh sách
- `POST /api/recipes/` - Tạo mới
- `GET /api/recipes/by-product/?product_id={id}` - Công thức của sản phẩm
- `POST /api/recipes/bulk-create/` - Tạo hàng loạt
- `DELETE /api/recipes/delete-by-product/?product_id={id}` - Xóa công thức

### **Khách hàng**
- `GET /api/customers/` - Lấy danh sách
- `POST /api/customers/` - Tạo mới
- `GET /api/customers/{id}/` - Chi tiết
- `PUT /api/customers/{id}/` - Cập nhật
- `DELETE /api/customers/{id}/` - Xóa
- `GET /api/customers/by-phone/?phone={phone}` - Tìm theo SĐT
- `GET /api/customers/vip/` - Khách hàng VIP
- `POST /api/customers/{id}/add-points/` - Thêm điểm
- `POST /api/customers/{id}/redeem-points/` - Đổi điểm

### **Nhân viên**
- `GET /api/employees/` - Lấy danh sách
- `POST /api/employees/` - Tạo mới
- `GET /api/employees/{id}/` - Chi tiết
- `PUT /api/employees/{id}/` - Cập nhật
- `DELETE /api/employees/{id}/` - Xóa
- `GET /api/employees/by-shift/?shift={shift}` - Theo ca làm
- `GET /api/employees/{id}/performance/` - Hiệu suất

### **Đơn hàng**
- `GET /api/orders/` - Lấy danh sách
- `POST /api/orders/` - Tạo đơn hàng mới
- `GET /api/orders/{id}/` - Chi tiết
- `DELETE /api/orders/{id}/` - Xóa
- `PATCH /api/orders/{id}/update-status/` - Cập nhật trạng thái
- `GET /api/orders/revenue-stats/` - Thống kê doanh thu
- `GET /api/orders/best-selling/` - Sản phẩm bán chạy

### **Nhập kho**
- `GET /api/inventory/` - Lấy danh sách
- `POST /api/inventory/` - Tạo phiếu nhập
- `GET /api/inventory/{id}/` - Chi tiết
- `DELETE /api/inventory/{id}/` - Xóa
- `GET /api/inventory/statistics/` - Thống kê
- `GET /api/inventory/ingredient-history/?ingredient_id={id}` - Lịch sử nhập

## 🔒 Authentication

Hiện tại API được cấu hình `AllowAny` cho development. Trong production, nên:

1. Thay đổi trong `settings.py`:
```python
'DEFAULT_PERMISSION_CLASSES': [
    'rest_framework.permissions.IsAuthenticated',
],
```

2. Sử dụng Token Authentication hoặc JWT

## 📊 Database Schema

Xem file database schema trong thư mục `docs/`

## 🧪 Testing

```bash
python manage.py test
```

## 📝 Admin Panel

Truy cập admin panel tại: http://127.0.0.1:8000/admin/

Đăng nhập bằng tài khoản superuser đã tạo.

## 🛠️ Tech Stack

- **Framework**: Django 4.2.7
- **API**: Django REST Framework 3.14.0
- **Database**: PostgreSQL
- **CORS**: django-cors-headers
- **Environment**: python-decouple

## 📖 Business Logic

### **Tạo đơn hàng**
1. Kiểm tra sản phẩm còn hàng
2. Kiểm tra nguyên liệu đủ không
3. Tính tổng tiền, giảm giá, thành tiền
4. Trừ nguyên liệu tự động
5. Cộng điểm cho khách hàng (10,000đ = 1 điểm)

### **Hủy đơn hàng**
1. Hoàn nguyên liệu về kho
2. Cập nhật trạng thái

### **Nhập kho**
1. Tạo phiếu nhập
2. Tự động cộng vào tồn kho
3. Tính tổng tiền nhập

### **Điểm thành viên**
- Bronze: < 100 điểm
- Silver: 100-499 điểm
- Gold: 500-999 điểm
- VIP: >= 1000 điểm

## 🐛 Troubleshooting

### Lỗi kết nối database
Kiểm tra PostgreSQL đã chạy và thông tin trong `.env` đúng.

### Lỗi migrations
```bash
python manage.py makemigrations
python manage.py migrate --run-syncdb
```

### Lỗi CORS
Kiểm tra `CORS_ALLOWED_ORIGINS` trong `settings.py`

## 👥 Contributors

- Vương (Backend Developer)

## 📄 License

MIT License
