<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-coffee-800">Quản lý kho nguyên liệu</h2>
        <p class="text-coffee-600 mt-1">Tổng cộng {{ ingredients.length }} loại nguyên liệu</p>
      </div>
      <BaseButton variant="primary" @click="createImport">
        <Plus class="w-4 h-4 mr-2" />
        Nhập kho
      </BaseButton>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Nguyên liệu cấp bách"
        :value="criticalIngredients"
        color="red"
        :icon="AlertTriangle"
      />
      <StatsCard
        title="Sắp hết hàng"
        :value="lowStockIngredients"
        color="orange"
        :icon="Clock"
      />
      <StatsCard
        title="Đủ dùng"
        :value="sufficientIngredients"
        color="green"
        :icon="CheckCircle"
      />
      <StatsCard
        title="Tổng giá trị kho"
        :value="totalValue"
        format="currency"
        color="blue"
        :icon="DollarSign"
      />
    </div>

    <!-- Critical Alerts -->
    <div v-if="criticalIngredients > 0" class="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 flex items-start gap-3">
      <AlertTriangle class="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
      <div>
        <h3 class="font-bold text-red-800 mb-1">Cảnh báo tồn kho!</h3>
        <p class="text-red-700 text-sm">
          Có {{ criticalIngredients }} nguyên liệu đang ở mức tồn kho cấp bách. 
          Vui lòng nhập hàng ngay để tránh gián đoạn sản xuất.
        </p>
      </div>
    </div>

    <!-- Ingredients Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="ingredient in ingredients"
        :key="ingredient.IngredientID"
        class="card p-6 hover:scale-105 transition-all duration-300"
      >
        <!-- Ingredient Icon -->
        <div class="text-5xl mb-4 text-center">☕</div>
        
        <!-- Status Badge -->
        <div class="flex justify-end mb-2">
          <span :class="getStatusClasses(ingredient)" class="px-3 py-1 text-xs rounded-lg font-medium">
            {{ getStatusText(ingredient) }}
          </span>
        </div>
        
        <!-- Ingredient Info -->
        <h3 class="text-lg font-bold text-coffee-800 mb-1">{{ ingredient.IngredientName }}</h3>
        
        <!-- Stock Info -->
        <div class="space-y-2 mb-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-coffee-600">Tồn kho:</span>
            <span class="font-bold text-lg text-coffee-800">{{ ingredient.QuantityInStock }} g</span>
          </div>
          
          <!-- Stock Progress Bar -->
          <div class="space-y-1">
            <div class="flex justify-between text-xs text-coffee-600">
              <span>Min: {{ ingredient.MinQuantity }}g</span>
            </div>
            <div class="w-full bg-coffee-200 h-3 rounded-full overflow-hidden">
              <div 
                :class="getProgressColor(ingredient)"
                class="h-full transition-all"
                :style="{ width: `${getStockPercentage(ingredient)}%` }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex gap-2">
          <BaseButton
            @click="addStock(ingredient.IngredientID)"
            variant="secondary"
            size="sm"
            class="flex-1"
          >
            <Plus class="w-4 h-4 mr-1" />
            Nhập
          </BaseButton>
          <BaseButton
            @click="editIngredient(ingredient.IngredientID)"
            variant="ghost"
            size="sm"
            class="flex-1"
          >
            <Edit class="w-4 h-4 mr-1" />
            Sửa
          </BaseButton>
          <BaseButton
            @click="deleteIngredient(ingredient.IngredientID)"
            variant="danger"
            size="sm"
          >
            <Trash2 class="w-4 h-4" />
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import {
  Plus,
  AlertTriangle,
  Clock,
  CheckCircle,
  DollarSign,
  Edit,
  Trash2
} from 'lucide-vue-next'
import StatsCard from '@/components/common/StatsCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import type { Ingredient } from '@/types'

const toast = useToast()
const ingredients = ref<Ingredient[]>([])

// Mock data
const mockIngredients: Ingredient[] = [
  {
    IngredientID: 1,
    IngredientName: 'Cà phê hạt Arabica',
    QuantityInStock: '45.000',
    MinQuantity: '20.000',
    is_low_stock: false,
    stock_percentage: 225
  },
  {
    IngredientID: 2,
    IngredientName: 'Cà phê hạt Robusta',
    QuantityInStock: '2.000',
    MinQuantity: '20.000',
    is_low_stock: true,
    stock_percentage: 10
  },
  {
    IngredientID: 3,
    IngredientName: 'Sữa tươi',
    QuantityInStock: '15.000',
    MinQuantity: '30.000',
    is_low_stock: true,
    stock_percentage: 50
  }
]

const criticalIngredients = computed(() => 
  ingredients.value.filter(i => getStockPercentage(i) < 30).length
)

const lowStockIngredients = computed(() => 
  ingredients.value.filter(i => getStockPercentage(i) >= 30 && getStockPercentage(i) < 70).length
)

const sufficientIngredients = computed(() => 
  ingredients.value.filter(i => getStockPercentage(i) >= 70).length
)

const totalValue = computed(() => {
  // Mock calculation
  return ingredients.value.reduce((sum, ingredient) => {
    return sum + (parseFloat(ingredient.QuantityInStock) * 1000) // Mock price per gram
  }, 0)
})

const getStockPercentage = (ingredient: Ingredient): number => {
  const stock = parseFloat(ingredient.QuantityInStock)
  const min = parseFloat(ingredient.MinQuantity)
  return Math.min((stock / min) * 100, 100)
}

const getStatusClasses = (ingredient: Ingredient): string => {
  const percentage = getStockPercentage(ingredient)
  if (percentage < 30) return 'bg-red-100 text-red-700'
  if (percentage < 70) return 'bg-yellow-100 text-yellow-700'
  return 'bg-green-100 text-green-700'
}

const getStatusText = (ingredient: Ingredient): string => {
  const percentage = getStockPercentage(ingredient)
  if (percentage < 30) return 'Cấp bách'
  if (percentage < 70) return 'Sắp hết'
  return 'Đủ dùng'
}

const getProgressColor = (ingredient: Ingredient): string => {
  const percentage = getStockPercentage(ingredient)
  if (percentage < 30) return 'bg-red-500'
  if (percentage < 70) return 'bg-yellow-500'
  return 'bg-green-500'
}

const createImport = () => {
  toast.info('Tính năng nhập kho đang được phát triển')
}

const addStock = (id: number) => {
  toast.info('Tính năng thêm tồn kho đang được phát triển')
}

const editIngredient = (id: number) => {
  toast.info('Tính năng chỉnh sửa nguyên liệu đang được phát triển')
}

const deleteIngredient = (id: number) => {
  toast.info('Tính năng xóa nguyên liệu đang được phát triển')
}

onMounted(() => {
  ingredients.value = mockIngredients
})
</script>
