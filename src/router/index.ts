import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import DepartmentPage from '@/pages/DepartmentPage.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/department/:id',
      name: 'department',
      component: DepartmentPage,
      props: true,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
export default router;