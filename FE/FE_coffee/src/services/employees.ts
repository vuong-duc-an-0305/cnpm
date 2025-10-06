import { apiService } from './api'
import type { Employee, EmployeeForm, FilterOptions } from '@/types'

export const employeeService = {
  // Get all employees
  getAll: (filters?: FilterOptions): Promise<Employee[]> => {
    return apiService.get('/employees/', filters)
  },

  // Get employee by ID
  getById: (id: number): Promise<Employee> => {
    return apiService.get(`/employees/${id}/`)
  },

  // Create new employee
  create: (data: EmployeeForm): Promise<Employee> => {
    return apiService.post('/employees/', data)
  },

  // Update employee
  update: (id: number, data: Partial<EmployeeForm>): Promise<Employee> => {
    return apiService.put(`/employees/${id}/`, data)
  },

  // Delete employee
  delete: (id: number): Promise<void> => {
    return apiService.delete(`/employees/${id}/`)
  },

  // Get employees by shift
  getByShift: (shift: string): Promise<Employee[]> => {
    return apiService.get('/employees/by-shift/', { shift })
  },

  // Get employee performance
  getPerformance: (id: number): Promise<{
    employee_id: number;
    employee_name: string;
    total_orders: number;
    total_revenue: string;
    average_order_value: string;
    total_imports: number;
    total_import_value: string;
  }> => {
    return apiService.get(`/employees/${id}/performance/`)
  },

  // Search employees
  search: (query: string): Promise<Employee[]> => {
    return apiService.get('/employees/', { search: query })
  },

  // Get employees by job title
  getByJobTitle: (jobTitle: string): Promise<Employee[]> => {
    return apiService.get('/employees/', { job_title: jobTitle })
  },
}
