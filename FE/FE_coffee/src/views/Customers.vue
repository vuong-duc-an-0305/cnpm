<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-coffee-800">Quản lý khách hàng</h2>
        <p class="text-coffee-600 mt-1">Tổng cộng {{ customers.length }} khách hàng</p>
      </div>
      <BaseButton variant="primary" @click="createCustomer">
        <Plus class="w-4 h-4 mr-2" />
        Thêm khách hàng
      </BaseButton>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Tổng khách hàng"
        :value="customers.length"
        color="blue"
        :icon="Users"
      />
      <StatsCard
        title="Khách VIP"
        :value="vipCustomers"
        color="purple"
        :icon="Award"
      />
      <StatsCard
        title="Khách thường"
        :value="regularCustomers"
        color="green"
        :icon="User"
      />
      <StatsCard
        title="Khách mới"
        :value="newCustomers"
        color="orange"
        :icon="UserPlus"
      />
    </div>

    <!-- Customers Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="customer in customers"
        :key="customer.CustomerID"
        class="card p-6 hover:scale-105 transition-all duration-300"
      >
        <!-- Customer Avatar -->
        <div class="text-4xl mb-4 text-center">👤</div>
        
        <!-- Customer Info -->
        <h3 class="text-lg font-bold text-coffee-800 mb-1">{{ customer.FullName }}</h3>
        <p class="text-sm text-coffee-500 mb-3">{{ customer.PhoneNumber }}</p>
        
        <!-- Membership Level -->
        <div class="flex items-center justify-between mb-4">
          <span :class="getMembershipClasses(customer.membership_level)" class="px-2 py-1 text-xs rounded-lg font-medium">
            {{ getMembershipText(customer.membership_level) }}
          </span>
          <span class="text-sm text-coffee-600">{{ customer.LoyaltyPoints }} điểm</span>
        </div>
        
        <!-- Actions -->
        <div class="flex gap-2">
          <BaseButton
            @click="viewCustomer(customer.CustomerID)"
            variant="ghost"
            size="sm"
            class="flex-1"
          >
            <Eye class="w-4 h-4 mr-1" />
            Xem
          </BaseButton>
          <BaseButton
            @click="editCustomer(customer.CustomerID)"
            variant="secondary"
            size="sm"
            class="flex-1"
          >
            <Edit class="w-4 h-4 mr-1" />
            Sửa
          </BaseButton>
          <BaseButton
            @click="deleteCustomer(customer.CustomerID)"
            variant="danger"
            size="sm"
          >
            <Trash2 class="w-4 h-4" />
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="customers.length === 0" class="text-center py-12">
      <Users class="w-16 h-16 text-coffee-300 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-coffee-600 mb-2">Chưa có khách hàng nào</h3>
      <p class="text-coffee-500 mb-4">Hãy thêm khách hàng đầu tiên để bắt đầu</p>
      <BaseButton variant="primary" @click="createCustomer">
        <Plus class="w-4 h-4 mr-2" />
        Thêm khách hàng
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import {
  Plus,
  Users,
  Award,
  User,
  UserPlus,
  Eye,
  Edit,
  Trash2
} from 'lucide-vue-next'
import StatsCard from '@/components/common/StatsCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import type { Customer } from '@/types'

const toast = useToast()
const customers = ref<Customer[]>([])

// Mock data
const mockCustomers: Customer[] = [
  {
    CustomerID: 1,
    FullName: 'Nguyễn Văn A',
    PhoneNumber: '0912345678',
    Email: 'nguyenvanan@gmail.com',
    LoyaltyPoints: 450,
    membership_level: 'VIP'
  },
  {
    CustomerID: 2,
    FullName: 'Trần Thị B',
    PhoneNumber: '0923456789',
    Email: 'tranthibinh@gmail.com',
    LoyaltyPoints: 280,
    membership_level: 'Silver'
  }
]

const vipCustomers = computed(() => 
  customers.value.filter(c => c.membership_level === 'VIP' || c.membership_level === 'Gold').length
)

const regularCustomers = computed(() => 
  customers.value.filter(c => c.membership_level === 'Silver' || c.membership_level === 'Bronze').length
)

const newCustomers = computed(() => 
  customers.value.filter(c => (c.LoyaltyPoints || 0) < 100).length
)

const getMembershipClasses = (level?: string): string => {
  const classMap = {
    'VIP': 'bg-purple-100 text-purple-700',
    'Gold': 'bg-yellow-100 text-yellow-700',
    'Silver': 'bg-gray-100 text-gray-700',
    'Bronze': 'bg-orange-100 text-orange-700'
  }
  return classMap[level as keyof typeof classMap] || 'bg-coffee-100 text-coffee-700'
}

const getMembershipText = (level?: string): string => {
  return level || 'Thường'
}

const createCustomer = () => {
  toast.info('Tính năng tạo khách hàng đang được phát triển')
}

const viewCustomer = (id: number) => {
  toast.info('Tính năng xem chi tiết khách hàng đang được phát triển')
}

const editCustomer = (id: number) => {
  toast.info('Tính năng chỉnh sửa khách hàng đang được phát triển')
}

const deleteCustomer = (id: number) => {
  toast.info('Tính năng xóa khách hàng đang được phát triển')
}

onMounted(() => {
  customers.value = mockCustomers
})
</script>
