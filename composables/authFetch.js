export const useAuthFetch = (accessToken = null) => {
  // If no token provided, try to get it from store
  let token = accessToken;
  if (!token) {
    const store = useStore();
    token = store.access_token;
  }

  const authFetch = (url, config = {}) => {
    return $fetch(url, {
      ...config,
      headers: {
        ...(config.headers || {}),
        "X-RCMS-API-ACCESS-TOKEN": token,
      },
    });
  };

  return { authFetch };
};
