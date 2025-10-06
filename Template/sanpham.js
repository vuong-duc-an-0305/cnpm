import React, { useState } from 'react';
import { Coffee, ShoppingCart, Menu, Search, Bell, ChevronDown, Activity, Package, Users, TrendingUp, Plus, Edit, Trash2, Eye } from 'lucide-react';

const ProductManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const allProducts = [
    { id: 1, name: 'Cà phê đen', category: 'Cà phê', price: 45000, stock: 150, sold: 89, image: '☕', status: 'active' },
    { id: 2, name: 'Cà phê sữa', category: 'Cà phê', price: 55000, stock: 120, sold: 76, image: '☕', status: 'active' },
    { id: 3, name: 'Bạc xỉu', category: 'Cà phê', price: 50000, stock: 95, sold: 54, image: '☕', status: 'active' },
    { id: 4, name: 'Trà sữa truyền thống', category: 'Trà sữa', price: 65000, stock: 80, sold: 67, image: '🧋', status: 'active' },
    { id: 5, name: 'Trà sữa matcha', category: 'Trà sữa', price: 70000, stock: 60, sold: 45, image: '🧋', status: 'active' },
    { id: 6, name: 'Sinh tố bơ', category: 'Sinh tố', price: 75000, stock: 45, sold: 38, image: '🥤', status: 'active' },
    { id: 7, name: 'Sinh tố dâu', category: 'Sinh tố', price: 70000, stock: 50, sold: 42, image: '🥤', status: 'active' },
    { id: 8, name: 'Bánh mì', category: 'Đồ ăn', price: 25000, stock: 30, sold: 28, image: '🥖', status: 'active' },
    { id: 9, name: 'Bánh ngọt', category: 'Đồ ăn', price: 35000, stock: 15, sold: 22, image: '🍰', status: 'low' },
    { id: 10, name: 'Cà phê đá xay', category: 'Cà phê', price: 60000, stock: 8, sold: 31, image: '☕', status: 'low' },
    { id: 11, name: 'Trà đào cam sả', category: 'Trà', price: 55000, stock: 70, sold: 56, image: '🍵', status: 'active' },
    { id: 12, name: 'Nước ép cam', category: 'Nước ép', price: 45000, stock: 5, sold: 19, image: '🍊', status: 'low' }
  ];

  const categories = ['Tất cả', 'Cà phê', 'Trà sữa', 'Sinh tố', 'Đồ ăn', 'Trà', 'Nước ép'];

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
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105 transition-all">
              <Package className="w-5 h-5" />
              <span className="font-medium">Sản phẩm</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all">
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
                  placeholder="Tìm kiếm sản phẩm..."
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

        {/* Products Management Content */}
        <main className="p-6 space-y-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Quản lý sản phẩm</h2>
                <p className="text-slate-600 mt-1">Tổng cộng {allProducts.length} sản phẩm</p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Thêm sản phẩm
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500">
                <p className="text-sm text-slate-600 mb-1">Tổng sản phẩm</p>
                <p className="text-2xl font-bold text-slate-800">{allProducts.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
                <p className="text-sm text-slate-600 mb-1">Đang bán</p>
                <p className="text-2xl font-bold text-green-600">
                  {allProducts.filter(p => p.status === 'active' && p.stock > 20).length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-yellow-500">
                <p className="text-sm text-slate-600 mb-1">Sắp hết hàng</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {allProducts.filter(p => p.stock <= 20 && p.stock > 0).length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-purple-500">
                <p className="text-sm text-slate-600 mb-1">Tổng đã bán</p>
                <p className="text-2xl font-bold text-purple-600">
                  {allProducts.reduce((sum, p) => sum + p.sold, 0)}
                </p>
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-semibold text-slate-700">Danh mục:</span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      cat === 'Tất cả'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  {/* Product Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{product.image}</div>
                    <span className={`px-2 py-1 text-xs rounded-lg font-medium ${
                      product.stock > 50 ? 'bg-green-100 text-green-700' :
                      product.stock > 20 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock > 50 ? 'Còn hàng' :
                       product.stock > 20 ? 'Sắp hết' : 'Ít hàng'}
                    </span>
                  </div>

                  {/* Product Info */}
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{product.category}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-amber-600">{product.price.toLocaleString()}₫</span>
                  </div>

                  {/* Stock & Sold Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Tồn kho:</span>
                      <span className="font-semibold text-slate-800">{product.stock}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Đã bán:</span>
                      <span className="font-semibold text-slate-800">{product.sold}</span>
                    </div>
                    
                    {/* Stock Progress Bar */}
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                      <div 
                        className={`h-full transition-all ${
                          product.stock > 50 ? 'bg-green-500' :
                          product.stock > 20 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((product.stock / 150) * 100, 100)}%` }}
                      ></div>
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
              <span className="text-sm text-slate-600">Hiển thị 1-{allProducts.length} trong {allProducts.length} sản phẩm</span>
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

export default ProductManagement;