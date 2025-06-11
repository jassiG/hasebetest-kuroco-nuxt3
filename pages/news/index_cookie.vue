<template>
  <div>
    <button type="button" @click="logout">Logout</button>
    <p>News list</p>
    <div v-for="n in response.list" :key="n.slug">
      <nuxt-link :to="`/news/${n.topics_id}`">
        {{ n.ymd }} {{ n.subject }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/stores/authentication";
definePageMeta({
  middleware: ["auth"],
});
const config = useRuntimeConfig();
const store = useStore();
console.log('store access_token', store.access_token)
const { data: response } = await useFetch('/rcms-api/1/news', {
  baseURL: config.public.apiBase,
  headers: {
    'X-RCMS-API-ACCESS-TOKEN': store.access_token,
  },
});
const logout = () => store.logout();
</script>
