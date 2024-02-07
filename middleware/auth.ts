import getProfile from "~/composables/profile";

export default defineNuxtRouteMiddleware(async (to) => {
  const profile = await getProfile();
  if (profile.member_id) {
    return;
  }else {
    return '/login';
  }
})
