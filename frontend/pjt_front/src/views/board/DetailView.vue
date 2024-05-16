<template>
  <div>
    <h1>DetailView</h1>
    <div v-if="article">
      <p>{{ article.id }}번 게시글 | 작성자: {{ article.nickname ? article.nickname : "무명 사용자" }} | <span v-if="article.created_at != article.updated_at">(수정됨)</span></p>
      <p>제목 : {{ article.title }}</p>
      <p>내용 : {{ article.content }}</p>
      <p>작성시간 : {{ formatDate(article.created_at) }}</p>
      <p v-if="article.created_at != article.updated_at">
        수정시간 : {{ formatDate(article.updated_at) }}
      </p>
      <span><button @click="goArticle">게시판으로 돌아가기</button></span>
      <span v-if="article.userId === userCheck.userId">
        | <button @click="updateArticle">수정하기</button> | <button @click="deleteArticle">삭제</button>
      </span>
    </div>
    <hr>
    <!-- <CreateComment article-id="article.value.id" />
    <ul>
      <li>
        <Comment v-for="comment in comments" :key="comment ? comment.id : null"/>
      </li>
    </ul> -->
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useBoardStore } from '@/stores/board'
import { userCheckStore } from '@/stores/usercheck';
import { useRoute, useRouter } from 'vue-router'

import CreateComment from '@/components/CreateComment.vue';
// import Comment from '@/components/Comment.vue';

const store = useBoardStore()
const userCheck = userCheckStore()
const route = useRoute()
const article = ref(null)
const router = useRouter()

const goArticle = function () {
  router.push({ name: 'board' })
}

const deleteArticle = function () {
  const question = window.confirm('게시글을 삭제하시겠습니까?')
  if (question) {
  axios({
    method: 'delete',
    url: `${store.API_URL}/api/v1/boards/article_detail/${article.value.id}/`,
    headers: {
      Authorization: `Token ${userCheck.token}`
    }
  })
    .then((response) => {
      router.push({ name: 'board' })
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

const updateArticle = function () {
  router.push({name: 'UpdateView'})
}

onMounted(() => {
  axios({
    method: 'get',
    url: `${store.API_URL}/api/v1/boards/article_detail/${route.params.id}/`,
    headers: {
      Authorization: `Token ${userCheck.token}`
    }
  })
    .then((response) => {
      article.value = response.data
      console.log(article.value.id)
    })
    .catch((error) => {
      console.log(error)
    })
})

const formatDate = function (dateInfo) {
    const date = new Date(dateInfo)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    // Form the desired date string
    const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
    return formattedDate
}


</script>

<style>

</style>
