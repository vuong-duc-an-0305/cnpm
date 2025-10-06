import { createRouter, createWebHistory } from 'vue-router'

// Lazy-load views
const Login = () => import('../views/Login.vue')
const Dashboard = () => import('../views/Dashboard.vue')
const Orders = () => import('../views/Orders.vue')
const OrderDetail = () => import('../views/OrderDetail.vue')
const NewOrder = () => import('../views/NewOrder.vue')
const Products = () => import('../views/Products.vue')
const ProductDetail = () => import('../views/ProductDetail.vue')
const Customers = () => import('../views/Customers.vue')
const CustomerDetail = () => import('../views/CustomerDetail.vue')
const Employees = () => import('../views/Employees.vue')
const Inventory = () => import('../views/Inventory.vue')
const Reports = () => import('../views/Reports.vue')
const About = () => import('../views/AboutView.vue')
const NotFound = () => import('../views/NotFound.vue')

// Layout
const AppLayout = () => import('../components/layout/AppLayout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guestOnly: true },
    },
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        { path: 'dashboard', name: 'dashboard', component: Dashboard },
        { path: 'orders', name: 'orders', component: Orders },
        { path: 'orders/:id', name: 'order-detail', component: OrderDetail, props: true },
        { path: 'new-order', name: 'new-order', component: NewOrder },
        { path: 'products', name: 'products', component: Products },
        { path: 'products/:id', name: 'product-detail', component: ProductDetail, props: true },
        { path: 'customers', name: 'customers', component: Customers },
        { path: 'customers/:id', name: 'customer-detail', component: CustomerDetail, props: true },
        { path: 'employees', name: 'employees', component: Employees },
        { path: 'inventory', name: 'inventory', component: Inventory },
        { path: 'reports', name: 'reports', component: Reports },
        { path: 'about', name: 'about', component: About },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

// Navigation guards
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('auth_token')

  if (to.meta?.requiresAuth && !token) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  if (to.meta?.guestOnly && token) {
    return next({ name: 'dashboard' })
  }

  return next()
})

export default router
