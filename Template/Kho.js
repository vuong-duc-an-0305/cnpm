import React, { useState } from 'react';
import { Coffee, ShoppingCart, Menu, Search, Bell, ChevronDown, Activity, Package, Users, TrendingUp, Warehouse, Plus, Edit, Trash2, AlertTriangle, CheckCircle, Clock, TrendingDown, Calendar, Download, Filter, RefreshCw } from 'lucide-react';

const InventoryManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const allInventory = [
    { id: 1, name: 'Cà phê hạt Arabica', category: 'Cà phê', unit: 'kg', stock: 45, minStock: 20, maxStock: 100, price: 250000, supplier: 'Nhà cung cấp A', lastUpdate: '2024-09-28', expiry: '2025-03-15', status: 'sufficient', icon: '☕' },
    { id: 2, name: 'Cà phê hạt Robusta', category: 'Cà phê', unit: 'kg', stock: 38, minStock: 20, maxStock: 100, price: 180000, supplier: 'Nhà cung cấp A', lastUpdate: '2024-09-27', expiry: '2025-02-20', status: 'sufficient', icon: '☕' },
    { id: 3, name: 'Sữa tươi', category: 'Sữa', unit: 'lít', stock: 15, minStock: 30, maxStock: 80, price: 28000, supplier: 'Vinamilk', lastUpdate: '2024-09-30', expiry: '2024-10-10', status: 'low', icon: '🥛' },
    { id: 4, name: 'Sữa đặc', category: 'Sữa', unit: 'lon', stock: 8, minStock: 15, maxStock: 50, price: 35000, supplier: 'Vinamilk', lastUpdate: '2024-09-29', expiry: '2025-06-30', status: 'critical', icon: '🥛' },
    { id: 5, name: 'Đường trắng', category: 'Gia vị', unit: 'kg', stock: 55, minStock: 25, maxStock: 100, price: 22000, supplier: 'Nhà cung cấp B', lastUpdate: '2024-09-26', expiry: '2025-12-31', status: 'sufficient', icon: '🍚' },
    { id: 6, name: 'Đường nâu', category: 'Gia vị', unit: 'kg', stock: 28, minStock: 20, maxStock: 80, price: 35000, supplier: 'Nhà cung cấp B', lastUpdate: '2024-09-25', expiry: '2025-11-30', status: 'sufficient', icon: '🍚' },
    { id: 7, name: 'Trà đen', category: 'Trà', unit: 'kg', stock: 12, minStock: 15, maxStock: 50, price: 180000, supplier: 'Nhà cung cấp C', lastUpdate: '2024-09-28', expiry: '2025-04-15', status: 'low', icon: '🍵' },
    { id: 8, name: 'Trà xanh', category: 'Trà', unit: 'kg', stock: 22, minStock: 15, maxStock: 50, price: 200000, supplier: 'Nhà cung cấp C', lastUpdate: '2024-09-27', expiry: '2025-05-20', status: 'sufficient', icon: '🍵' },
    { id: 9, name: 'Bột matcha', category: 'Trà', unit: 'kg', stock: 6, minStock: 10, maxStock: 30, price: 450000, supplier: 'Nhà cung cấp D', lastUpdate: '2024-09-30', expiry: '2025-01-10', status: 'critical', icon: '🍵' },
    { id: 10, name: 'Trân châu đen', category: 'Topping', unit: 'kg', stock: 18, minStock: 20, maxStock: 60, price: 65000, supplier: 'Nhà cung cấp E', lastUpdate: '2024-09-29', expiry: '2024-10-30', status: 'low', icon: '⚫' },
    { id: 11, name: 'Thạch', category: 'Topping', unit: 'kg', stock: 25, minStock: 15, maxStock: 50, price: 45000, supplier: 'Nhà cung cấp E', lastUpdate: '2024-09-28', expiry: '2024-11-15', status: 'sufficient', icon: '🟤' },
    { id: 12, name: 'Kem tươi', category: 'Topping', unit: 'hộp', stock: 10, minStock: 20, maxStock: 50, price: 85000, supplier: 'Anchor', lastUpdate: '2024-09-30', expiry: '2024-10-05', status: 'low', icon: '🍦' },
    { id: 13, name: 'Bơ tươi', category: 'Trái cây', unit: 'kg', stock: 8, minStock: 15, maxStock: 40, price: 95000, supplier: 'Nhà cung cấp F', lastUpdate: '2024-09-29', expiry: '2024-10-03', status: 'critical', icon: '🥑' },
    { id: 14, name: 'Dâu tây', category: 'Trái cây', unit: 'kg', stock: 5, minStock: 10, maxStock: 30, price: 120000, supplier: 'Đà Lạt', lastUpdate: '2024-09-30', expiry: '2024-10-02', status: 'critical', icon: '🍓' },
    { id: 15, name: 'Chuối', category: 'Trái cây', unit: 'kg', stock: 20, minStock: 15, maxStock: 40, price: 25000, supplier: 'Nhà cung cấp F', lastUpdate: '2024-09-28', expiry: '2024-10-08', status: 'sufficient', icon: '🍌' },
    { id: 16, name: 'Ly nhựa 500ml', category: 'Bao bì', unit: 'cái', stock: 450, minStock: 500, maxStock: 2000, price: 800, supplier: 'Nhà cung cấp G', lastUpdate: '2024-09-27', expiry: null, status: 'low', icon: '🥤' },
    { id: 17, name: 'Ống hút giấy', category: 'Bao bì', unit: 'cái', stock: 1200, minStock: 1000, maxStock: 5000, price: 300, supplier: 'Nhà cung cấp G', lastUpdate: '2024-09-26', expiry: null, status: 'sufficient', icon: '🥢' },
    { id: 18, name: 'Nắp ly', category: 'Bao bì', unit: 'cái', stock: 380, minStock: 500, maxStock: 2000, price: 500, supplier: 'Nhà cung cấp G', lastUpdate: '2024-09-28', expiry: null, status: 'low', icon: '⭕' }
  ];

  const categories = ['Tất cả', 'Cà phê', 'Sữa', 'Trà', 'Topping', 'Trái cây', 'Gia vị', 'Bao bì'];

  const filteredInventory = selectedCategory === 'Tất cả' 
    ? allInventory 
    : allInventory.filter(item => item.category === selectedCategory);

  const criticalCount = allInventory.filter(item => item.status === 'critical').length;
  const lowStockCount = allInventory.filter(item => item.status === 'low').length;
  const sufficientCount = allInventory.filter(item => item.status === 'sufficient').length;
  const totalValue = allInventory.reduce((sum, item) => sum + (item.stock * item.price), 0);

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'low': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'sufficient': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'critical': return 'Cấp bách';
      case 'low': return 'Sắp hết';
      case 'sufficient': return 'Đủ dùng';
      default: return 'Không xác định';
    }
  };

  const getStockPercentage = (stock, minStock, maxStock) => {
    return Math.min((stock / maxStock) * 100, 100);
  };

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
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all">
              <Users className="w-5 h-5" />
              <span className="font-medium">Khách hàng</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105 transition-all">
              <Warehouse className="w-5 h-5" />
              <span className="font-medium">Kho</span>
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
                  placeholder="Tìm kiếm nguyên liệu..."
                  className="pl-10 pr-4 py-2 w-96 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Cập nhật tồn kho
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Xuất báo cáo
              </button>
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Inventory Management Content */}
        <main className="p-6 space-y-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Quản lý kho nguyên liệu</h2>
                <p className="text-slate-600 mt-1">Tổng cộng {allInventory.length} loại nguyên liệu</p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Nhập kho
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 shadow-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm opacity-90">Nguyên liệu cấp bách</p>
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold mb-1">{criticalCount}</p>
                <p className="text-sm opacity-90">Cần nhập ngay</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm opacity-90">Sắp hết hàng</p>
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold mb-1">{lowStockCount}</p>
                <p className="text-sm opacity-90">Dưới mức tối thiểu</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm opacity-90">Đủ dùng</p>
                  <CheckCircle className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold mb-1">{sufficientCount}</p>
                <p className="text-sm opacity-90">Tồn kho ổn định</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm opacity-90">Tổng giá trị kho</p>
                  <Package className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold mb-1">{(totalValue / 1000000).toFixed(1)}M</p>
                <p className="text-sm opacity-90">VNĐ</p>
              </div>
            </div>

            {/* Critical Alerts */}
            {criticalCount > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-800 mb-1">Cảnh báo tồn kho!</h3>
                  <p className="text-red-700 text-sm">Có {criticalCount} nguyên liệu đang ở mức tồn kho cấp bách. Vui lòng nhập hàng ngay để tránh gián đoạn sản xuất.</p>
                </div>
              </div>
            )}

            {/* Filter Section */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3 flex-wrap">
                <Filter className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-semibold text-slate-700">Danh mục:</span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      cat === selectedCategory
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Inventory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredInventory.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  {/* Item Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{item.icon}</div>
                    <span className={`px-3 py-1 text-xs rounded-lg font-medium border ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>

                  {/* Item Info */}
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{item.category}</p>

                  {/* Stock Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Tồn kho:</span>
                      <span className="font-bold text-lg text-slate-800">{item.stock} {item.unit}</span>
                    </div>
                    
                    {/* Stock Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Min: {item.minStock}</span>
                        <span>Max: {item.maxStock}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            item.status === 'critical' ? 'bg-red-500' :
                            item.status === 'low' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${getStockPercentage(item.stock, item.minStock, item.maxStock)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Đơn giá:</span>
                        <span className="font-semibold text-amber-600">{item.price.toLocaleString()}₫</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Giá trị:</span>
                        <span className="font-semibold text-green-600">{(item.stock * item.price / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Nhà cung cấp:</span>
                        <span className="font-medium text-slate-700 text-xs">{item.supplier}</span>
                      </div>
                      {item.expiry && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">HSD:</span>
                          <span className="font-medium text-slate-700 text-xs">{item.expiry}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Cập nhật:</span>
                        <span className="font-medium text-slate-700 text-xs">{item.lastUpdate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center justify-center gap-1">
                      <Plus className="w-4 h-4" />
                      Nhập
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

            {/* Stock Alert Table */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Nguyên liệu cần chú ý
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Nguyên liệu</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Tồn kho</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Mức tối thiểu</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Trạng thái</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allInventory
                      .filter(item => item.status !== 'sufficient')
                      .sort((a, b) => {
                        if (a.status === 'critical' && b.status !== 'critical') return -1;
                        if (a.status !== 'critical' && b.status === 'critical') return 1;
                        return 0;
                      })
                      .map((item) => (
                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{item.icon}</span>
                              <div>
                                <p className="font-medium text-slate-800">{item.name}</p>
                                <p className="text-xs text-slate-500">{item.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="font-semibold text-slate-800">{item.stock} {item.unit}</span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="text-slate-600">{item.minStock} {item.unit}</span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(item.status)}`}>
                              {getStatusText(item.status)}
                            </span>
                          </td>
                          <td className="text-right py-4 px-4">
                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                              Nhập hàng
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InventoryManagement;