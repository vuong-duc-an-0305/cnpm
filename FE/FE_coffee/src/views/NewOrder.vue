<template>
  <div class="space-y-6">
    <div class="card p-6">
      <h3 class="text-lg font-bold text-coffee-800 mb-4">Tạo đơn hàng mới</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block text-sm text-coffee-600 mb-1">Khách hàng (tùy chọn)</label>
          <input v-model="orderForm.CustomerID" type="number" class="input-field" placeholder="Nhập CustomerID" />
        </div>
        <div>
          <label class="block text-sm text-coffee-600 mb-1">Tên nhân viên</label>
          <input v-model="orderForm.EmployeeName" type="text" class="input-field" placeholder="Nhập tên nhân viên" />
        </div>
        <div>
          <label class="block text-sm text-coffee-600 mb-1">Mã nhân viên</label>
          <input v-model.number="orderForm.EmployeeID" type="number" min="1" class="input-field" placeholder="Nhập EmployeeID (tuỳ chọn)" />
        </div>
        <div>
          <label class="block text-sm text-coffee-600 mb-1">Phương thức thanh toán</label>
          <select v-model="orderForm.PaymentMethod" class="input-field">
            <option value="CASH">Tiền mặt</option>
            <option value="CARD">Thẻ</option>
            <option value="MOMO">MoMo</option>
            <option value="BANKING">Chuyển khoản</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card p-4">
          <h4 class="font-semibold text-coffee-800 mb-3">Chọn sản phẩm</h4>
          <div class="flex gap-2 mb-3">
            <input v-model="productSearch" class="input-field" placeholder="Tìm sản phẩm (tự động tải từ API)" @input="debouncedLoadProducts" />
            <button class="btn-secondary" @click="() => loadProducts()">Tải lại</button>
          </div>
          <div class="max-h-80 overflow-auto space-y-2">
            <div v-for="p in filteredProducts" :key="p.ProductID" class="flex items-center justify-between p-3 bg-coffee-50 rounded-xl">
              <div>
                <div class="font-semibold text-coffee-800">{{ p.ProductName }}</div>
                <div class="text-sm text-coffee-600">{{ formatCurrency(p.Price) }}</div>
              </div>
              <button class="btn-primary" @click="addItem(p)">Thêm</button>
            </div>
          </div>
        </div>

        <div class="card p-4">
          <h4 class="font-semibold text-coffee-800 mb-3">Giỏ hàng</h4>
          <div v-if="orderForm.items.length === 0" class="text-coffee-600">Chưa có sản phẩm</div>
          <div v-else class="space-y-3">
            <div v-for="(it, idx) in orderForm.items" :key="idx" class="p-3 bg-coffee-50 rounded-xl">
              <div class="flex items-center justify-between gap-2">
                <div class="font-semibold text-coffee-800">{{ it.ProductName }}</div>
                <div class="text-coffee-800 font-semibold">{{ formatCurrency(it.UnitPrice) }}</div>
              </div>
              <div class="mt-2 grid grid-cols-3 gap-2">
                <input type="number" min="1" class="input-field" v-model.number="it.Quantity" />
                <input class="input-field col-span-2" placeholder="Ghi chú" v-model="it.ToppingNote" />
              </div>
              <div class="flex justify-between items-center mt-2">
                <span class="text-sm text-coffee-600">Tạm tính</span>
                <span class="font-semibold">{{ formatCurrency(it.Quantity * it.UnitPrice) }}</span>
              </div>
              <div class="text-right mt-2">
                <button class="text-red-600" @click="removeItem(idx)">Xóa</button>
              </div>
            </div>
          </div>
          <div class="border-t border-coffee-200 mt-4 pt-4 space-y-2">
            <div class="flex justify-between"><span>Tổng</span><span class="font-semibold">{{ formatCurrency(totalAmount) }}</span></div>
            <div class="flex justify-between"><span>Giảm giá</span><input type="number" min="0" class="input-field w-32" v-model.number="orderForm.Discount" /></div>
            <div class="flex justify-between"><span>Thành tiền</span><span class="font-bold">{{ formatCurrency(finalAmount) }}</span></div>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-4">
        <button class="btn-secondary" @click="$router.push('/orders')">Hủy</button>
        <button class="btn-primary" :disabled="submitting || orderForm.items.length===0" @click="submitOrder">
          {{ submitting ? 'Đang tạo...' : 'Tạo đơn' }}
        </button>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productService } from '../services/products'
import { customerService } from '../services/customers'
import { orderService } from '../services/orders'
import { apiService } from '../services/api'

interface CartItem {
  ProductID: number
  ProductName: string
  UnitPrice: number
  Quantity: number
  ToppingNote?: string
}

const emit = defineEmits<{
  (e: 'created', order: any): void
}>()

const route = useRoute()
const router = useRouter()

const products = ref<Array<{ProductID:number; ProductName:string; Price:string}>>([])
const loadingProducts = ref(false)
const productSearch = ref('')

const orderForm = ref({
  CustomerID: undefined as number | undefined,
  EmployeeID: 1 as any,
  EmployeeName: '',
  PaymentMethod: 'CASH',
  Discount: 0,
  items: [] as CartItem[]
})

const filteredProducts = computed(() => {
  const q = productSearch.value.trim().toLowerCase()
  if (!q) return products.value
  return products.value.filter(p => p.ProductName.toLowerCase().includes(q))
})

const totalAmount = computed(() => orderForm.value.items.reduce((s, it) => s + it.UnitPrice * it.Quantity, 0))
const finalAmount = computed(() => Math.max(0, totalAmount.value - (orderForm.value.Discount || 0)))

function formatCurrency(value: string | number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value))
}

async function loadProducts(page = 1) {
  try {
    loadingProducts.value = true
    // API hỗ trợ phân trang và các tham số category_id, status, search
    const params: any = {
      status: 1,
      search: productSearch.value || undefined,
      page,
      page_size: 20,
    }
    // Trả về có thể là mảng hoặc object phân trang; chuẩn hoá về mảng dùng results nếu có
    const res: any = await productService.getAll(params)
    const items = Array.isArray(res) ? res : res.results || []
    products.value = items
  } finally {
    loadingProducts.value = false
  }
}

// Không liên kết API cho nhân viên: người dùng tự nhập EmployeeID

let debounceTimer: number | undefined
function debouncedLoadProducts() {
  if (debounceTimer) window.clearTimeout(debounceTimer)
  // @ts-ignore - window.setTimeout returns number in browser
  debounceTimer = window.setTimeout(() => loadProducts(), 400)
}

function addItem(p: {ProductID:number; ProductName:string; Price:string}) {
  orderForm.value.items.push({
    ProductID: p.ProductID,
    ProductName: p.ProductName,
    UnitPrice: Number(p.Price),
    Quantity: 1,
    ToppingNote: ''
  })
}

function removeItem(idx: number) { orderForm.value.items.splice(idx, 1) }

const submitting = ref(false)
async function submitOrder() {
  submitting.value = true
  try {
    // Nếu có CustomerID, kiểm tra tồn tại trước để tránh lỗi 500 phía BE
    if (orderForm.value.CustomerID) {
      try {
        await customerService.getById(Number(orderForm.value.CustomerID))
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error('Validate customer failed:', err?.response?.data || err)
        window.alert('Khách hàng không tồn tại. Vui lòng kiểm tra CustomerID hoặc để trống.')
        submitting.value = false
        return
      }
    }

    const payload = {
      CustomerID: orderForm.value.CustomerID,
      EmployeeID: Number(orderForm.value.EmployeeID) || undefined,
      employee_name: orderForm.value.EmployeeName || undefined,
      PaymentMethod: orderForm.value.PaymentMethod,
      Status: 'PREPARING',
      Discount: Number(orderForm.value.Discount || 0),
      items: orderForm.value.items.map(it => ({
        ProductID: it.ProductID,
        Quantity: it.Quantity,
        ToppingNote: it.ToppingNote || ''
      }))
    }
    // Log rõ dữ liệu gửi BE để đối soát
    // eslint-disable-next-line no-console
    console.log('Create order payload:', payload)
    const created: any = await apiService.post('/orders/', payload)
    // Nếu BE trả về OrderID, cập nhật trạng thái ngay sang PREPARING
    if (created?.OrderID) {
      try {
        await orderService.updateStatus(created.OrderID, 'PREPARING')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Update status to PREPARING failed:', err)
      }
    }
    window.alert('Tạo đơn thành công')
    emit('created', created)
    orderForm.value.items = []
    // Nếu đang ở trang /new-order độc lập, điều hướng về danh sách để thấy bản ghi mới
    if (route.name === 'new-order') {
      router.push('/orders')
    }
  } catch (e:any) {
    // Log chi tiết lỗi ra console để debug
    // e.response?.data có thể bao gồm message, errors (field-level), detail
    // eslint-disable-next-line no-console
    console.error('Create order error:', e)
    // eslint-disable-next-line no-console
    console.error('API response data:', e?.response?.data)
    const msg = e?.response?.data?.message || e?.message || 'Vui lòng kiểm tra lại'
    window.alert('Lỗi tạo đơn: ' + msg)
  } finally { submitting.value = false }
}

onMounted(() => { loadProducts() })
</script>
