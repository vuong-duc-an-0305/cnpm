<template>
  <div class="min-h-screen">
    <!-- Sidebar -->
    <AppSidebar
      :is-open="sidebarOpen"
      :user="currentUser"
      @close="closeSidebar"
      @profile="handleProfile"
      @settings="handleSettings"
      @logout="handleLogout"
    />

    <!-- Main Content -->
    <div :class="[
      'transition-all duration-300 ease-in-out',
      sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
    ]">
      <!-- Header -->
      <AppHeader
        :user="currentUser"
        @toggle-sidebar="toggleSidebar"
        @search="handleSearch"
        @quick-order="handleQuickOrder"
        @profile="handleProfile"
        @settings="handleSettings"
        @logout="handleLogout"
      />

      <!-- Main Content Area -->
      <main class="p-6">
        <router-view v-slot="{ Component, route }">
          <transition
            name="page"
            mode="out-in"
            appear
          >
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </main>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-6 flex flex-col items-center gap-4">
        <div class="spinner"></div>
        <p class="text-coffee-600 font-medium">{{ loadingMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import type { User } from '@/types'

const router = useRouter()
const toast = useToast()

// State
const sidebarOpen = ref(true)
const isLoading = ref(false)
const loadingMessage = ref('Đang tải...')

// Mock user data - In real app, this would come from auth store
const currentUser = computed<User>(() => ({
  id: 1,
  username: 'admin',
  email: 'admin@coffeeshop.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  isActive: true
}))

// Methods
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const handleSearch = (query: string) => {
  console.log('Search:', query)
  // Implement global search functionality
}

const handleQuickOrder = () => {
  router.push('/orders/new')
}

const handleProfile = () => {
  toast.info('Tính năng thông tin cá nhân đang được phát triển')
  // router.push('/profile')
}

const handleSettings = () => {
  toast.info('Tính năng cài đặt đang được phát triển')
  // router.push('/settings')
}

const handleLogout = async () => {
  try {
    isLoading.value = true
    loadingMessage.value = 'Đang đăng xuất...'
    
    // Simulate logout process
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Clear auth data
    localStorage.removeItem('auth_token')
    
    toast.success('Đăng xuất thành công')
    router.push('/login')
  } catch (error) {
    toast.error('Có lỗi xảy ra khi đăng xuất')
  } finally {
    isLoading.value = false
  }
}

// Initialize app
onMounted(() => {
  // Check if user is authenticated
  const token = localStorage.getItem('auth_token')
  if (!token) {
    // Redirect to login if no token
    router.push('/login')
  }
})
</script>

<style scoped>
/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Responsive sidebar behavior */
@media (max-width: 1024px) {
  .sidebar-closed {
    transform: translateX(-100%);
  }
}
</style>
