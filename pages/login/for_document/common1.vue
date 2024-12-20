<template>
  <form @submit.prevent="login">
    <input v-model="email" name="email" type="email" placeholder="email" />
    <input
      v-model="password"
      name="password"
      type="password"
      placeholder="password" />
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
  const config = useRuntimeConfig();

  const email = ref('');
  const password = ref('');

  function login() {
    console.log(email.value, password.value);
  }
</script>