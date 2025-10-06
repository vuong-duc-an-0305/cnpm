<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-coffee-800">Báo cáo doanh thu</h2>
        <p class="text-coffee-600 mt-1">Phân tích chi tiết hiệu quả kinh doanh</p>
      </div>
      <div class="flex gap-3">
        <select 
          v-model="selectedPeriod"
          class="px-4 py-2 bg-white border border-coffee-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500"
        >
          <option value="today">Hôm nay</option>
          <option value="week">Tuần này</option>
          <option value="month">Tháng này</option>
          <option value="year">Năm nay</option>
        </select>
        <BaseButton variant="secondary">
          <Download class="w-4 h-4 mr-2" />
          Xuất báo cáo
        </BaseButton>
      </div>
    </div>

    <!-- Revenue Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Tổng doanh thu"
        :value="revenueStats.total_revenue"
        format="currency"
        :change="revenueStats.revenue_growth"
        change-type="increase"
        color="blue"
        :icon="DollarSign"
      />
      <StatsCard
        title="Đơn hàng"
        :value="revenueStats.total_orders"
        :change="revenueStats.orders_growth"
        change-type="increase"
        color="green"
        :icon="ShoppingCart"
      />
      <StatsCard
        title="Giá trị TB"
        :value="revenueStats.average_order_value"
        format="currency"
        :change="revenueStats.avg_growth"
        change-type="increase"
        color="purple"
        :icon="TrendingUp"
      />
      <StatsCard
        title="Lợi nhuận"
        :value="revenueStats.profit"
        format="currency"
        :change="revenueStats.profit_growth"
        change-type="increase"
        color="orange"
        :icon="Activity"
      />
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue Chart -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-coffee-800">Doanh thu theo thời gian</h3>
          <select 
            v-model="chartPeriod"
            class="px-3 py-1 bg-coffee-50 border border-coffee-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500"
          >
            <option value="7">7 ngày</option>
            <option value="30">30 ngày</option>
            <option value="90">90 ngày</option>
          </select>
        </div>
        <div class="h-80">
          <LineChart
            v-if="chartData"
            :data="chartData"
            :options="chartOptions"
          />
        </div>
      </div>

      <!-- Category Distribution -->
      <div class="card p-6">
        <h3 class="text-lg font-bold text-coffee-800 mb-6">Doanh thu theo danh mục</h3>
        <div class="h-80">
          <DoughnutChart
            v-if="categoryData"
            :data="categoryData"
            :options="doughnutOptions"
          />
        </div>
        <div class="space-y-2 mt-4">
          <div
            v-for="(item, index) in categoryData?.datasets[0].data"
            :key="index"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <div 
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: categoryData.datasets[0].backgroundColor[index] }"
              ></div>
              <span class="text-sm text-coffee-600">{{ categoryData.labels[index] }}</span>
            </div>
            <span class="text-sm font-semibold text-coffee-800">{{ formatCurrency(item) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Best Selling Products -->
    <div class="card p-6">
      <h3 class="text-lg font-bold text-coffee-800 mb-6">Top sản phẩm bán chạy</h3>
      <div class="space-y-3">
        <div
          v-for="(product, index) in bestSellingProducts"
          :key="index"
          class="flex items-center justify-between p-4 bg-coffee-50 rounded-xl hover:bg-coffee-100 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div :class="getRankClasses(index)" class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white">
              {{ index + 1 }}
            </div>
            <div>
              <p class="font-semibold text-coffee-800">{{ product.name }}</p>
              <p class="text-sm text-coffee-600">Đã bán: {{ product.sold }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-green-600">{{ formatCurrency(product.revenue) }}</p>
            <span :class="product.trend === 'up' ? 'text-green-600' : 'text-red-600'" class="text-xs flex items-center gap-1">
              <component :is="product.trend === 'up' ? ArrowUp : ArrowDown" class="w-3 h-3" />
              {{ product.trend === 'up' ? 'Tăng' : 'Giảm' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Coming Soon Notice -->
    <div class="card p-6 bg-gradient-to-r from-coffee-100 to-coffee-200">
      <div class="text-center">
        <TrendingUp class="w-16 h-16 text-coffee-500 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-coffee-800 mb-2">Nhiều báo cáo hơn đang được phát triển</h3>
        <p class="text-coffee-600 mb-4">
          Chúng tôi đang làm việc để mang đến cho bạn nhiều loại báo cáo chi tiết hơn
        </p>
        <div class="flex flex-wrap justify-center gap-2">
          <span class="px-3 py-1 bg-white rounded-lg text-sm text-coffee-700">Báo cáo khách hàng</span>
          <span class="px-3 py-1 bg-white rounded-lg text-sm text-coffee-700">Báo cáo nhân viên</span>
          <span class="px-3 py-1 bg-white rounded-lg text-sm text-coffee-700">Báo cáo kho</span>
          <span class="px-3 py-1 bg-white rounded-lg text-sm text-coffee-700">So sánh theo kỳ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Activity,
  Download,
  ArrowUp,
  ArrowDown
} from 'lucide-vue-next'
import StatsCard from '@/components/common/StatsCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import LineChart from '@/components/charts/LineChart.vue'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import type { ChartData } from '@/types'

const toast = useToast()
const selectedPeriod = ref('month')
const chartPeriod = ref('7')

// Mock revenue stats
const revenueStats = ref({
  total_revenue: '125000000',
  total_orders: 1250,
  average_order_value: '100000',
  profit: '37500000',
  revenue_growth: 15.3,
  orders_growth: 8.2,
  avg_growth: 5.7,
  profit_growth: 12.3
})

// Mock best selling products
const bestSellingProducts = ref([
  { name: 'Cà phê đen', sold: 89, revenue: 4005000, trend: 'up' },
  { name: 'Cà phê sữa', sold: 76, revenue: 4180000, trend: 'up' },
  { name: 'Trà sữa truyền thống', sold: 67, revenue: 4355000, trend: 'up' },
  { name: 'Trà đào cam sả', sold: 56, revenue: 3080000, trend: 'down' },
  { name: 'Bạc xỉu', sold: 54, revenue: 2700000, trend: 'up' }
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

const categoryData = ref<ChartData>({
  labels: ['Cà phê', 'Trà sữa', 'Sinh tố', 'Đồ ăn'],
  datasets: [
    {
      data: [15200000, 12800000, 7600000, 4400000],
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

const formatCurrency = (value: string | number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(Number(value))
}

const getRankClasses = (index: number): string => {
  if (index === 0) return 'bg-coffee-500'
  if (index === 1) return 'bg-gray-400'
  if (index === 2) return 'bg-orange-500'
  return 'bg-gray-300'
}

onMounted(() => {
  toast.info('Báo cáo đang sử dụng dữ liệu mẫu')
})
</script>
