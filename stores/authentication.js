import { defineStore } from 'pinia';

export const useStore = defineStore('authentication', {
  state: () => ({
    profile: null,
    access_token: "",
  }),
  actions: {
    setProfile(profile) {
      this.profile = profile;
    },
    updateLocalStorage(payload) {
      Object.entries(payload).forEach(([key, val]) => {
        if (val === null || val === false) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(val));
        }
      });
    },
    async login(payload) {
      const { grant_token } = await $fetch("/rcms-api/1/login", {
          method: "POST",
          baseURL: useRuntimeConfig().public.apiBase,
          credentials: "include",
          body: payload,
      });
      const { access_token } = await $fetch("/rcms-api/1/token", {
          method: "POST",
          baseURL: useRuntimeConfig().public.apiBase,
          credentials: "include",
          body: { grant_token: grant_token },
      });
      
      this.updateLocalStorage({ rcmsApiAccessToken: access_token.value })
      this.access_token = access_token.value
      
      const { authFetch } = useAuthFetch(this.access_token);
      const profileRes = await authFetch("/rcms-api/1/profile", {
        baseURL: useRuntimeConfig().public.apiBase,
      });
      this.setProfile(profileRes);
    },
    async logout() {
      try {
        const { authFetch } = useAuthFetch();
        await authFetch("/rcms-api/1/logout", {
          method: "POST",
          baseURL: useRuntimeConfig().public.apiBase,
          credentials: "include",
        });
      } catch {
        /** No Process */
        /** When it returns errors, it consider that logout is complete and ignore this process. */
      }
      this.setProfile(null);
      this.access_token = "";
      this.updateLocalStorage({ rcmsApiAccessToken: null });

      navigateTo("/login");
    },
    async restoreLoginState() {
      const rcmsApiAccessToken = JSON.parse(localStorage.getItem('rcmsApiAccessToken'))

      if (!rcmsApiAccessToken) {
        throw new Error("need to login");
      }
      this.setProfile({}) // store dummy object.
    },
  },
  getters: {
    authenticated: (state) => state.profile !== null,
    token: (state) => state.access_token,
  },
});
