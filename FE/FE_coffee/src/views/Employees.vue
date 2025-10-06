<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-coffee-800">Quản lý nhân viên</h2>
        <p class="text-coffee-600 mt-1">Tổng cộng {{ employees.length }} nhân viên</p>
      </div>
      <BaseButton variant="primary" @click="createEmployee">
        <Plus class="w-4 h-4 mr-2" />
        Thêm nhân viên
      </BaseButton>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Tổng nhân viên"
        :value="employees.length"
        color="blue"
        :icon="Users"
      />
      <StatsCard
        title="Pha chế"
        :value="baristas"
        color="green"
        :icon="Coffee"
      />
      <StatsCard
        title="Thu ngân"
        :value="cashiers"
        color="orange"
        :icon="CreditCard"
      />
      <StatsCard
        title="Quản lý"
        :value="managers"
        color="purple"
        :icon="UserCheck"
      />
    </div>

    <!-- Filter by Shift -->
    <div class="bg-white rounded-xl p-4 shadow-md">
      <div class="flex items-center gap-3 flex-wrap">
        <span class="text-sm font-semibold text-coffee-700">Ca làm việc:</span>
        <button
          v-for="shift in shifts"
          :key="shift.value"
          @click="selectedShift = shift.value"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            selectedShift === shift.value
              ? 'bg-gradient-to-r from-coffee-500 to-coffee-600 text-white shadow-md'
              : 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'
          ]"
        >
          {{ shift.label }}
        </button>
      </div>
    </div>

    <!-- Employees Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="employee in filteredEmployees"
        :key="employee.EmployeeID"
        class="card p-6 hover:scale-105 transition-all duration-300"
      >
        <!-- Employee Avatar -->
        <div class="text-4xl mb-4 text-center">👨‍💼</div>
        
        <!-- Employee Info -->
        <h3 class="text-lg font-bold text-coffee-800 mb-1">{{ employee.FullName }}</h3>
        <p class="text-sm text-coffee-500 mb-3">{{ employee.PhoneNumber }}</p>
        
        <!-- Job Title & Shift -->
        <div class="space-y-2 mb-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-coffee-600">Chức vụ:</span>
            <span class="font-semibold text-coffee-800">{{ employee.JobTitle }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-coffee-600">Ca làm:</span>
            <span class="font-semibold text-coffee-800">{{ getShiftText(employee.WorkShift) }}</span>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex gap-2">
          <BaseButton
            @click="viewEmployee(employee.EmployeeID)"
            variant="ghost"
            size="sm"
            class="flex-1"
          >
            <Eye class="w-4 h-4 mr-1" />
            Xem
          </BaseButton>
          <BaseButton
            @click="editEmployee(employee.EmployeeID)"
            variant="secondary"
            size="sm"
            class="flex-1"
          >
            <Edit class="w-4 h-4 mr-1" />
            Sửa
          </BaseButton>
          <BaseButton
            @click="deleteEmployee(employee.EmployeeID)"
            variant="danger"
            size="sm"
          >
            <Trash2 class="w-4 h-4" />
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredEmployees.length === 0" class="text-center py-12">
      <UserCheck class="w-16 h-16 text-coffee-300 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-coffee-600 mb-2">Không có nhân viên nào</h3>
      <p class="text-coffee-500 mb-4">Hãy thêm nhân viên đầu tiên để bắt đầu</p>
      <BaseButton variant="primary" @click="createEmployee">
        <Plus class="w-4 h-4 mr-2" />
        Thêm nhân viên
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
  Coffee,
  CreditCard,
  UserCheck,
  Eye,
  Edit,
  Trash2
} from 'lucide-vue-next'
import StatsCard from '@/components/common/StatsCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import type { Employee } from '@/types'

const toast = useToast()
const employees = ref<Employee[]>([])
const selectedShift = ref('Tất cả')

const shifts = [
  { value: 'Tất cả', label: 'Tất cả' },
  { value: 'SANG', label: 'Ca sáng' },
  { value: 'CHIEU', label: 'Ca chiều' },
  { value: 'TOI', label: 'Ca tối' },
  { value: 'FULL', label: 'Full time' }
]

// Mock data
const mockEmployees: Employee[] = [
  {
    EmployeeID: 1,
    FullName: 'Nguyễn Văn An',
    PhoneNumber: '0912345678',
    JobTitle: 'Quản lý',
    WorkShift: 'FULL',
    work_shift_display: 'Full time'
  },
  {
    EmployeeID: 2,
    FullName: 'Trần Thị Bình',
    PhoneNumber: '0923456789',
    JobTitle: 'Thu ngân',
    WorkShift: 'SANG',
    work_shift_display: 'Ca sáng'
  },
  {
    EmployeeID: 3,
    FullName: 'Lê Hoàng Cường',
    PhoneNumber: '0934567890',
    JobTitle: 'Pha chế',
    WorkShift: 'CHIEU',
    work_shift_display: 'Ca chiều'
  }
]

const filteredEmployees = computed(() => {
  if (selectedShift.value === 'Tất cả') return employees.value
  return employees.value.filter(emp => emp.WorkShift === selectedShift.value)
})

const baristas = computed(() => 
  employees.value.filter(emp => emp.JobTitle === 'Pha chế').length
)

const cashiers = computed(() => 
  employees.value.filter(emp => emp.JobTitle === 'Thu ngân').length
)

const managers = computed(() => 
  employees.value.filter(emp => emp.JobTitle === 'Quản lý').length
)

const getShiftText = (shift: string): string => {
  const shiftMap = {
    'SANG': 'Ca sáng',
    'CHIEU': 'Ca chiều',
    'TOI': 'Ca tối',
    'FULL': 'Full time'
  }
  return shiftMap[shift as keyof typeof shiftMap] || shift
}

const createEmployee = () => {
  toast.info('Tính năng tạo nhân viên đang được phát triển')
}

const viewEmployee = (id: number) => {
  toast.info('Tính năng xem chi tiết nhân viên đang được phát triển')
}

const editEmployee = (id: number) => {
  toast.info('Tính năng chỉnh sửa nhân viên đang được phát triển')
}

const deleteEmployee = (id: number) => {
  toast.info('Tính năng xóa nhân viên đang được phát triển')
}

onMounted(() => {
  employees.value = mockEmployees
})
</script>
