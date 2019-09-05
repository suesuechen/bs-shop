import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login.vue'
Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: { requiresAuth: false },
		},
		{
			path: '/',
			name: 'Layout',
			redirect: '/shop',
			component: () => import('@/views/Layout.vue'),
			children: [
				{
					path: '/shop',
					name: 'ProductsCard',
					component: () => import('@/views/ProductsCard.vue'),
					
				},
				{
					path: '/productDetail/:prdId',
					name: 'ProductDetail',
					component: () => import('@/views/ProductDetail.vue'),
					
				},
				{
					path: '/cart',
					name: 'Cart',
					component: () => import('@/views/Cart.vue'),
					
				},
			]
		},
		{
			path: '/admin',
			name: 'Dashboard',
			component: () => import('@/components/Dashboard.vue'),
			children: [
				{
					path: 'products',
					name: 'Products',
					component: () => import('@/components/pages/Products.vue'),
					meta: { requiresAuth: true }
				},
				{
					path: 'orders',
					name: 'Orders',
					component: () => import('@/components/pages/Orders.vue'),
					// meta: { requiresAuth: true }
				},
				{
					path: 'coupons',
					name: 'Coupons',
					component: () => import('@/components/pages/Coupons.vue'),
					meta: { requiresAuth: true }
				},
				{
					path: '/customer_order',
					name: 'CustomerOrder',
					component: () => import('@/components/pages/CustomerOrders.vue'),
					meta: { requiresAuth: true }
					
				},
				{
					path: '/customer_checkout/:orderId',
					name: 'CustomerCheckout',
					component: () => import('@/components/pages/CustomerCheckout.vue'),
				},
			]
		},
		{
			path: '*',
			redirect: '/',
		},
	]
})
