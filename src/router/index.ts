import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import DepartmentPage from '@/pages/DepartmentPage.vue';
import PropertyDetails from '@/pages/PropertyDetails.vue';
import AssetsPage from '@/pages/AssetsPage.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/assets',
      name: 'assets',
      component: AssetsPage,
    },
    {
      path: '/department/:id',
      name: 'department',
      component: DepartmentPage,
      props: true,
    },
    {
      path: '/department/:id/property/:propertyId',
      name: 'property-details',
      component: PropertyDetails,
      props: true,
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
export default router;