import React, { useState } from 'react';
import { Coffee, ShoppingCart, Menu, Search, Bell, ChevronDown, Activity, Package, Users, TrendingUp, Plus, Edit, Trash2, Eye, Phone, Mail, MapPin, Calendar, DollarSign, Award, Filter } from 'lucide-react';

const CustomerManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedType, setSelectedType] = useState('Tất cả');

  const allCustomers = [
    { id: 1, name: 'Nguyễn Văn An', phone: '0912345678', email: 'nguyenvanan@gmail.com', address: 'Quận 1, TP.HCM', joinDate: '2024-01-15', orders: 45, totalSpent: 2250000, points: 450, type: 'VIP', avatar: '👨' },
    { id: 2, name: 'Trần Thị Bình', phone: '0923456789', email: 'tranthibinh@gmail.com', address: 'Quận 3, TP.HCM', joinDate: '2024-02-20', orders: 38, totalSpent: 1900000, points: 380, type: 'VIP', avatar: '👩' },
    { id: 3, name: 'Lê Hoàng Cường', phone: '0934567890', email: 'lehoangcuong@gmail.com', address: 'Quận 5, TP.HCM', joinDate: '2024-03-10', orders: 28, totalSpent: 1400000, points: 280, type: 'Thường', avatar: '👨' },
    { id: 4, name: 'Phạm Mai Dung', phone: '0945678901', email: 'phammaidung@gmail.com', address: 'Quận 7, TP.HCM', joinDate: '2024-01-25', orders: 52, totalSpent: 2600000, points: 520, type: 'VIP', avatar: '👩' },
    { id: 5, name: 'Hoàng Văn Em', phone: '0956789012', email: 'hoangvanem@gmail.com', address: 'Quận 2, TP.HCM', joinDate: '2024-04-05', orders: 15, totalSpent: 750000, points: 150, type: 'Mới', avatar: '👨' },
    { id: 6, name: 'Đỗ Thị Fang', phone: '0967890123', email: 'dothifang@gmail.com', address: 'Quận 10, TP.HCM', joinDate: '2024-05-12', orders: 22, totalSpent: 1100000, points: 220, type: 'Thường', avatar: '👩' },
    { id: 7, name: 'Vũ Minh Giang', phone: '0978901234', email: 'vuminggiang@gmail.com', address: 'Quận Tân Bình, TP.HCM', joinDate: '2024-02-28', orders: 41, totalSpent: 2050000, points: 410, type: 'VIP', avatar: '👨' },
    { id: 8, name: 'Bùi Thu Hà', phone: '0989012345', email: 'buithuha@gmail.com', address: 'Quận Phú Nhuận, TP.HCM', joinDate: '2024-06-08', orders: 8, totalSpent: 400000, points: 80, type: 'Mới', avatar: '👩' },
    { id: 9, name: 'Đinh Quang Inh', phone: '0990123456', email: 'dinhquanginh@gmail.com', address: 'Quận Bình Thạnh, TP.HCM', joinDate: '2024-03-18', orders: 33, totalSpent: 1650000, points: 330, type: 'Thường', avatar: '👨' },
    { id: 10, name: 'Ngô Lan Khanh', phone: '0901234567', email: 'ngolankhanh@gmail.com', address: 'Quận 4, TP.HCM', joinDate: '2024-01-08', orders: 48, totalSpent: 2400000, points: 480, type: 'VIP', avatar: '👩' },
    { id: 11, name: 'Trương Đức Long', phone: '0913456789', email: 'truongduclong@gmail.com', address: 'Quận 6, TP.HCM', joinDate: '2024-07-15', orders: 5, totalSpent: 250000, points: 50, type: 'Mới', avatar: '👨' },
    { id: 12, name: 'Mai Thùy Minh', phone: '0924567890', email: 'maithuyminh@gmail.com', address: 'Quận 8, TP.HCM', joinDate: '2024-04-22', orders: 19, totalSpent: 950000, points: 190, type: 'Thường', avatar: '👩' }
  ];

  const customerTypes = ['Tất cả', 'VIP', 'Thường', 'Mới'];

  const filteredCustomers = selectedType === 'Tất cả' 
    ? allCustomers 
    : allCustomers.filter(c => c.type === selectedType);

  const totalRevenue = allCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalOrders = allCustomers.reduce((sum, c) => sum + c.orders, 0);
  const vipCount = allCustomers.filter(c => c.type === 'VIP').length;
  const newCount = allCustomers.filter(c => c.type === 'Mới').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-gradient-to-b from-slate-900 to-slate-800 w-64 shadow-2xl`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 p-6 border-b border-slate-700">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-xl">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Coffee Shop</h1>
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all">
              <Activity className="w-5 h-5" />
              <span className="font-medium">Tổng quan</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Đơn hàng</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all">
              <Package className="w-5 h-5" />
              <span className="font-medium">Sản phẩm</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105 transition-all">
              <Users className="w-5 h-5" />
              <span className="font-medium">Khách hàng</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Doanh thu</span>
            </button>
          </nav>

          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Admin</p>
                <p className="text-xs text-slate-400">admin@coffee.com</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-slate-600" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm khách hàng..."
                  className="pl-10 pr-4 py-2 w-96 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Customers Management Content */}
        <main className="p-6 space-y-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Quản lý khách hàng</h2>
                <p className="text-slate-600 mt-1">Tổng cộng {allCustomers.length} khách hàng</p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Thêm khách hàng
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-600">Tổng khách hàng</p>
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-slate-800">{allCustomers.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-amber-500">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-600">Khách VIP</p>
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-2xl font-bold text-amber-600">{vipCount}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-600">Tổng doanh thu</p>
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-green-600">{(totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-600">Khách mới</p>
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-purple-600">{newCount}</p>
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3 flex-wrap">
                <Filter className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-semibold text-slate-700">Loại khách hàng:</span>
                {customerTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      type === selectedType
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  {/* Customer Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{customer.avatar}</div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">{customer.name}</h3>
                        <span className={`inline-block px-2 py-1 text-xs rounded-lg font-medium ${
                          customer.type === 'VIP' ? 'bg-amber-100 text-amber-700' :
                          customer.type === 'Thường' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {customer.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="w-4 h-4 text-amber-500" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="w-4 h-4 text-amber-500" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      <span>{customer.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span>Tham gia: {customer.joinDate}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
                    <div className="text-center">
                      <p className="text-xs text-slate-600 mb-1">Đơn hàng</p>
                      <p className="text-lg font-bold text-slate-800">{customer.orders}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-600 mb-1">Chi tiêu</p>
                      <p className="text-lg font-bold text-green-600">{(customer.totalSpent / 1000).toFixed(0)}k</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-600 mb-1">Điểm</p>
                      <p className="text-lg font-bold text-amber-600">{customer.points}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-1">
                      <Eye className="w-4 h-4" />
                      Xem
                    </button>
                    <button className="flex-1 px-3 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors flex items-center justify-center gap-1">
                      <Edit className="w-4 h-4" />
                      Sửa
                    </button>
                    <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="bg-white rounded-xl p-4 shadow-md flex items-center justify-between">
              <span className="text-sm text-slate-600">Hiển thị 1-{filteredCustomers.length} trong {filteredCustomers.length} khách hàng</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">Trước</button>
                <button className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm font-medium">1</button>
                <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">2</button>
                <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">Sau</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerManagement;