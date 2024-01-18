import HomeView from '@/views/HomeView.vue';
import type { RouteRecordRaw } from 'vue-router';

/** List of all routes the user can navigate to.
 *  Please declare, whether authentication is enabled/disabled via the meta parameter.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    /**
     * Global error page
     * In case the user is not allowed to access a certain page they will be redirected here.
     */
    path: '/error',
    name: 'Error',
    component: () => import('@/views/ErrorView.vue'),
    meta: { requiresAuth: false },
  },
  {
    /**
     * Logout page
     * When the user logged out while visiting a restricted page, they will be redirected here.
     */
    path: '/logged-out',
    name: 'loggedOut',
    component: () => import('@/views/LoggedOutView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => ({
      path: '/error',
      query: { reason: 'not-found', path: to.path },
    }),
  },
];
