import React, { useState } from 'react';
import { Coffee, ShoppingCart, Menu, Search, Bell, ChevronDown, Activity, Package, Users, TrendingUp, DollarSign, Calendar, ArrowUp, ArrowDown, Download, Filter } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timePeriod, setTimePeriod] = useState('Tháng này');

  // Dữ liệu doanh thu theo ngày (7 ngày gần nhất)
  const dailyRevenue = [
    { date: '24/09', revenue: 4500000, orders: 45, customers: 38 },
    { date: '25/09', revenue: 5200000, orders: 52, customers: 43 },
    { date: '26/09', revenue: 4800000, orders: 48, customers: 40 },
    { date: '27/09', revenue: 6100000, orders: 61, customers: 51 },
    { date: '28/09', revenue: 5500000, orders: 55, customers: 46 },
    { date: '29/09', revenue: 7200000, orders: 72, customers: 60 },
    { date: '30/09', revenue: 5900000, orders: 59, customers: 49 }
  ];

  // Doanh thu theo danh mục
  const categoryRevenue = [
    { name: 'Cà phê', value: 15200000, percentage: 38 },
    { name: 'Trà sữa', value: 12800000, percentage: 32 },
    { name: 'Sinh tố', value: 7600000, percentage: 19 },
    { name: 'Đồ ăn', value: 4400000, percentage: 11 }
  ];

  // Doanh thu theo tháng (6 tháng)
  const monthlyRevenue = [
    { month: 'T4', revenue: 85000000, profit: 25500000 },
    { month: 'T5', revenue: 92000000, profit: 27600000 },
    { month: 'T6', revenue: 88000000, profit: 26400000 },
    { month: 'T7', revenue: 95000000, profit: 28500000 },
    { month: 'T8', revenue: 105000000, profit: 31500000 },
    { month: 'T9', revenue: 112000000, profit: 33600000 }
  ];

  // Top sản phẩm bán chạy
  const topProducts = [
    { name: 'Cà phê đen', sold: 89, revenue: 4005000, trend: 'up' },
    { name: 'Cà phê sữa', sold: 76, revenue: 4180000, trend: 'up' },
    { name: 'Trà sữa truyền thống', sold: 67, revenue: 4355000, trend: 'up' },
    { name: 'Trà đào cam sả', sold: 56, revenue: 3080000, trend: 'down' },
    { name: 'Bạc xỉu', sold: 54, revenue: 2700000, trend: 'up' }
  ];

  const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
  const timePeriods = ['Hôm nay', 'Tuần này', 'Tháng này', 'Năm nay'];

  const totalRevenue = dailyRevenue.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = dailyRevenue.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const revenueGrowth = 15.3;

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
                  placeholder="Tìm kiếm báo cáo..."
                  className="pl-10 pr-4 py-2 w-96 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
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

        {/* Revenue Management Content */}
        <main className="p-6 space-y-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Báo cáo doanh thu</h2>
                <p className="text-slate-600 mt-1">Phân tích chi tiết hiệu quả kinh doanh</p>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-md">
                <Calendar className="w-5 h-5 text-slate-600 ml-2" />
                {timePeriods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimePeriod(period)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      period === timePeriod
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm opacity-90">Tổng doanh thu</p>
                  <DollarSign className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold mb-1">{(totalRevenue / 1000000).toFixed(1)}M</p>
                <div className="flex items-center gap-1 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  <span>{revenueGrowth}% so với kỳ trước</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm opacity-90">Đơn hàng</p>
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold mb-1">{totalOrders}</p>
                <div className="flex items-center gap-1 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  <span>8.2% tăng trưởng</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm opacity-90">Giá trị TB</p>
                  <TrendingUp className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold mb-1">{Math.round(avgOrderValue / 1000)}k</p>
                <div className="flex items-center gap-1 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  <span>5.7% tăng trưởng</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 shadow-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm opacity-90">Lợi nhuận</p>
                  <Activity className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold mb-1">{(totalRevenue * 0.3 / 1000000).toFixed(1)}M</p>
                <div className="flex items-center gap-1 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  <span>12.3% tăng trưởng</span>
                </div>
              </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Daily Revenue Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Doanh thu theo ngày</h3>
                  <span className="text-sm text-slate-600">7 ngày gần nhất</span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                      formatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} name="Doanh thu" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Category Pie Chart */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Doanh thu theo danh mục</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryRevenue}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryRevenue.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Revenue & Profit */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Doanh thu & Lợi nhuận theo tháng</h3>
                  <span className="text-sm text-slate-600">6 tháng gần nhất</span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                      formatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="#3b82f6" name="Doanh thu" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="profit" fill="#10b981" name="Lợi nhuận" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Top sản phẩm bán chạy</h3>
                <div className="space-y-3">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                          index === 0 ? 'bg-amber-500' :
                          index === 1 ? 'bg-slate-400' :
                          index === 2 ? 'bg-orange-500' : 'bg-slate-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{product.name}</p>
                          <p className="text-sm text-slate-600">Đã bán: {product.sold}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{(product.revenue / 1000000).toFixed(1)}M</p>
                        {product.trend === 'up' ? (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <ArrowUp className="w-3 h-3" /> Tăng
                          </span>
                        ) : (
                          <span className="text-xs text-red-600 flex items-center gap-1">
                            <ArrowDown className="w-3 h-3" /> Giảm
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Details Table */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Chi tiết doanh thu theo danh mục</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Danh mục</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">Doanh thu</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">Tỷ trọng</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">So với kỳ trước</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryRevenue.map((category, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="font-medium text-slate-800">{category.name}</span>
                          </div>
                        </td>
                        <td className="text-right py-4 px-4 font-semibold text-slate-800">
                          {(category.value / 1000000).toFixed(1)}M
                        </td>
                        <td className="text-right py-4 px-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                            {category.percentage}%
                          </span>
                        </td>
                        <td className="text-right py-4 px-4">
                          <span className="text-green-600 flex items-center justify-end gap-1 font-medium">
                            <ArrowUp className="w-4 h-4" />
                            {(Math.random() * 10 + 5).toFixed(1)}%
                          </span>
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

export default RevenueManagement;