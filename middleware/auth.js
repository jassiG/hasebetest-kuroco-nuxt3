import { useStore } from '~/stores/authentication';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useStore();
  
  // Define public paths that don't require authentication (add any login pages that don't require authentication)
  const publicPaths = ['/login'];
  
  // Allow access if the current path is public
  if (publicPaths.some(path => to.path.startsWith(path))) {
    return;
  }
  
  if (!store.access_token) {
    try {
      await store.restoreLoginState();
    } catch (err) {
      return navigateTo('/login');
    }
  }
});
