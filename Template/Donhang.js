import React, { useState } from 'react';
import { Coffee, ShoppingCart, Menu, Search, Bell, ChevronDown } from 'lucide-react';

const OrderManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const allOrders = [
    { id: '#0012', customer: 'Nguyễn Văn A', items: 'Cà phê đen x2, Bánh mì', amount: 185000, status: 'completed', date: '30/09/2025', time: '14:30' },
    { id: '#0011', customer: 'Trần Thị B', items: 'Trà sữa x1', amount: 125000, status: 'processing', date: '30/09/2025', time: '14:27' },
    { id: '#0010', customer: 'Lê Văn C', items: 'Sinh tố x1', amount: 95000, status: 'completed', date: '30/09/2025', time: '14:20' },
    { id: '#0009', customer: 'Phạm Thị D', items: 'Cà phê sữa x3, Bánh ngọt x2', amount: 210000, status: 'completed', date: '30/09/2025', time: '14:14' },
    { id: '#0008', customer: 'Hoàng Văn E', items: 'Cà phê đen x1', amount: 45000, status: 'cancelled', date: '30/09/2025', time: '13:45' },
    { id: '#0007', customer: 'Đặng Thị F', items: 'Trà sữa x2, Sinh tố x1', amount: 180000, status: 'completed', date: '30/09/2025', time: '13:20' },
    { id: '#0006', customer: 'Võ Văn G', items: 'Cà phê đen x1, Bánh mì x2', amount: 95000, status: 'completed', date: '30/09/2025', time: '12:55' },
    { id: '#0005', customer: 'Bùi Thị H', items: 'Bạc xỉu x2', amount: 100000, status: 'processing', date: '30/09/2025', time: '12:40' },
    { id: '#0004', customer: 'Đỗ Văn I', items: 'Sinh tố bơ x1, Sinh tố dâu x1', amount: 145000, status: 'completed', date: '30/09/2025', time: '12:20' },
    { id: '#0003', customer: 'Lý Thị K', items: 'Trà sữa matcha x3', amount: 210000, status: 'completed', date: '30/09/2025', time: '11:50' }
  ];

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
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105 transition-all">
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
                  placeholder="Tìm kiếm đơn hàng..."
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

        {/* Orders Management Content */}
        <main className="p-6 space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Quản lý đơn hàng</h2>
                <p className="text-slate-600 mt-1">Tổng cộng {allOrders.length} đơn hàng</p>
              </div>
              <div className="flex gap-3">
                <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>Tất cả trạng thái</option>
                  <option>Hoàn thành</option>
                  <option>Đang xử lý</option>
                  <option>Đã hủy</option>
                </select>
                <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow">
                  Xuất báo cáo
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500">
                <p className="text-sm text-slate-600 mb-1">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-slate-800">{allOrders.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
                <p className="text-sm text-slate-600 mb-1">Hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">
                  {allOrders.filter(o => o.status === 'completed').length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-yellow-500">
                <p className="text-sm text-slate-600 mb-1">Đang xử lý</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {allOrders.filter(o => o.status === 'processing').length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-red-500">
                <p className="text-sm text-slate-600 mb-1">Đã hủy</p>
                <p className="text-2xl font-bold text-red-600">
                  {allOrders.filter(o => o.status === 'cancelled').length}
                </p>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Mã đơn</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Khách hàng</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Sản phẩm</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Số tiền</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Trạng thái</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Ngày/Giờ</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {allOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-semibold text-slate-800">{order.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-700">{order.customer}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600">{order.items}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-slate-800">{order.amount.toLocaleString()}₫</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs rounded-lg font-medium ${
                            order.status === 'completed' ? 'bg-green-100 text-green-700' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {order.status === 'completed' ? 'Hoàn thành' :
                             order.status === 'processing' ? 'Đang xử lý' : 'Đã hủy'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="text-slate-700">{order.date}</div>
                            <div className="text-slate-500">{order.time}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="px-3 py-1 text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium">
                            Chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-sm text-slate-600">Hiển thị 1-{allOrders.length} trong {allOrders.length} đơn hàng</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">Trước</button>
                  <button className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm font-medium">1</button>
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">Sau</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderManagement; 