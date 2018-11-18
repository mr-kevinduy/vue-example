import Vue from 'vue';
import Router from 'vue-router';
import { getCurrentUser } from '@/services/auth.service';
import BackendLayout from './layouts/BackendLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';
import MainLayout from './layouts/MainLayout.vue';
import ShopLayout from './layouts/ShopLayout.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: AuthLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '/login', name: 'login', component: () => import('./views/auth/Login.vue') },
        { path: '/register', name: 'register', component: () => import('./views/auth/Register.vue') },
        { path: 'password/reset', component: () => import('./views/auth/passwords/Reset.vue') },
        { path: 'password/reset/{token}', component: () => import('./views/auth/passwords/Reset.vue') },
        { path: 'password/email', component: () => import('./views/auth/passwords/Email.vue') },
        { path: 'email/verify', component: () => import('./views/auth/Verify.vue') },
        { path: 'email/verify/{id}', component: () => import('./views/auth/Verify.vue') },
        { path: 'email/resend', component: () => import('./views/auth/Verify.vue') },
      ],
    },
    {
      path: '/admin',
      component: BackendLayout,
      children: [
        { path: '', name: 'admin', component: () => import('./views/backend/Dashboard.vue') },
        { path: '/dashboard', name: 'dashboard', component: () => import('./views/backend/Dashboard.vue') },
      ],
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'home', component: () => import('./views/frontend/Home.vue') },
        { path: '/about', name: 'about', component: () => import('./views/frontend/About.vue') },
      ],
    },
    {
      path: '/shop',
      component: ShopLayout,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      children: [
        { path: '', name: 'shop', component: () => import('./views/frontend/shop/Index.vue') },
        { path: '/product', name: 'product', component: () => import('./views/frontend/shop/product/Index.vue') },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = getCurrentUser('user_info');
  const guard = to.matched.some(record => record.meta.requiresAuth);

  if (guard && !currentUser) {
    next('login');
  } else if (guard && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
