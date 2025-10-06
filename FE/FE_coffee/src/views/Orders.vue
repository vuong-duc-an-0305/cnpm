<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-coffee-800">Quản lý đơn hàng</h2>
        <p class="text-coffee-600 mt-1">Tổng cộng {{ orders.length }} đơn hàng</p>
      </div>
      <div class="flex gap-3">
        <select 
          v-model="statusFilter"
          class="px-4 py-2 bg-white border border-coffee-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="PENDING">Chờ xác nhận</option>
          <option value="PREPARING">Đang chuẩn bị</option>
          <option value="COMPLETED">Hoàn thành</option>
          <option value="CANCELLED">Đã hủy</option>
        </select>
        <input
          v-model="searchQuery"
          @keyup.enter="fetchOrders"
          class="px-4 py-2 bg-white border border-coffee-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500"
          placeholder="Tìm mã đơn / tên / SĐT KH"
        />
        <button class="btn-secondary" @click="fetchOrders">Lọc</button>
        <button class="btn-primary" @click="showCreate = !showCreate">➕ Tạo đơn hàng</button>
      </div>
    </div>

    <!-- Inline Create Order Form -->
    <div v-if="showCreate" class="card p-4">
      <NewOrder @created="onOrderCreated" />
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="card p-6">
        <h3 class="text-coffee-600 text-sm mb-1 font-medium">Tổng đơn hàng</h3>
        <p class="text-2xl font-bold text-coffee-700">{{ orders.length }}</p>
      </div>
      <div class="card p-6">
        <h3 class="text-coffee-600 text-sm mb-1 font-medium">Hoàn thành</h3>
        <p class="text-2xl font-bold text-coffee-700">{{ completedOrders }}</p>
      </div>
      <div class="card p-6">
        <h3 class="text-coffee-600 text-sm mb-1 font-medium">Đang xử lý</h3>
        <p class="text-2xl font-bold text-coffee-700">{{ processingOrders }}</p>
      </div>
      <div class="card p-6">
        <h3 class="text-coffee-600 text-sm mb-1 font-medium">Đã hủy</h3>
        <p class="text-2xl font-bold text-coffee-700">{{ cancelledOrders }}</p>
      </div>
    </div>

    <!-- Orders Table (đơn giản, không phụ thuộc DataTable) -->
    <div class="card overflow-hidden">
      <div class="px-6 py-4 border-b border-coffee-200">
        <h3 class="text-lg font-bold text-coffee-800">Danh sách đơn hàng</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-coffee-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-coffee-700 uppercase">Mã đơn</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-coffee-700 uppercase">Khách hàng</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-coffee-700 uppercase">Nhân viên</th>
              <th class="px-6 py-3 text-right text-xs font-semibold text-coffee-700 uppercase">Tổng tiền</th>
              <th class="px-6 py-3 text-center text-xs font-semibold text-coffee-700 uppercase">Trạng thái</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-coffee-700 uppercase">Ngày đặt</th>
              <th class="px-6 py-3 text-right text-xs font-semibold text-coffee-700 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-coffee-200">
            <tr v-for="item in filteredOrders" :key="item.OrderID" class="hover:bg-coffee-50">
              <td class="px-6 py-4">{{ item.OrderID }}</td>
              <td class="px-6 py-4">{{ item.customer_name || '-' }}</td>
              <td class="px-6 py-4">{{ item.employee_name || '-' }}</td>
              <td class="px-6 py-4 text-right">{{ formatCurrency(item.TotalAmount) }}</td>
              <td class="px-6 py-4 text-center">
                <span :class="getStatusClasses(item.Status)" class="px-3 py-1 rounded-lg text-xs font-medium">
                  {{ getStatusText(item.Status) }}
                </span>
              </td>
              <td class="px-6 py-4">{{ formatDate(item.OrderDate) }}</td>
              <td class="px-6 py-4 text-right">
                <button class="btn-secondary mr-2" @click="viewOrder(item.OrderID)">👁️ Xem</button>
                <button v-if="item.Status === 'PENDING' || item.Status === 'PREPARING'" class="btn-primary" :disabled="updating[item.OrderID]" @click="updateOrderStatus(item.OrderID, 'COMPLETED')">
                  {{ updating[item.OrderID] ? 'Đang cập nhật...' : '✅ Hoàn thành' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
// import { useToast } from 'vue-toastification'
const NewOrder = defineAsyncComponent(() => import('./NewOrder.vue'))
import { orderService } from '../services/orders'
type Order = any
type TableColumn = any

const router = useRouter()
const toast = { success: console.log, error: console.error }

const isLoading = ref(false)
const statusFilter = ref('')
const searchQuery = ref('')
const page = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)
const showCreate = ref(false)
const orders = ref<Order[]>([])

// Mock data for demo
const mockOrders: Order[] = [
  {
    OrderID: 1,
    CustomerID: 1,
    customer_name: 'Nguyễn Văn A',
    EmployeeID: 1,
    employee_name: 'Lê Văn C',
    OrderDate: '2024-01-15T10:30:00Z',
    TotalAmount: '150000.00',
    Discount: '15000.00',
    FinalAmount: '135000.00',
    PaymentMethod: 'CASH',
    Status: 'COMPLETED',
    status_display: 'Hoàn thành',
    payment_method_display: 'Tiền mặt',
    items_count: 3
  },
  {
    OrderID: 2,
    CustomerID: 2,
    customer_name: 'Trần Thị B',
    EmployeeID: 1,
    employee_name: 'Lê Văn C',
    OrderDate: '2024-01-15T11:15:00Z',
    TotalAmount: '85000.00',
    Discount: '0.00',
    FinalAmount: '85000.00',
    PaymentMethod: 'CARD',
    Status: 'PREPARING',
    status_display: 'Đang chuẩn bị',
    payment_method_display: 'Thẻ',
    items_count: 2
  }
]

const columns: TableColumn[] = [
  { key: 'OrderID', label: 'Mã đơn', sortable: true, width: '100' },
  { key: 'customer_name', label: 'Khách hàng', sortable: true },
  { key: 'employee_name', label: 'Nhân viên', sortable: true },
  { key: 'TotalAmount', label: 'Tổng tiền', sortable: true, align: 'right' },
  { key: 'Status', label: 'Trạng thái', sortable: true, align: 'center' },
  { key: 'OrderDate', label: 'Ngày đặt', sortable: true },
  { key: 'PaymentMethod', label: 'Thanh toán', sortable: true }
]

const filteredOrders = computed(() => {
  if (!statusFilter.value) return orders.value
  return orders.value.filter(order => order.Status === statusFilter.value)
})

const completedOrders = computed(() => 
  orders.value.filter(order => order.Status === 'COMPLETED').length
)

const processingOrders = computed(() => 
  orders.value.filter(order => order.Status === 'PREPARING' || order.Status === 'PENDING').length
)

const cancelledOrders = computed(() => 
  orders.value.filter(order => order.Status === 'CANCELLED').length
)

const formatCurrency = (value: string | number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(Number(value))
}

const formatDate = (value: string): string => {
  return new Date(value).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClasses = (status: string): string => {
  const classMap = {
    'COMPLETED': 'bg-green-100 text-green-700',
    'PREPARING': 'bg-yellow-100 text-yellow-700',
    'PENDING': 'bg-blue-100 text-blue-700',
    'CANCELLED': 'bg-red-100 text-red-700'
  }
  return classMap[status as keyof typeof classMap] || 'bg-coffee-100 text-coffee-700'
}

const getStatusText = (status: string): string => {
  const textMap = {
    'COMPLETED': 'Hoàn thành',
    'PREPARING': 'Đang chuẩn bị',
    'PENDING': 'Chờ xác nhận',
    'CANCELLED': 'Đã hủy'
  }
  return textMap[status as keyof typeof textMap] || status
}

const viewOrder = (orderId: number) => {
  router.push(`/orders/${orderId}`)
}

const updating = ref<Record<number, boolean>>({})
const updateOrderStatus = async (orderId: number, status: string) => {
  try {
    updating.value[orderId] = true
    await orderService.updateStatus(orderId, status)
    toast.success('Cập nhật trạng thái thành công')
    await fetchOrders()
  } catch (error) {
    // Log chi tiết lỗi từ BE để dễ chẩn đoán (404/400, thông điệp cụ thể)
    // eslint-disable-next-line no-console
    console.error('Update status error:', error)
    // eslint-disable-next-line no-console
    console.error('API response data:', (error as any)?.response?.data)
    const msg = (error as any)?.response?.data?.message || (error as any)?.response?.data?.detail || 'Không tìm thấy dữ liệu hoặc trạng thái không hợp lệ'
    toast.error(msg)
  } finally {
    updating.value[orderId] = false
  }
}

const fetchOrders = async () => {
  try {
    isLoading.value = true
    const params: any = {
      status: statusFilter.value || undefined,
      search: searchQuery.value || undefined,
      page: page.value,
      page_size: pageSize.value,
    }
    const res: any = await orderService.getAll(params)
    const items = Array.isArray(res) ? res : (res.results || [])
    orders.value = items
    totalCount.value = Array.isArray(res) ? items.length : (res.count || items.length)
  } catch (error) {
    toast.error('Có lỗi xảy ra khi tải danh sách đơn hàng')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchOrders()
})

const onOrderCreated = async (_created: any) => {
  // Sau khi tạo: đóng form và reload danh sách
  showCreate.value = false
  await fetchOrders()
}
</script>
