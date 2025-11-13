import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useToast } from 'vue-toastification'

// ✅ FIX: Lấy API URL từ environment variable
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://16.171.13.43:8000/api'

console.log('🔗 API Base URL:', baseURL)

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: baseURL,  // ✅ Sửa từ '/api'
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('📤 Making API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      params: config.params
    })
    
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers = config.headers || {}
      ;(config.headers as any).Authorization = `Bearer ${token}`
    }
    
    // Add timestamp to prevent caching
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      }
    }
    
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('✅ API Response Success:', {
      method: response.config.method?.toUpperCase(),
      url: response.config.url,
      status: response.status,
      data: response.data
    })
    return response
  },
  (error) => {
    const toast = useToast()
    
    console.error('❌ API Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      baseURL: baseURL
    })
    
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          toast.error('Phiên đăng nhập đã hết hạn')
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
          break
        case 403:
          toast.error('Bạn không có quyền truy cập')
          break
        case 404:
          toast.error('Không tìm thấy dữ liệu')
          break
        case 422:
          if (data.errors) {
            Object.values(data.errors).forEach((error: any) => {
              toast.error(Array.isArray(error) ? error[0] : error)
            })
          } else {
            toast.error('Dữ liệu không hợp lệ')
          }
          break
        case 500:
          toast.error('Lỗi máy chủ. Vui lòng thử lại sau')
          break
        default:
          toast.error(data.message || 'Có lỗi xảy ra')
      }
    } else if (error.request) {
      console.error('❌ No Response:', error.request)
      toast.error(`Không thể kết nối đến: ${baseURL}`)
    } else {
      console.error('❌ Error:', error.message)
      toast.error('Có lỗi xảy ra: ' + error.message)
    }
    
    return Promise.reject(error)
  }
)

// Generic API methods
export const apiService = {
  get: <T = any>(url: string, params?: any): Promise<T> => {
    return api.get(url, { params }).then(response => response.data)
  },

  post: <T = any>(url: string, data?: any): Promise<T> => {
    return api.post(url, data).then(response => response.data)
  },

  put: <T = any>(url: string, data?: any): Promise<T> => {
    return api.put(url, data).then(response => response.data)
  },

  patch: <T = any>(url: string, data?: any): Promise<T> => {
    return api.patch(url, data).then(response => response.data)
  },

  delete: <T = any>(url: string): Promise<T> => {
    return api.delete(url).then(response => response.data)
  },

  download: (url: string, params?: any): Promise<Blob> => {
    return api.get(url, { params, responseType: 'blob' }).then(res => res.data as Blob)
  },

  upload: <T = any>(url: string, formData: FormData): Promise<T> => {
    return api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => response.data)
  },
}

// Authentication methods
export const authService = {
  login: (credentials: { username: string; password: string }) => {
    return apiService.post('/auth/login', credentials)
  },

  logout: () => {
    localStorage.removeItem('auth_token')
    return Promise.resolve()
  },

  getProfile: () => {
    return apiService.get('/auth/profile')
  },

  refreshToken: () => {
    return apiService.post('/auth/refresh')
  },
}

export default api
