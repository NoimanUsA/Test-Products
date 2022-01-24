import { createRouter, createWebHashHistory } from 'vue-router';

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
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  document.title = to.meta.title || 'NO-TITLE';
});
export default router;
