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
      // dummy request(succeed/fail after 1 sec.)
      const shouldSuccess = true
      const request = new Promise((resolve, reject) =>
        setTimeout(
          () => (shouldSuccess ? resolve() : reject(Error('login failure'))),
          1000
        )
      )
      await request

      this.setProfile({}) // Apply the dummy object to store.state.profile
      this.updateLocalStorage({ authenticated: true })
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