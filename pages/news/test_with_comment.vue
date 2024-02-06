<template>
  <div v-if="response">
    <h1 class="title">{{ response.details.subject }}</h1>
    <div class="post" v-html="response.details.contents"></div>
    <p v-if="resultMessage !== null">
      {{ resultMessage }}
    </p>
    <div>
        please type your name: <input v-model="userName" type="text" placeholder="your name">
    </div>
    <div>
        <ul v-for="comment in comments" :key="comment.comment_id">
            <li>
                {{ comment.note }} by {{ comment.name }}
                <button type="button" @click="() => deleteComment(comment.comment_id)">
                    delete
                </button>
            </li>
        </ul>
        <form @submit.prevent="submitComment">
            <input v-model="inputComment" type="text" placeholder="comment">
            <button type="submit" :disabled="inputComment === '' || userName === ''">
                submit
            </button>
        </form>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';

const response = ref(null);
let comments = ref([]);
const userName = ref('');
const inputComment = ref('');
const resultMessage = ref(null);
const config = useRuntimeConfig();

async function getAllComments(topics_id) {
  const res = await useFetch(`/rcms-api/21/comments?module_id=${topics_id}&cnt=999`,{
    baseURL:config.public.apiBase,
    credentials: 'include',
  });
  const {list} = await res.data.value;
  return list;
}

async function fetchData() {
  const res = await useFetch('/rcms-api/21/newsdetail/965',{
    baseURL:config.public.apiBase,
    credentials: 'include',
  });
  response.value = res.data.value;
  comments.value = await getAllComments(response.value.details.topics_id);
}

fetchData();

async function submitComment() {
  await $fetch('/rcms-api/21/comment', {
    method: 'POST',
    body: JSON.stringify({
      module_id: response.value.details.topics_id,
      name: userName.value,
      note: inputComment.value,
    }),
    baseURL:config.public.apiBase,
    credentials: 'include',
  });
  comments.value = await getAllComments(response.value.details.topics_id);
  inputComment = '';
}

async function deleteComment(commentId) {
  try {
    await $fetch(`/rcms-api/21/comment_delete/${commentId}`, {
      method: 'POST',
      body: JSON.stringify({
        delkey: '',
      }),
      baseURL:config.public.apiBase,
      credentials: 'include',
    });
    comments.value = await getAllComments(response.value.details.topics_id);
    inputComment = '';
  } catch (error) {
    resultMessage = error.message;
  }
}
</script>