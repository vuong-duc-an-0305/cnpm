<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-coffee-600 to-coffee-700 rounded-2xl p-6 text-white shadow-xl">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold mb-2">Chào mừng trở lại, {{ user?.firstName }}! ☕</h2>
          <p class="text-coffee-100">
            Hôm nay có {{ todayStats.total_orders }} đơn hàng mới và doanh thu đạt 
            {{ formatCurrency(todayStats.total_revenue) }}
          </p>
        </div>
        <div class="text-6xl opacity-20">
          ☕
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Doanh thu hôm nay"
        :value="todayStats.total_revenue"
        format="currency"
        :change="todayStats.revenue_growth"
        change-type="increase"
        color="blue"
        :icon="DollarSign"
      />
      <StatsCard
        title="Đơn hàng"
        :value="todayStats.total_orders"
        :change="todayStats.orders_growth"
        change-type="increase"
        color="green"
        :icon="ShoppingCart"
      />
      <StatsCard
        title="Khách hàng mới"
        :value="todayStats.total_customers"
        :change="todayStats.customers_growth"
        change-type="increase"
        color="purple"
        :icon="Users"
      />
      <StatsCard
        title="Sản phẩm"
        :value="todayStats.total_products"
        :change="todayStats.products_growth"
        change-type="increase"
        color="orange"
        :icon="Package"
      />
    </div>

    <!-- Charts Section (tạm ẩn để ổn định dự án, sẽ bật lại sau khi hoàn tất tích hợp chart.js) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-3 card p-6 text-coffee-600">
        Khu vực biểu đồ tạm thời được ẩn để đảm bảo hệ thống chạy ổn định. Sẽ bật lại sau khi hoàn tất tích hợp biểu đồ.
      </div>
    </div>

    <!-- Recent Orders & Alerts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Orders -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-coffee-800">Đơn hàng gần đây</h3>
          <router-link
            to="/orders"
            class="text-sm text-coffee-600 hover:text-coffee-800 transition-colors"
          >
            Xem tất cả
          </router-link>
        </div>
        <div class="space-y-3">
          <div
            v-for="order in recentOrders"
            :key="order.id"
            class="flex items-center justify-between p-4 bg-coffee-50 rounded-xl hover:bg-coffee-100 transition-colors"
          >
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-1">
                <span class="font-semibold text-coffee-800">{{ order.id }}</span>
                <span :class="getStatusClasses(order.status)" class="px-2 py-1 text-xs rounded-lg">
                  {{ getStatusText(order.status) }}
                </span>
              </div>
              <p class="text-sm text-coffee-600">{{ order.customer }}</p>
              <p class="text-xs text-coffee-400">{{ order.time }}</p>
            </div>
            <span class="font-bold text-coffee-800">{{ formatCurrency(order.amount) }}</span>
          </div>
        </div>
      </div>

      <!-- Low Stock Alert -->
      <div class="card p-6">
        <h3 class="text-lg font-bold text-coffee-800 mb-4 flex items-center gap-2">
          <AlertCircle class="w-5 h-5 text-red-500" />
          Cảnh báo nguyên liệu
        </h3>
        <div class="space-y-3">
          <div
            v-for="item in lowStockItems"
            :key="item.id"
            class="p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <div class="flex items-start justify-between mb-2">
              <span class="font-semibold text-coffee-800">{{ item.name }}</span>
              <span class="text-xs bg-red-500 text-white px-2 py-1 rounded-lg">Sắp hết</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1 bg-red-200 h-2 rounded-full overflow-hidden">
                <div 
                  class="bg-red-500 h-full transition-all"
                  :style="{ width: `${(item.current / item.min) * 100}%` }"
                ></div>
              </div>
              <span class="text-sm text-coffee-600">{{ item.current }}/{{ item.min }} {{ item.unit }}</span>
            </div>
          </div>
          <button 
            @click="$router.push('/inventory')"
            class="w-full py-3 bg-gradient-to-r from-coffee-500 to-coffee-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
          >
            Nhập kho ngay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  AlertCircle
} from 'lucide-vue-next'
import StatsCard from '@/components/common/StatsCard.vue'
// Tạm thời không import chart components để tránh phụ thuộc gây lỗi
import type { DashboardStats, ChartData } from '@/types'

const router = useRouter()
const selectedPeriod = ref(7)

// Mock user data
const user = computed(() => ({
  firstName: 'Admin',
  lastName: 'User'
}))

// Mock dashboard stats
const todayStats = ref<DashboardStats>({
  total_orders: 88,
  total_revenue: '8850000',
  total_customers: 24,
  total_products: 156,
  revenue_growth: 12.5,
  orders_growth: 8.2,
  customers_growth: 15.3,
  products_growth: 2.4
})

// Mock recent orders
const recentOrders = ref([
  {
    id: '#0012',
    customer: 'Nguyễn Văn A',
    amount: 185000,
    status: 'completed',
    time: '2 phút trước'
  },
  {
    id: '#0011',
    customer: 'Trần Thị B',
    amount: 125000,
    status: 'processing',
    time: '5 phút trước'
  },
  {
    id: '#0010',
    customer: 'Lê Văn C',
    amount: 95000,
    status: 'completed',
    time: '12 phút trước'
  },
  {
    id: '#0009',
    customer: 'Phạm Thị D',
    amount: 210000,
    status: 'completed',
    time: '18 phút trước'
  }
])

// Mock low stock items
const lowStockItems = ref([
  {
    id: 1,
    name: 'Cà phê hạt Robusta',
    current: 2,
    min: 5,
    unit: 'kg'
  },
  {
    id: 2,
    name: 'Sữa tươi',
    current: 3,
    min: 10,
    unit: 'lít'
  },
  {
    id: 3,
    name: 'Đường trắng',
    current: 1,
    min: 3,
    unit: 'kg'
  }
])

// Mock chart data
const chartData = ref<ChartData>({
  labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  datasets: [
    {
      label: 'Doanh thu (K)',
      data: [4200, 5800, 4600, 7200, 8500, 9200, 8800],
      borderColor: '#D4AF37',
      backgroundColor: 'rgba(212, 175, 55, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4
    }
  ]
})

const productData = ref<ChartData>({
  labels: ['Cà phê đen', 'Cà phê sữa', 'Trà sữa', 'Sinh tố'],
  datasets: [
    {
      data: [35, 30, 20, 15],
      backgroundColor: [
        '#8B4513',
        '#D2691E',
        '#F4A460',
        '#DEB887'
      ],
      borderWidth: 0
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#e2e8f0'
      },
      ticks: {
        color: '#64748b'
      }
    },
    x: {
      grid: {
        color: '#e2e8f0'
      },
      ticks: {
        color: '#64748b'
      }
    }
  }
})

const doughnutOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  cutout: '60%'
})

// Methods
const formatCurrency = (value: string | number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(Number(value))
}

const getStatusClasses = (status: string): string => {
  const classMap = {
    completed: 'bg-green-100 text-green-700',
    processing: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-red-100 text-red-700'
  }
  return classMap[status as keyof typeof classMap] || 'bg-coffee-100 text-coffee-700'
}

const getStatusText = (status: string): string => {
  const textMap = {
    completed: 'Hoàn thành',
    processing: 'Đang xử lý',
    cancelled: 'Đã hủy'
  }
  return textMap[status as keyof typeof textMap] || status
}

const updateChartData = () => {
  // In real app, fetch new data based on selectedPeriod
  console.log('Updating chart data for period:', selectedPeriod.value)
}

onMounted(() => {
  // Fetch dashboard data
  console.log('Dashboard mounted')
})
</script>
