# 🚀 Quick Start Guide - Xưởng Coffee Frontend

## ⚡ Khởi chạy nhanh trong 5 phút

### 1. Cài đặt dependencies

```bash
cd FE/FE_coffee
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

### 3. Mở trình duyệt

Truy cập: http://localhost:3000

### 4. Đăng nhập với tài khoản demo

- **Username**: admin
- **Password**: admin123

## 🎯 Tính năng chính đã sẵn sàng

### ✅ Dashboard

- Thống kê tổng quan với biểu đồ
- Doanh thu, đơn hàng, khách hàng
- Sản phẩm bán chạy
- Cảnh báo tồn kho

### ✅ Quản lý đơn hàng

- Danh sách đơn hàng với filter
- Trạng thái đơn hàng
- Thống kê theo trạng thái

### ✅ Quản lý sản phẩm

- Grid view sản phẩm
- Thông tin giá, danh mục
- Trạng thái còn hàng/hết hàng

### ✅ Quản lý khách hàng

- Danh sách khách hàng
- Thông tin thành viên
- Điểm tích lũy

### ✅ Quản lý kho

- Tồn kho nguyên liệu
- Cảnh báo sắp hết hàng
- Progress bar trực quan

### ✅ Quản lý nhân viên

- Danh sách nhân viên
- Filter theo ca làm việc
- Thống kê theo chức vụ

### ✅ Báo cáo

- Biểu đồ doanh thu
- Top sản phẩm bán chạy
- Thống kê theo danh mục

## 🎨 Giao diện

### Theme Colors

- **Primary**: Coffee browns (#3E2723, #4B2E2E)
- **Accent**: Gold (#D4AF37)
- **Background**: Light beige (#F5F5DC)

### Responsive Design

- ✅ Mobile (< 768px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (> 1024px)

## 🔧 Cấu hình API

### Backend Connection

File: `vite.config.ts`

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8000',  // Django backend
      changeOrigin: true,
    },
  },
}
```

### API Services

- ✅ Categories API
- ✅ Products API
- ✅ Orders API
- ✅ Customers API
- ✅ Inventory API
- ✅ Employees API

## 📱 Demo Data

Ứng dụng sử dụng mock data để demo:

- 2 đơn hàng mẫu
- 2 sản phẩm mẫu
- 2 khách hàng mẫu
- 3 nguyên liệu mẫu
- 3 nhân viên mẫu

## 🚧 Tính năng đang phát triển

- POS System (Tạo đơn hàng)
- Form thêm/sửa/xóa
- Chi tiết từng trang
- Export báo cáo
- Real-time updates

## 🐛 Troubleshooting

### Lỗi thường gặp

**1. Port 3000 đã được sử dụng**

```bash
# Thay đổi port
npm run dev -- --port 3001
```

**2. Module not found**

```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

**3. TypeScript errors**

```bash
# Kiểm tra type
npm run type-check
```

### Performance Tips

**1. Hot reload chậm**

- Tắt extensions không cần thiết
- Restart development server

**2. Build chậm**

- Sử dụng `npm run build` thay vì `npm run dev` cho production

## 📞 Hỗ trợ

- **Issues**: GitHub Issues
- **Documentation**: README.md
- **API Docs**: API_DOCUMENTATION.md

---

**Happy coding! ☕**
