import React, { useState } from 'react';
import { Coffee, TrendingUp, Users, Package, ShoppingCart, DollarSign, Bell, Search, Menu, X, ChevronDown, Activity, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data
  const revenueData = [
    { name: 'T2', revenue: 4200, orders: 42 },
    { name: 'T3', revenue: 5800, orders: 58 },
    { name: 'T4', revenue: 4600, orders: 46 },
    { name: 'T5', revenue: 7200, orders: 72 },
    { name: 'T6', revenue: 8500, orders: 85 },
    { name: 'T7', revenue: 9200, orders: 92 },
    { name: 'CN', revenue: 8800, orders: 88 }
  ];

  const productData = [
    { name: 'Cà phê đen', value: 35, color: '#8B4513' },
    { name: 'Cà phê sữa', value: 30, color: '#D2691E' },
    { name: 'Trà sữa', value: 20, color: '#F4A460' },
    { name: 'Sinh tố', value: 15, color: '#DEB887' }
  ];

  const recentOrders = [
    { id: '#0012', customer: 'Nguyễn Văn A', amount: '185,000₫', status: 'completed', time: '2 phút trước' },
    { id: '#0011', customer: 'Trần Thị B', amount: '125,000₫', status: 'processing', time: '5 phút trước' },
    { id: '#0010', customer: 'Lê Văn C', amount: '95,000₫', status: 'completed', time: '12 phút trước' },
    { id: '#0009', customer: 'Phạm Thị D', amount: '210,000₫', status: 'completed', time: '18 phút trước' }
  ];

  const lowStockItems = [
    { name: 'Cà phê hạt Robusta', current: 2, min: 5, unit: 'kg' },
    { name: 'Sữa tươi', current: 3, min: 10, unit: 'lít' },
    { name: 'Đường trắng', current: 1, min: 3, unit: 'kg' }
  ];

  const stats = [
    { title: 'Doanh thu hôm nay', value: '8,850,000₫', change: '+12.5%', icon: DollarSign, color: 'from-emerald-500 to-emerald-600' },
    { title: 'Đơn hàng', value: '88', change: '+8.2%', icon: ShoppingCart, color: 'from-blue-500 to-blue-600' },
    { title: 'Khách hàng mới', value: '24', change: '+15.3%', icon: Users, color: 'from-purple-500 to-purple-600' },
    { title: 'Sản phẩm', value: '156', change: '+2.4%', icon: Package, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-gradient-to-b from-slate-900 to-slate-800 w-64 shadow-2xl`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b border-slate-700">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-xl">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Coffee Shop</h1>
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {[
              { id: 'overview', icon: Activity, label: 'Tổng quan' },
              { id: 'orders', icon: ShoppingCart, label: 'Đơn hàng' },
              { id: 'products', icon: Package, label: 'Sản phẩm' },
              { id: 'customers', icon: Users, label: 'Khách hàng' },
              { id: 'revenue', icon: TrendingUp, label: 'Doanh thu' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Info */}
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
                  placeholder="Tìm kiếm..."
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

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-2">Chào mừng trở lại, Admin! ☕</h2>
            <p className="text-amber-50">Hôm nay có 88 đơn hàng mới và doanh thu đạt 8.85 triệu đồng</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-slate-600 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Doanh thu 7 ngày qua</h3>
                <select className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                  <option>7 ngày</option>
                  <option>30 ngày</option>
                  <option>90 ngày</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} name="Doanh thu (K)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Product Distribution */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Sản phẩm bán chạy</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {productData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-slate-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Đơn hàng gần đây</h3>
              <div className="space-y-3">
                {recentOrders.map((order, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-slate-800">{order.id}</span>
                        <span className={`px-2 py-1 text-xs rounded-lg ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{order.customer}</p>
                      <p className="text-xs text-slate-400">{order.time}</p>
                    </div>
                    <span className="font-bold text-slate-800">{order.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock Alert */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Cảnh báo nguyên liệu
              </h3>
              <div className="space-y-3">
                {lowStockItems.map((item, idx) => (
                  <div key={idx} className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-lg">Sắp hết</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-red-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-red-500 h-full transition-all"
                          style={{ width: `${(item.current / item.min) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600">{item.current}/{item.min} {item.unit}</span>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow">
                  Nhập kho ngay
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;