<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-coffee-800">Quản lý nhân viên</h2>
        <p class="text-coffee-600 mt-1">Tổng cộng {{ employees.length }} nhân viên</p>
      </div>
      <button class="btn-primary inline-flex items-center" @click="createEmployee">
        <Plus class="w-4 h-4 mr-2" />
        Thêm nhân viên
      </button>
    </div>

    <!-- Stats Cards (simple) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="card p-6">
        <h3 class="text-coffee-600 text-sm mb-1 font-medium">Tổng nhân viên</h3>
        <p class="text-2xl font-bold text-coffee-700">{{ employees.length }}</p>
      </div>
      <div class="card p-6">
        <h3 class="text-coffee-600 text-sm mb-1 font-medium">Pha chế</h3>
        <p class="text-2xl font-bold text-coffee-700">{{ baristas }}</p>
      </div>
      <div class="card p-6">
        <h3 class="text-coffee-600 text-sm mb-1 font-medium">Thu ngân</h3>
        <p class="text-2xl font-bold text-coffee-700">{{ cashiers }}</p>
      </div>
      <div class="card p-6">
        <h3 class="text-coffee-600 text-sm mb-1 font-medium">Quản lý</h3>
        <p class="text-2xl font-bold text-coffee-700">{{ managers }}</p>
      </div>
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
        <div class="ml-auto flex items-center gap-2">
          <input v-model="searchQuery" @input="onSearchInput" class="input-field" placeholder="Tìm tên/SĐT/chức vụ" />
          <button class="btn-secondary" @click="fetchEmployees">Lọc</button>
        </div>
      </div>
    </div>

    <!-- Create Employee Inline Form -->
    <div v-if="showCreate" class="card p-6">
      <h3 class="text-lg font-bold text-coffee-800 mb-4">Thêm nhân viên</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-coffee-600 mb-1">Họ và tên</label>
          <input v-model="createForm.FullName" class="input-field" placeholder="Nhập họ tên" />
        </div>
        <div>
          <label class="block text-sm text-coffee-600 mb-1">Số điện thoại</label>
          <input
            v-model="createForm.PhoneNumber"
            class="input-field"
            placeholder="VD: 0912345678"
            inputmode="numeric"
            pattern="\\d{10}"
            maxlength="10"
            @input="onCreatePhoneInput"
          />
        </div>
        <div>
          <label class="block text-sm text-coffee-600 mb-1">Chức vụ</label>
          <select v-model="createForm.JobTitle" class="input-field">
            <option value="Pha chế">Pha chế</option>
            <option value="Thu ngân">Thu ngân</option>
            <option value="Quản lý">Quản lý</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-coffee-600 mb-1">Ca làm</label>
          <select v-model="createForm.WorkShift" class="input-field">
            <option value="SANG">Ca sáng</option>
            <option value="CHIEU">Ca chiều</option>
            <option value="TOI">Ca tối</option>
            <option value="FULL">Full time</option>
          </select>
        </div>
      </div>
      <div v-if="createError" class="text-red-600 text-sm mt-3">{{ createError }}</div>
      <div class="flex justify-end gap-3 mt-4">
        <button class="btn-secondary" @click="cancelCreate">Hủy</button>
        <button class="btn-primary" :disabled="submitting || !isValidCreate" @click="submitCreate">
          {{ submitting ? 'Đang lưu...' : 'Lưu' }}
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
        <!-- Bỏ avatar icon -->

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
          <button @click="viewEmployee(employee.EmployeeID)" class="btn-ghost flex-1 inline-flex items-center justify-center text-sm">
            <Eye class="w-4 h-4 mr-1" />
            Xem
          </button>
          <button @click="openEdit(employee)" class="btn-secondary flex-1 inline-flex items-center justify-center text-sm">
            <Edit class="w-4 h-4 mr-1" />
            Sửa
          </button>
          <button @click="confirmDelete(employee)" class="btn-danger inline-flex items-center justify-center text-sm">
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredEmployees.length === 0" class="text-center py-12">
      <UserCheck class="w-16 h-16 text-coffee-300 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-coffee-600 mb-2">Không có nhân viên nào</h3>
      <p class="text-coffee-500 mb-4">Hãy thêm nhân viên đầu tiên để bắt đầu</p>
      <button class="btn-primary inline-flex items-center" @click="createEmployee">
        <Plus class="w-4 h-4 mr-2" />
        Thêm nhân viên
      </button>
    </div>

    <!-- Edit Employee Modal-like Card -->
    <div v-if="showEdit" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl w-full max-w-2xl p-6">
        <h3 class="text-lg font-bold text-coffee-800 mb-4">Sửa nhân viên</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-coffee-600 mb-1">Họ và tên</label>
            <input v-model="editForm.FullName" class="input-field" />
          </div>
        <div>
            <label class="block text-sm text-coffee-600 mb-1">Số điện thoại</label>
          <input
            v-model="editForm.PhoneNumber"
            class="input-field"
            inputmode="numeric"
            pattern="\\d{10}"
            maxlength="10"
            @input="onEditPhoneInput"
          />
          </div>
          <div>
            <label class="block text-sm text-coffee-600 mb-1">Chức vụ</label>
            <select v-model="editForm.JobTitle" class="input-field">
              <option value="Pha chế">Pha chế</option>
              <option value="Thu ngân">Thu ngân</option>
              <option value="Quản lý">Quản lý</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-coffee-600 mb-1">Ca làm</label>
            <select v-model="editForm.WorkShift" class="input-field">
              <option value="SANG">Ca sáng</option>
              <option value="CHIEU">Ca chiều</option>
              <option value="TOI">Ca tối</option>
              <option value="FULL">Full time</option>
            </select>
          </div>
        </div>
        <div v-if="editError" class="text-red-600 text-sm mt-3">{{ editError }}</div>
        <div class="flex justify-end gap-3 mt-4">
          <button class="btn-secondary" @click="cancelEdit">Hủy</button>
          <button class="btn-primary" :disabled="editSubmitting" @click="submitEdit">{{ editSubmitting ? 'Đang lưu...' : 'Lưu' }}</button>
        </div>
      </div>
    </div>

    <!-- Delete confirm -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl w-full max-w-md p-6">
        <h3 class="text-lg font-bold text-coffee-800 mb-2">Xác nhận xóa</h3>
        <p class="text-coffee-700">Bạn có chắc muốn xóa nhân viên <span class="font-semibold">{{ showDeleteConfirm?.FullName }}</span>?</p>
        <div class="flex justify-end gap-3 mt-6">
          <button class="btn-secondary" :disabled="deleting" @click="closeDelete">Hủy</button>
          <button class="btn-danger" :disabled="deleting" @click="doDelete">{{ deleting ? 'Đang xóa...' : 'Xóa' }}</button>
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
  Users,
  Coffee,
  CreditCard,
  UserCheck,
  Eye,
  Edit,
  Trash2
} from 'lucide-vue-next'
import type { Employee } from '../types'
import { employeeService } from '../services/employees'

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

// Create employee state
const showCreate = ref(false)
const submitting = ref(false)
const createError = ref('')
const createForm = ref({
  FullName: '',
  PhoneNumber: '',
  JobTitle: '',
  WorkShift: 'SANG',
})

const isValidCreate = computed(() => {
  return (
    createForm.value.FullName.trim().length > 0 &&
    createForm.value.PhoneNumber.trim().length > 0 &&
    createForm.value.JobTitle.trim().length > 0 &&
    ['SANG','CHIEU','TOI','FULL'].includes(createForm.value.WorkShift)
  )
})

const searchQuery = ref('')

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

const isLoading = ref(false)
async function fetchEmployees() {
  try {
    isLoading.value = true
    const params: any = {
      work_shift: selectedShift.value !== 'Tất cả' ? selectedShift.value : undefined,
      search: searchQuery.value || undefined,
      page: 1,
      page_size: 20,
    }
    const res: any = await employeeService.getAll(params)
    employees.value = Array.isArray(res) ? res : (res.results || [])
  } catch (err: any) {
    toast.error('Không tải được danh sách nhân viên')
    // eslint-disable-next-line no-console
    console.error('Employees fetch error:', err?.response?.data || err)
  } finally {
    isLoading.value = false
  }
}

// simple debounced search
let searchTimer: number | undefined
function onSearchInput() {
  if (searchTimer) window.clearTimeout(searchTimer)
  // @ts-ignore
  searchTimer = window.setTimeout(() => fetchEmployees(), 400)
}

function onCreatePhoneInput(e: Event) {
  const target = e.target as HTMLInputElement
  target.value = target.value.replace(/\D/g, '').slice(0, 10)
  createForm.value.PhoneNumber = target.value
}

function onEditPhoneInput(e: Event) {
  const target = e.target as HTMLInputElement
  target.value = target.value.replace(/\D/g, '').slice(0, 10)
  editForm.value.PhoneNumber = target.value
}

function createEmployee() {
  showCreate.value = true
}

const viewEmployee = (id: number) => {
  toast.info('Tính năng xem chi tiết nhân viên đang được phát triển')
}

// Edit state
const showEdit = ref(false)
const editError = ref('')
const editSubmitting = ref(false)
const editForm = ref({
  EmployeeID: 0,
  FullName: '',
  PhoneNumber: '',
  JobTitle: '',
  WorkShift: 'SANG',
})

function openEdit(emp: Employee) {
  showEdit.value = true
  editError.value = ''
  editForm.value = {
    EmployeeID: emp.EmployeeID,
    FullName: emp.FullName,
    PhoneNumber: emp.PhoneNumber,
    JobTitle: emp.JobTitle,
    WorkShift: emp.WorkShift as any,
  }
}

function cancelEdit() {
  showEdit.value = false
  editError.value = ''
}

async function submitEdit() {
  try {
    editSubmitting.value = true
    editError.value = ''
    if (!/^\d{10}$/.test(editForm.value.PhoneNumber.trim())) {
      editError.value = 'Số điện thoại phải gồm đúng 10 chữ số'
      editSubmitting.value = false
      return
    }
    await employeeService.update(editForm.value.EmployeeID, {
      FullName: editForm.value.FullName.trim(),
      JobTitle: editForm.value.JobTitle.trim(),
      WorkShift: editForm.value.WorkShift as any,
      // Không gửi PhoneNumber nếu BE chặn đổi sang số đã tồn tại ở nhân viên khác; chỉ gửi khi không đổi
      PhoneNumber: editForm.value.PhoneNumber.trim(),
    })
    await fetchEmployees()
    showEdit.value = false
  } catch (err: any) {
    editError.value = err?.response?.data?.message || err?.response?.data?.detail || 'Không thể cập nhật nhân viên'
    // eslint-disable-next-line no-console
    console.error('Update employee error:', err?.response?.data || err)
  } finally {
    editSubmitting.value = false
  }
}

// Delete
const showDeleteConfirm = ref<null | Employee>(null)
const deleting = ref(false)
function confirmDelete(emp: Employee) {
  showDeleteConfirm.value = emp
}

async function doDelete() {
  if (!showDeleteConfirm.value) return
  try {
    deleting.value = true
    const id = showDeleteConfirm.value.EmployeeID
    // đóng modal trước để đảm bảo UI được cập nhật ngay cả khi request/network có vấn đề
    closeDelete()
    // Optimistic update: loại bỏ ngay trên UI
    const prev = employees.value.slice()
    employees.value = employees.value.filter(emp => emp.EmployeeID !== id)
    await employeeService.delete(id)
    await fetchEmployees().catch(() => {})
  } catch (err: any) {
    toast.error(err?.response?.data?.message || err?.response?.data?.detail || 'Không thể xóa nhân viên')
    // eslint-disable-next-line no-console
    console.error('Delete employee error:', err?.response?.data || err)
    // Nếu lỗi, làm mới danh sách để khôi phục trạng thái chính xác
    await fetchEmployees().catch(() => {})
  } finally {
    // đảm bảo modal đóng trong mọi trường hợp sau khi xử lý xong
    closeDelete()
    deleting.value = false
  }
}

function closeDelete() {
  showDeleteConfirm.value = null
}

onMounted(() => {
  fetchEmployees()
})

function cancelCreate() {
  showCreate.value = false
  createError.value = ''
}

async function submitCreate() {
  if (!isValidCreate.value) return
  try {
    submitting.value = true
    createError.value = ''
    if (!/^\d{10}$/.test(createForm.value.PhoneNumber.trim())) {
      createError.value = 'Số điện thoại phải gồm đúng 10 chữ số'
      submitting.value = false
      return
    }
    await employeeService.create({
      FullName: createForm.value.FullName.trim(),
      PhoneNumber: createForm.value.PhoneNumber.trim(),
      JobTitle: createForm.value.JobTitle.trim(),
      WorkShift: createForm.value.WorkShift as any,
    })
    await fetchEmployees()
    showCreate.value = false
    createForm.value = { FullName: '', PhoneNumber: '', JobTitle: '', WorkShift: 'SANG' }
  } catch (err: any) {
    createError.value = err?.response?.data?.message || err?.response?.data?.detail || 'Không thể tạo nhân viên'
    // eslint-disable-next-line no-console
    console.error('Create employee error:', err?.response?.data || err)
  } finally {
    submitting.value = false
  }
}
</script>
