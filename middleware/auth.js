import { useStore } from '~/stores/authentication';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useStore();
  
  // Define public paths that don't require authentication (add any login pages that don't require authentication)
  const publicPaths = ['/login'];
  
  // Allow access if the current path is public
  if (publicPaths.some(path => to.path.startsWith(path))) {
    return;
  }
  
  if (!store.authenticated) {
    try {
      await store.restoreLoginState();
    } catch (err) {
      return navigateTo('/login');
    }
  }
});

export const authFetch = (url, config) => {
  const store = useStore();

  return $fetch(url, {
    ...config,
    headers: {
      ...(config.headers || {}), // Preserve existing headers
      'X-RCMS-API-ACCESS-TOKEN': store.token, // Add the token
    },
  });
};
