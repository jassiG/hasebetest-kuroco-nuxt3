import { defineStore } from 'pinia';

export const useStore = defineStore('authentication', {
  state: () => ({
    profile: null,
  }),
  actions: {
    setProfile(profile) {
      this.profile = profile;
    },
    async restoreLoginState() {
      const authenticated = localStorage.getItem("authenticated");
      const isAuthenticated = authenticated ? JSON.parse(authenticated) : false;

      if (!isAuthenticated) {
        throw new Error("need to login");
      }
      try {
        this.setProfile({}); // Store the dummy object.
      } catch {
        throw new Error("need to login");
      }
    },
  },
  getters: {
    authenticated: (state) => state.profile !== null,
  },
});