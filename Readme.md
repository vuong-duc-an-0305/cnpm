# Hệ Thống Quản Lý Quán Cà Phê

Dự án quản lý quán cà phê với Frontend (Vue.js) và Backend (Django REST Framework).

## 📋 Mục Lục

- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt Backend (Django)](#cài-đặt-backend-django)
- [Cài Đặt Frontend (Vue.js)](#cài-đặt-frontend-vuejs)
- [Cấu Hình Database](#cấu-hình-database)
- [Chạy Ứng Dụng](#chạy-ứng-dụng)
- [API Documentation](#api-documentation)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Troubleshooting](#troubleshooting)

## 🖥️ Yêu Cầu Hệ Thống

### Backend
- Python 3.8+
- PostgreSQL 12+
- pip (Python package manager)

### Frontend
- Node.js 20.19.0+ hoặc 22.12.0+
- npm hoặc yarn

## 🔧 Cài Đặt Backend (Django)

### 1. Tạo Virtual Environment

```bash
# Di chuyển vào thư mục BE
cd BE

# Tạo virtual environment
python -m venv venv

# Kích hoạt virtual environment
# Trên Windows:
venv\Scripts\activate
# Trên macOS/Linux:
source venv/bin/activate
```

### 2. Cài Đặt Dependencies

```bash
# Cài đặt các package cần thiết
pip install -r requirements.txt
```

### 3. Cấu Hình Environment Variables

Tạo file `.env` trong thư mục `BE`:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True

# Database Settings
DB_NAME=coffee_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

### 4. Chạy Migrations

```bash
# Tạo migrations
python manage.py makemigrations

# Áp dụng migrations
python manage.py migrate

# Tạo superuser (tùy chọn)
python manage.py createsuperuser
```

### 5. Chạy Backend Server

```bash
python manage.py runserver
```

Backend sẽ chạy tại: `http://localhost:8000`

## 🎨 Cài Đặt Frontend (Vue.js)

### 1. Cài Đặt Dependencies

```bash
# Di chuyển vào thư mục FE
cd FE/FE_coffee

# Cài đặt dependencies
npm install
```

### 2. Cấu Hình API Base URL

Kiểm tra file `src/services/api.ts` để đảm bảo API base URL đúng:

```typescript
const API_BASE_URL = 'http://localhost:8000/api'
```

### 3. Chạy Frontend Server

```bash
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5174`

## 🗄️ Cấu Hình Database

### 1. Cài Đặt PostgreSQL

#### Windows:
1. Tải PostgreSQL từ: https://www.postgresql.org/download/windows/
2. Cài đặt với default settings
3. Ghi nhớ password cho user `postgres`

#### macOS:
```bash
# Sử dụng Homebrew
brew install postgresql
brew services start postgresql
```

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Tạo Database

```bash
# Kết nối PostgreSQL
psql -U postgres

# Tạo database
CREATE DATABASE coffee_db;

# Tạo user (tùy chọn)
CREATE USER coffee_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE coffee_db TO coffee_user;

# Thoát
\q
```

### 3. Cập Nhật Cấu Hình Database

Cập nhật file `.env` trong thư mục `BE`:

```env
DB_NAME=coffee_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
```

## 🚀 Chạy Ứng Dụng

### 1. Khởi Động Database
Đảm bảo PostgreSQL đang chạy:

```bash
# Windows (nếu cài đặt như service)
net start postgresql-x64-13

# macOS
brew services start postgresql

# Ubuntu/Debian
sudo systemctl start postgresql
```

### 2. Khởi Động Backend

```bash
cd BE
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
python manage.py runserver
```

### 3. Khởi Động Frontend

```bash
cd FE/FE_coffee
npm run dev
```

### 4. Truy Cập Ứng Dụng

- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:8000/api
- **Django Admin**: http://localhost:8000/admin

## 📚 API Documentation

### Endpoints Chính

- **Categories**: `/api/categories/`
- **Products**: `/api/products/`
- **Ingredients**: `/api/ingredients/`
- **Recipes**: `/api/recipes/`
- **Customers**: `/api/customers/`
- **Employees**: `/api/employees/`
- **Orders**: `/api/orders/`
- **Inventory**: `/api/inventory/`

### Authentication

Hiện tại API sử dụng `AllowAny` permission cho development. Để bảo mật hơn, có thể thay đổi trong `settings.py`:

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}
```

## 📁 Cấu Trúc Dự Án

```
BTL_CNPM/
├── BE/                          # Backend Django
│   ├── api/                     # Django apps
│   │   ├── categories/          # Quản lý danh mục
│   │   ├── products/           # Quản lý sản phẩm
│   │   ├── ingredients/        # Quản lý nguyên liệu
│   │   ├── recipes/            # Quản lý công thức
│   │   ├── customers/          # Quản lý khách hàng
│   │   ├── employees/          # Quản lý nhân viên
│   │   ├── orders/             # Quản lý đơn hàng
│   │   ├── inventory/          # Quản lý kho
│   │   └── reports/            # Báo cáo
│   ├── BE_coffee/              # Django project settings
│   ├── requirements.txt        # Python dependencies
│   └── manage.py              # Django management script
├── FE/                         # Frontend Vue.js
│   └── FE_coffee/             # Vue.js project
│       ├── src/
│       │   ├── components/     # Vue components
│       │   ├── views/          # Vue pages
│       │   ├── services/       # API services
│       │   ├── router/         # Vue Router
│       │   └── types/          # TypeScript types
│       ├── package.json        # Node.js dependencies
│       └── vite.config.ts      # Vite configuration
└── README.md                   # File này
```

## 🔧 Troubleshooting

### Lỗi Kết Nối Database

1. **Kiểm tra PostgreSQL đang chạy**:
   ```bash
   # Windows
   net start postgresql-x64-13
   
   # macOS
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo systemctl start postgresql
   ```

2. **Kiểm tra thông tin kết nối trong `.env`**:
   ```env
   DB_NAME=coffee_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

3. **Test kết nối database**:
   ```bash
   psql -U postgres -h localhost -d coffee_db
   ```

### Lỗi CORS

Nếu gặp lỗi CORS, kiểm tra `CORS_ALLOWED_ORIGINS` trong `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]
```

### Lỗi Port Đã Sử Dụng

1. **Backend (port 8000)**:
   ```bash
   # Tìm process sử dụng port 8000
   netstat -ano | findstr :8000
   
   # Kill process (Windows)
   taskkill /PID <PID> /F
   ```

2. **Frontend (port 5174)**:
   ```bash
   # Tìm process sử dụng port 5174
   netstat -ano | findstr :5174
   
   # Kill process (Windows)
   taskkill /PID <PID> /F
   ```

### Lỗi Dependencies

1. **Backend**:
   ```bash
   # Cài đặt lại dependencies
   pip install -r requirements.txt --force-reinstall
   ```

2. **Frontend**:
   ```bash
   # Xóa node_modules và cài đặt lại
   rm -rf node_modules package-lock.json
   npm install
   ```

## Hỗ Trợ

Nếu gặp vấn đề, hãy kiểm tra:

1. Tất cả services đang chạy (PostgreSQL, Backend, Frontend)
2. Cấu hình database trong `.env`
3. CORS settings trong Django
4. Network connectivity giữa Frontend và Backend

## 🎯 Tính Năng Chính

- ✅ Quản lý danh mục sản phẩm
- ✅ Quản lý sản phẩm và nguyên liệu
- ✅ Quản lý công thức nấu
- ✅ Quản lý khách hàng và nhân viên
- ✅ Quản lý đơn hàng
- ✅ Quản lý kho hàng
- ✅ Báo cáo thống kê
- ✅ Dashboard với biểu đồ

---

**Lưu ý**: Đây là phiên bản development. Để deploy production, cần cấu hình thêm security settings và sử dụng database production.
