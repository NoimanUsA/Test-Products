import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/products' },
  {
    path: '/products',
    name: 'Products',
    meta: {
      title: 'Комплекты стеллажных систем',
    },
    component: () => import('@/view/Products.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
