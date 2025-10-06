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
    return apiService.get('/orders/revenue-stats/', { from_date: fromDate, to_date: toDate })
  },

  // Get best selling products
  getBestSelling: (fromDate?: string, toDate?: string, limit?: number): Promise<{
    best_selling_products: BestSellingProduct[];
  }> => {
    return apiService.get('/orders/best-selling/', { 
      from_date: fromDate, 
      to_date: toDate, 
      limit: limit || 10 
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
}
