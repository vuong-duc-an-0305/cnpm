import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useToast } from 'vue-toastification'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
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
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    const toast = useToast()
    
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          toast.error('Phiên đăng nhập đã hết hạn')
          // Redirect to login
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
          // Validation errors
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
      toast.error('Không thể kết nối đến máy chủ')
    } else {
      toast.error('Có lỗi xảy ra')
    }
    
    return Promise.reject(error)
  }
)

// Generic API methods
export const apiService = {
  // GET request
  get: <T = any>(url: string, params?: any): Promise<T> => {
    return api.get(url, { params }).then(response => response.data)
  },

  // POST request
  post: <T = any>(url: string, data?: any): Promise<T> => {
    return api.post(url, data).then(response => response.data)
  },

  // PUT request
  put: <T = any>(url: string, data?: any): Promise<T> => {
    return api.put(url, data).then(response => response.data)
  },

  // PATCH request
  patch: <T = any>(url: string, data?: any): Promise<T> => {
    return api.patch(url, data).then(response => response.data)
  },

  // DELETE request
  delete: <T = any>(url: string): Promise<T> => {
    return api.delete(url).then(response => response.data)
  },

  // Upload file
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
