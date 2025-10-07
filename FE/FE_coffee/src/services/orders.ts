import { apiService } from './api'
import type { Order, OrderForm, OrderDetail, PaginatedResponse, FilterOptions, RevenueStats, BestSellingProduct } from '@/types'

export const orderService = {
  // Get all orders with filters
  getAll: (filters?: FilterOptions): Promise<Order[]> => {
    return apiService.get('/orders/', filters)
  },

  // Get order by ID
  getById: (id: number): Promise<Order> => {
    return apiService.get(`/orders/${id}/`)
  },

  // Create new order
  create: (data: OrderForm): Promise<Order> => {
    return apiService.post('/orders/', data)
  },

  // Update order
  update: (id: number, data: Partial<OrderForm>): Promise<Order> => {
    return apiService.put(`/orders/${id}/`, data)
  },

  // Delete order
  delete: (id: number): Promise<void> => {
    return apiService.delete(`/orders/${id}/`)
  },

  // Update order status
  updateStatus: (id: number, status: string, note?: string): Promise<Order> => {
    // BE sử dụng update_status (gạch dưới). Fallback về update-status nếu cần.
    return apiService
      .patch(`/orders/${id}/update_status/`, { Status: status, note })
      .catch(async (err) => {
        if (err?.response?.status === 404) {
          // Thử biến thể gạch nối
          return apiService.patch(`/orders/${id}/update-status/`, { Status: status, note })
        }
        throw err
      })
  },

  // Get orders by customer
  getByCustomer: (customerId: number): Promise<Order[]> => {
    return apiService.get('/orders/by-customer/', { customer_id: customerId })
  },

  // Get orders by status
  getByStatus: (status: string): Promise<Order[]> => {
    return apiService.get('/orders/by-status/', { status })
  },

  // Get revenue statistics
  getRevenueStats: (fromDate?: string, toDate?: string): Promise<RevenueStats> => {
    // Prefer snake_case per BE docs, fallback kebab-case
    return apiService
      .get('/orders/revenue_stats/', { from_date: fromDate, to_date: toDate })
      .catch(async (err) => {
        if (err?.response?.status === 404) {
          return apiService.get('/orders/revenue-stats/', { from_date: fromDate, to_date: toDate })
        }
        throw err
      })
  },

  // Get best selling products
  getBestSelling: (fromDate?: string, toDate?: string, limit?: number): Promise<{
    best_selling_products: BestSellingProduct[];
  }> => {
    return apiService
      .get('/orders/best_selling/', { from_date: fromDate, to_date: toDate, limit: limit || 10 })
      .catch(async (err) => {
        if (err?.response?.status === 404) {
          return apiService.get('/orders/best-selling/', { from_date: fromDate, to_date: toDate, limit: limit || 10 })
        }
        throw err
      })
  },

  // Get order details
  getOrderDetails: (orderId?: number, productId?: number): Promise<OrderDetail[]> => {
    const params: any = {}
    if (orderId) params.order_id = orderId
    if (productId) params.product_id = productId
    return apiService.get('/order-details/', params)
  },

  // Search orders
  search: (query: string): Promise<Order[]> => {
    return apiService.get('/orders/', { search: query })
  },

  // Revenue trend over time
  getRevenueTrend: (fromDate?: string, toDate?: string, interval?: 'day'|'week'|'month'): Promise<{
    labels: string[];
    datasets: Array<{ label: string; data: number[] }>;
    interval: string;
  }> => {
    return apiService.get('/orders/revenue_trend/', { from_date: fromDate, to_date: toDate, interval: interval || 'day' })
      .catch(async (err) => {
        if (err?.response?.status === 404) {
          return apiService.get('/orders/revenue-trend/', { from_date: fromDate, to_date: toDate, interval: interval || 'day' })
        }
        throw err
      })
  },

  // Revenue by category
  getRevenueByCategory: (fromDate?: string, toDate?: string): Promise<{
    labels: string[];
    datasets: Array<{ label: string; data: number[] }>;
  }> => {
    return apiService.get('/orders/revenue_by_category/', { from_date: fromDate, to_date: toDate })
      .catch(async (err) => {
        if (err?.response?.status === 404) {
          return apiService.get('/orders/revenue-by-category/', { from_date: fromDate, to_date: toDate })
        }
        throw err
      })
  },
}
