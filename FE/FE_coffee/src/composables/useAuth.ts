import { computed } from 'vue'

export interface User {
  role: string
  name: string
  token: string | null
}

export function useAuth() {
  const user = computed<User>(() => ({
    role: localStorage.getItem('user_role') || '',
    name: localStorage.getItem('user_name') || '',
    token: localStorage.getItem('auth_token')
  }))

  const isAuthenticated = computed(() => !!user.value.token)
  
  const isAdmin = computed(() => user.value.role === 'admin')
  const isCashier = computed(() => user.value.role === 'cashier')

  // Quyền truy cập các trang
  const canAccessDashboard = computed(() => isAdmin.value)
  const canAccessOrders = computed(() => isAdmin.value || isCashier.value)
  const canAccessProducts = computed(() => isAdmin.value)
  const canAccessCustomers = computed(() => isAdmin.value)
  const canAccessEmployees = computed(() => isAdmin.value)
  const canAccessInventory = computed(() => isAdmin.value)
  const canAccessReports = computed(() => isAdmin.value)

  // Danh sách menu items dựa trên quyền
  const menuItems = computed(() => {
    const items = [
      { name: 'dashboard', label: 'Tổng quan', icon: 'BarChart3', path: '/dashboard', show: canAccessDashboard.value },
      { name: 'orders', label: 'Đơn hàng', icon: 'ShoppingCart', path: '/orders', show: canAccessOrders.value },
      { name: 'products', label: 'Sản phẩm', icon: 'Package', path: '/products', show: canAccessProducts.value },
      { name: 'customers', label: 'Khách hàng', icon: 'Users', path: '/customers', show: canAccessCustomers.value },
      { name: 'employees', label: 'Nhân viên', icon: 'UserCheck', path: '/employees', show: canAccessEmployees.value },
      { name: 'inventory', label: 'Kho hàng', icon: 'Warehouse', path: '/inventory', show: canAccessInventory.value },
      { name: 'reports', label: 'Báo cáo', icon: 'FileText', path: '/reports', show: canAccessReports.value }
    ]
    
    return items.filter(item => item.show)
  })

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_role')
    localStorage.removeItem('user_name')
  }

  const hasPermission = (permission: string): boolean => {
    switch (permission) {
      case 'dashboard':
        return canAccessDashboard.value
      case 'orders':
        return canAccessOrders.value
      case 'products':
        return canAccessProducts.value
      case 'customers':
        return canAccessCustomers.value
      case 'employees':
        return canAccessEmployees.value
      case 'inventory':
        return canAccessInventory.value
      case 'reports':
        return canAccessReports.value
      default:
        return false
    }
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    isCashier,
    canAccessDashboard,
    canAccessOrders,
    canAccessProducts,
    canAccessCustomers,
    canAccessEmployees,
    canAccessInventory,
    canAccessReports,
    menuItems,
    logout,
    hasPermission
  }
}









