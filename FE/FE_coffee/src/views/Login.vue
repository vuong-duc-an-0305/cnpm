<template>
  <div class="min-h-screen bg-gradient-to-br from-coffee-50 to-coffee-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-coffee-500 to-coffee-600 rounded-2xl mb-4">
          <Coffee class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-coffee-800 mb-2">Coffee Shop</h1>
        <p class="text-coffee-600">Hệ thống quản lý quán cà phê</p>
      </div>

      <!-- Login Form -->
      <div class="card p-8">
        <h2 class="text-2xl font-bold text-coffee-800 mb-6 text-center">Đăng nhập</h2>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <BaseInput
            v-model="form.username"
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            :error="errors.username"
            required
            left-icon="User"
          />
          
          <BaseInput
            v-model="form.password"
            type="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            :error="errors.password"
            required
            left-icon="Lock"
          />
          
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="form.rememberMe"
                type="checkbox"
                class="rounded border-coffee-300 text-coffee-600 focus:ring-coffee-500"
              />
              <span class="ml-2 text-sm text-coffee-600">Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" class="text-sm text-coffee-600 hover:text-coffee-800 transition-colors">
              Quên mật khẩu?
            </a>
          </div>
          
          <BaseButton
            type="submit"
            :loading="isLoading"
            loading-text="Đang đăng nhập..."
            full-width
            size="lg"
          >
            Đăng nhập
          </BaseButton>
        </form>
        
        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-coffee-50 rounded-xl">
          <h3 class="text-sm font-semibold text-coffee-700 mb-2">Tài khoản hệ thống:</h3>
          <div class="space-y-1 text-xs text-coffee-600">
            <p><strong>Admin:</strong> admin / admin123 (Full quyền)</p>
            <p><strong>Thu ngân:</strong> cashier / cashier123 (Chỉ quản lý đơn hàng)</p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="text-center mt-8">
        <p class="text-sm text-coffee-500">
          © 2024 Coffee Shop Management System. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Coffee, User, Lock } from 'lucide-vue-next'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { authService } from '@/services/api'

const router = useRouter()
const toast = useToast()

const isLoading = ref(false)
const errors = ref<Record<string, string>>({})

const form = reactive({
  username: '',
  password: '',
  rememberMe: false
})

const handleLogin = async () => {
  // Clear previous errors
  errors.value = {}
  
  // Basic validation
  if (!form.username) {
    errors.value.username = 'Vui lòng nhập tên đăng nhập'
    return
  }
  
  if (!form.password) {
    errors.value.password = 'Vui lòng nhập mật khẩu'
    return
  }
  
  try {
    isLoading.value = true
    
    // For demo purposes, we'll simulate login
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Authentication logic với 2 tài khoản cố định
    const validCredentials = {
      'admin': 'admin123',
      'cashier': 'cashier123'
    }
    
    if (validCredentials[form.username as keyof typeof validCredentials] === form.password) {
      // Store auth token và role
      localStorage.setItem('auth_token', 'demo-token-' + Date.now())
      localStorage.setItem('user_role', form.username)
      localStorage.setItem('user_name', form.username === 'admin' ? 'Administrator' : 'Thu ngân')
      
      toast.success('Đăng nhập thành công!')
      
      // Redirect dựa trên role
      if (form.username === 'cashier') {
        // Cashier redirect trực tiếp đến orders
        router.push('/orders')
      } else {
        // Admin redirect đến dashboard
        router.push('/dashboard')
      }
    } else {
      toast.error('Tên đăng nhập hoặc mật khẩu không đúng')
    }
    
  } catch (error) {
    console.error('Login error:', error)
    toast.error('Có lỗi xảy ra khi đăng nhập')
  } finally {
    isLoading.value = false
  }
}

// In a real application, you would use the actual auth service:
/*
const handleLogin = async () => {
  try {
    isLoading.value = true
    errors.value = {}
    
    const response = await authService.login({
      username: form.username,
      password: form.password
    })
    
    localStorage.setItem('auth_token', response.token)
    toast.success('Đăng nhập thành công!')
    router.push('/dashboard')
    
  } catch (error: any) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      toast.error('Đăng nhập thất bại')
    }
  } finally {
    isLoading.value = false
  }
}
*/
</script>
