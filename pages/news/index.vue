<template>
  <div>
    <p>News list</p>
    <div v-for="n in response.list" :key="n.topics_id">
      <nuxt-link :to="`/news/${n.topics_id}`">
        {{ n.ymd }} {{ n.subject }}
      </nuxt-link>
    </div>
    <p>Test With Comment</p>
    <nuxt-link to="/news/test_with_comment">Test With Comment</nuxt-link>
    <Pagenator v-bind="{ ...response.pageInfo }" @pageUpdate="fetchData"/>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute();
const page = ref(route.query.page || 1);
const response = ref(null);
const loading = ref(false);

await fetchData(page.value);

async function fetchData(page) {
  const res = await $fetch(`${config.public.apiBase}/rcms-api/1/news?pageID=${page}`, {
    method: 'GET',
    credentials: 'include',
  });
  response.value = res;
}
</script>
