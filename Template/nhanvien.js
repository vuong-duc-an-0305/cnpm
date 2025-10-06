import React, { useState } from 'react';
import { Coffee, ShoppingCart, Menu, Search, Bell, ChevronDown, Activity, Package, Users, TrendingUp, Warehouse, UserCheck, Plus, Edit, Trash2, Eye, Phone, Mail, DollarSign, Award, Filter, Clock, Briefcase } from 'lucide-react';

const EmployeeManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('Tất cả');

  const allEmployees = [
    { id: 1, name: 'Nguyễn Văn An', position: 'Quản lý', department: 'Quản lý', phone: '0912345678', email: 'nvana@coffee.com', salary: 15000000, workDays: 26, performance: 95, avatar: '👨‍💼' },
    { id: 2, name: 'Trần Thị Bình', position: 'Thu ngân', department: 'Bán hàng', phone: '0923456789', email: 'ttbinh@coffee.com', salary: 8000000, workDays: 25, performance: 92, avatar: '👩‍💼' },
    { id: 3, name: 'Lê Hoàng Cường', position: 'Pha chế', department: 'Pha chế', phone: '0934567890', email: 'lhcuong@coffee.com', salary: 9000000, workDays: 26, performance: 88, avatar: '👨‍🍳' },
    { id: 4, name: 'Phạm Mai Dung', position: 'Pha chế trưởng', department: 'Pha chế', phone: '0945678901', email: 'pmdung@coffee.com', salary: 11000000, workDays: 26, performance: 96, avatar: '👩‍🍳' },
    { id: 5, name: 'Hoàng Văn Em', position: 'Phục vụ', department: 'Bán hàng', phone: '0956789012', email: 'hvem@coffee.com', salary: 7000000, workDays: 24, performance: 85, avatar: '👨' },
    { id: 6, name: 'Đỗ Thị Fang', position: 'Thu ngân', department: 'Bán hàng', phone: '0967890123', email: 'dtfang@coffee.com', salary: 8000000, workDays: 26, performance: 90, avatar: '👩' },
    { id: 7, name: 'Vũ Minh Giang', position: 'Pha chế', department: 'Pha chế', phone: '0978901234', email: 'vmgiang@coffee.com', salary: 9000000, workDays: 25, performance: 87, avatar: '👨‍🍳' },
    { id: 8, name: 'Bùi Thu Hà', position: 'Phục vụ', department: 'Bán hàng', phone: '0989012345', email: 'btha@coffee.com', salary: 7000000, workDays: 22, performance: 83, avatar: '👩' },
    { id: 9, name: 'Đinh Quang Inh', position: 'Kho', department: 'Kho', phone: '0990123456', email: 'dqinh@coffee.com', salary: 8500000, workDays: 26, performance: 91, avatar: '👨‍💼' },
    { id: 10, name: 'Ngô Lan Khanh', position: 'Trưởng ca', department: 'Bán hàng', phone: '0901234567', email: 'nlkhanh@coffee.com', salary: 10000000, workDays: 26, performance: 94, avatar: '👩‍💼' }
  ];

  const departments = ['Tất cả', 'Quản lý', 'Bán hàng', 'Pha chế', 'Kho'];

  const filteredEmployees = selectedDepartment === 'Tất cả' 
    ? allEmployees 
    : allEmployees.filter(emp => emp.department === selectedDepartment);

  const totalEmployees = allEmployees.length;
  const totalSalary = allEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgPerformance = (allEmployees.reduce((sum, emp) => sum + emp.performance, 0) / allEmployees.length).toFixed(1);

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
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all">
              <Warehouse className="w-5 h-5" />
              <span className="font-medium">Kho</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105 transition-all">
              <UserCheck className="w-5 h-5" />
              <span className="font-medium">Nhân viên</span>
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
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Menu className="w-6 h-6 text-slate-600" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" placeholder="Tìm kiếm nhân viên..." className="pl-10 pr-4 py-2 w-96 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
              </div>
            </div>
            <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Quản lý nhân viên</h2>
              <p className="text-slate-600 mt-1">Tổng cộng {totalEmployees} nhân viên</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Thêm nhân viên
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Tổng nhân viên</p>
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-slate-800">{totalEmployees}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Tổng lương</p>
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-600">{(totalSalary / 1000000).toFixed(0)}M</p>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-semibold text-slate-700">Phòng ban:</span>
              {departments.map((dept) => (
                <button key={dept} onClick={() => setSelectedDepartment(dept)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${dept === selectedDepartment ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Employees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{employee.avatar}</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{employee.name}</h3>
                      <p className="text-sm text-amber-600 font-medium">{employee.position}</p>
                      <p className="text-xs text-slate-500">{employee.department}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-amber-500" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="w-4 h-4 text-amber-500" />
                    <span>{employee.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-xs text-slate-600 mb-1">Lương</p>
                    <p className="text-sm font-bold text-green-600">{(employee.salary / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-600 mb-1">Công</p>
                    <p className="text-sm font-bold text-blue-600">{employee.workDays}/26</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-600 mb-1">Hiệu suất</p>
                    <p className="text-sm font-bold text-purple-600">{employee.performance}%</p>
                  </div>
                </div>

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
        </main>
      </div>
    </div>
  );
};

export default EmployeeManagement;