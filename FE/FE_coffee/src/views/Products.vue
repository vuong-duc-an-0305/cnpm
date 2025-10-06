<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-coffee-800">Quản lý sản phẩm</h2>
        <p class="text-coffee-600 mt-1">Tổng cộng {{ products.length }} sản phẩm</p>
      </div>
      <BaseButton variant="primary" @click="createProduct">
        <Plus class="w-4 h-4 mr-2" />
        Thêm sản phẩm
      </BaseButton>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Tổng sản phẩm"
        :value="products.length"
        color="blue"
        :icon="Package"
      />
      <StatsCard
        title="Đang bán"
        :value="activeProducts"
        color="green"
        :icon="CheckCircle"
      />
      <StatsCard
        title="Sắp hết hàng"
        :value="lowStockProducts"
        color="orange"
        :icon="AlertTriangle"
      />
      <StatsCard
        title="Hết hàng"
        :value="outOfStockProducts"
        color="red"
        :icon="XCircle"
      />
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product.ProductID"
        class="card p-6 hover:scale-105 transition-all duration-300"
      >
        <!-- Product Image -->
        <div class="text-5xl mb-4 text-center">☕</div>
        
        <!-- Product Info -->
        <h3 class="text-lg font-bold text-coffee-800 mb-1">{{ product.ProductName }}</h3>
        <p class="text-sm text-coffee-500 mb-3">{{ product.category_name }}</p>
        
        <!-- Price -->
        <div class="flex items-center justify-between mb-4">
          <span class="text-2xl font-bold text-coffee-600">{{ formatCurrency(product.Price) }}</span>
          <span :class="getStatusClasses(product.Status)" class="px-2 py-1 text-xs rounded-lg">
            {{ getStatusText(product.Status) }}
          </span>
        </div>
        
        <!-- Actions -->
        <div class="flex gap-2">
          <BaseButton
            @click="viewProduct(product.ProductID)"
            variant="ghost"
            size="sm"
            class="flex-1"
          >
            <Eye class="w-4 h-4 mr-1" />
            Xem
          </BaseButton>
          <BaseButton
            @click="editProduct(product.ProductID)"
            variant="secondary"
            size="sm"
            class="flex-1"
          >
            <Edit class="w-4 h-4 mr-1" />
            Sửa
          </BaseButton>
          <BaseButton
            @click="deleteProduct(product.ProductID)"
            variant="danger"
            size="sm"
          >
            <Trash2 class="w-4 h-4" />
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="products.length === 0" class="text-center py-12">
      <Package class="w-16 h-16 text-coffee-300 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-coffee-600 mb-2">Chưa có sản phẩm nào</h3>
      <p class="text-coffee-500 mb-4">Hãy thêm sản phẩm đầu tiên để bắt đầu</p>
      <BaseButton variant="primary" @click="createProduct">
        <Plus class="w-4 h-4 mr-2" />
        Thêm sản phẩm
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import {
  Plus,
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  Edit,
  Trash2
} from 'lucide-vue-next'
import StatsCard from '@/components/common/StatsCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import type { Product } from '@/types'

const toast = useToast()
const products = ref<Product[]>([])

// Mock data
const mockProducts: Product[] = [
  {
    ProductID: 1,
    ProductName: 'Cà phê đen',
    Price: '45000.00',
    CategoryID: 1,
    category_name: 'Cà phê',
    Status: 1,
    status_display: 'Còn hàng'
  },
  {
    ProductID: 2,
    ProductName: 'Cà phê sữa',
    Price: '55000.00',
    CategoryID: 1,
    category_name: 'Cà phê',
    Status: 1,
    status_display: 'Còn hàng'
  }
]

const activeProducts = computed(() => 
  products.value.filter(p => p.Status === 1).length
)

const lowStockProducts = computed(() => 
  products.value.filter(p => p.Status === 0).length
)

const outOfStockProducts = computed(() => 
  products.value.filter(p => p.Status === 0).length
)

const formatCurrency = (value: string | number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(Number(value))
}

const getStatusClasses = (status: number): string => {
  return status === 1 
    ? 'bg-green-100 text-green-700' 
    : 'bg-red-100 text-red-700'
}

const getStatusText = (status: number): string => {
  return status === 1 ? 'Còn hàng' : 'Hết hàng'
}

const createProduct = () => {
  toast.info('Tính năng tạo sản phẩm đang được phát triển')
}

const viewProduct = (id: number) => {
  toast.info('Tính năng xem chi tiết sản phẩm đang được phát triển')
}

const editProduct = (id: number) => {
  toast.info('Tính năng chỉnh sửa sản phẩm đang được phát triển')
}

const deleteProduct = (id: number) => {
  toast.info('Tính năng xóa sản phẩm đang được phát triển')
}

onMounted(() => {
  products.value = mockProducts
})
</script>
