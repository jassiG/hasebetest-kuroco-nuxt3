import { defineStore } from 'pinia';

export const useStore = defineStore('authentication', {
  state: () => ({
    profile: null,
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
      await $fetch("/rcms-api/1/login", {
        method: "POST",
        body: JSON.stringify(payload),
        baseURL: useRuntimeConfig().public.apiBase,
        credentials: "include",
      });

      const profileRes = await $fetch("/rcms-api/1/profile", {
        baseURL: useRuntimeConfig().public.apiBase,
        credentials: "include",
      });
      this.setProfile(profileRes)
      this.updateLocalStorage({ authenticated: true })
    },
    async logout() {
      try {
        await $fetch("/rcms-api/1/logout", {
          method: "POST",
          baseURL: useRuntimeConfig().public.apiBase,
          credentials: "include",
        });
      } catch {
        /** No Process */
        /** When it returns errors, it consider that logout is complete and ignore this process. */
      }
      this.setProfile(null);
      this.updateLocalStorage({ authenticated: false });

      navigateTo("/login");
    },
    async restoreLoginState() {
      const authenticated = localStorage.getItem("authenticated");
      const isAuthenticated = authenticated ? JSON.parse(authenticated) : false;

      if (!isAuthenticated) {
        throw new Error("need to login");
      }
      try {
        const profileRes = await $fetch("/rcms-api/1/profile", {
          baseURL: useRuntimeConfig().public.apiBase,
          credentials: "include",
        });
        this.setProfile(profileRes);
      } catch {
        await this.logout();
        throw new Error("need to login");
      }
    },
  },
  getters: {
    authenticated: (state) => state.profile !== null,
  },
});