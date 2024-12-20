<template>
  <div>
    <p v-if="Status !== null" :style="{ color: resultMessageColor() }">
      {{ resultMessage }}
    </p>
    <form @submit.prevent="login">
      <input v-model="email" name="email" type="email" placeholder="email" />
      <input v-model="password" name="password" type="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const email = ref("");
const password = ref("");
const Status = ref(null);
const resultMessage = ref(null);

const resultMessageColor = () => {
  switch (Status.value) {
    case "success":
      return "green";
    case "failure":
      return "red";
    default:
      return "";
  }
};

const login = async () => {
  try {
    const payload = {
      email: email.value,
      password: password.value,
    };
    const response = await $fetch("https://sample-support-kuroco.a.kuroco.app/rcms-api/35/login", {
      method: "POST",
      //baseURL: config.public.apiBase,
      credentials: "include",
      body: payload,
    });
    Status.value = "success";
    resultMessage.value = response.messages;
  } catch (error) {
    Status.value = "failure";
    resultMessage.value = error.response._data.errors[0].message;
  }
};
</script>
