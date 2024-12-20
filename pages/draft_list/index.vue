<template>
  <div>
    <p>draft list</p>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { data: response } = await useFetch("https://sample-support-kuroco.a.kuroco.app/rcms-api/35/topics/draft_list", {
  //baseURL: config.public.apiBase,
  credentials: "include",
  headers: {
    accept: "application/json",
  },
});
</script>
