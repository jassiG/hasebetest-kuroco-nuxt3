<template>
  <div>
    <p>News list</p>
    <div v-for="n in response.list" :key="n.slug">
      <nuxt-link :to="`/news/${n.topics_id}`">
        {{ n.ymd }} {{ n.subject }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
const config = useRuntimeConfig();
const { data: response } = await useFetch('/rcms-api/1/news', {
  baseURL: config.public.apiBase,
  credentials: 'include',
});
</script>
