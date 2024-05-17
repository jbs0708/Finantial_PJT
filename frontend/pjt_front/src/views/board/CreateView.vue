<template>
  <div>
    <h1>게시글 작성</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">제목 : </label>
        <input type="text" v-model.trim="title" id="title">
      </div>
      <div>
        <label for="content">내용 : </label>
        <textarea v-model.trim="content" id="content"></textarea>
      </div>
      <v-btn>
        <input v-if="isCreate" type="submit" value="생성">
        <input v-else type="submit" value="수정">
      </v-btn> 
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { userCheckStore } from '@/stores/usercheck'
import { useBoardStore } from '@/stores/board'
import { useRouter, useRoute } from 'vue-router'


const store = userCheckStore()
const boardStore = useBoardStore()

const title = ref(null)
const content = ref(null)

const router = useRouter()
const route = useRoute()

const isCreate = ref(true)

const createArticle = function () {
  axios({
    method: 'post',
    url: `${store.API_URL}/api/v1/boards/articles/`,
    data: {
      title: title.value,
      content: content.value,
    },
    headers: {
        Authorization: `Token ${store.token}`
    }
  })
    .then((response) => {
      router.push({ name: 'board' })
    })
    .catch((error) => {
      console.log(error)
    })
}

const updateArticle = function () {
    axios({
        method: 'put',
        url: `${store.API_URL}/api/v1/boards/article_detail/${route.params.id}/`,
        data: {
            title: title.value,
            content: content.value,
        },
        headers: {
            Authorization: `Token ${store.token}`
        }
    })
    .then((response) => {
        router.push({name: 'DetailView'})
    })
    .catch((error) => {
        console.log(error)
    })
}

const handleSubmit = function () {
    if (isCreate.value) {
      createArticle()
    } else {
      updateArticle()
    }
}


if (route.name === 'UpdateView') {
  onMounted(() => {
  axios({
    method: 'get',
    url: `${store.API_URL}/api/v1/boards/article_detail/${route.params.id}/`,
    headers: {
      Authorization: `Token ${store.token}`
    }
  })
    .then((response) => {
      title.value = response.data.title
      content.value = response.data.content
    })
    .catch((error) => {
      console.log(error)
    })
  })
  isCreate.value = false
}

</script>

<style>

</style>
