<template>
  <form @submit.prevent="login">
    <p v-if="loginStatus !== null" :style="{ color: resultMessageColor }">
      {{ resultMessage }}
    </p>
    <input v-model="email" name="email" type="email" placeholder="email" />
    <input
      v-model="password"
      name="password"
      type="password"
      placeholder="password" />
    <button type="submit">Login</button>
    <div>
        <nuxt-link to="/news">
            news list
        </nuxt-link>
    </div>
  </form>
</template>

<script setup>
  import { useStore } from "~/stores/authentication";
  const store = useStore();
  definePageMeta({
    middleware: "auth",
  });
  const config = useRuntimeConfig();

  const email = ref('');
  const password = ref('');
  const loginStatus = ref(null);
  const resultMessage = ref(null);

  let resultMessageColor = computed(() => {
    switch (loginStatus.value) {
      case "success":
        return "green";
      case "failure":
        return "red";
      default:
        return "";
    }
  });
  async function login() {
  // Dummy request(Succeed/fail after 1 sec.)
  const shouldSuccess = true
  const request = new Promise((resolve, reject) =>
      setTimeout(
          () => (shouldSuccess ? resolve() : reject(Error('login failure'))),
          1000
      )
  )
  try {
      await request
      store.setProfile({}); // Apply the dummy object to store.state.profile
      
      loginStatus.value = 'success'
      resultMessage.value = 'Login successful'
  } catch (e) {
      loginStatus.value = 'failure'
      resultMessage.value = 'Login failed'
  }
}
</script>