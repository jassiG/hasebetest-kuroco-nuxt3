import {defineStore} from 'pinia';

export const useStore = defineStore('authentication', {
  state: () => ({
    profile: null,
  }),
  actions: {
    setProfile(profile) {
      this.profile = profile;
    },
  },
  getters: {
    authenticated: (state) => state.profile !== null,
  },
});