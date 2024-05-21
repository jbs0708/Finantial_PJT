<template>
  <div>
    <div v-if="article">
      <h1>제목 : {{ article.title }}</h1>
      <div><p class="text-h6">작성자: {{ article.nickname ? article.nickname : "Unknown" }}<span v-if="article.created_at != article.updated_at"> - (수정됨)</span></p></div>
      <v-sheet border="info md" height="250px" width="100%" rounded>{{ article.content }}</v-sheet>
      <div>
        <p>작성시간 : {{ formatDate(article.created_at) }}</p>
        <p v-if="article.created_at != article.updated_at">
          수정시간 : {{ formatDate(article.updated_at) }}
        </p>
      </div>
    </div>
      <hr>
      <div>
        <span><v-btn @click="goArticle">게시판으로 돌아가기</v-btn></span>
        <span v-if="article.userId === userCheck.userId">
          | <v-btn @click="updateArticle">수정하기</v-btn> | <v-btn @click="deleteArticle">삭제</v-btn>
        </span>
      </div>
    <hr>
    <div>
      <h2>댓글</h2>
      <CreateComment @create-comment="getBoardDetail(articleId)"/>
      <hr>
      <Comment v-for="comment in comments" :key="comment ? comment.id : null" :comment-Info="comment" @delete-comment="getBoardDetail(articleId)" />
      <!-- <Comment :comment-Info="comments" /> -->
    </div>

  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, onBeforeMount, ref } from 'vue'
import { useBoardStore } from '@/stores/board'
import { userCheckStore } from '@/stores/usercheck'
import { useRoute, useRouter } from 'vue-router'

import CreateComment from '@/components/CreateComment.vue'
import Comment from '@/components/Comment.vue'

const store = useBoardStore()
const userCheck = userCheckStore()
const route = useRoute()
const article = ref(null)
const router = useRouter()
const comments = ref(null)
const articleId = route.params.id

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

onBeforeMount(() => {
  getBoardDetail(articleId),
  axios({
    method: 'get',
    url: `${store.API_URL}/api/v1/boards/article_detail/${route.params.id}/`,
    headers: {
      Authorization: `Token ${userCheck.token}`
    }
  })
    .then((response) => {
      article.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})

onMounted(() => {
  getBoardDetail(articleId),
  axios({
    method: 'get',
    url: `${store.API_URL}/api/v1/boards/article_detail/${route.params.id}/`,
    headers: {
      Authorization: `Token ${userCheck.token}`
    }
  })
    .then((response) => {
      article.value = response.data
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

const getBoardDetail = function (articleId) {
    if (userCheck.userId == null) {
        router.push({name: 'login'})
    }
    axios({
        method: 'get',
        url: `${userCheck.API_URL}/api/v1/boards/article_detail/${articleId}/`,
        headers: {
          Authorization: `Token ${userCheck.token}`
        }
    })
    .then((res) => {
        // console.log('상세 게시글 불러오기')
        console.log(res.data)
        article.value = res.data
        comments.value = res.data.comment
        store.articleDetail = res.data
    })
    .catch((err) => {
        console.log(err)
    })
}


</script>

<style scoped>
div {
  margin: 10px;
}

</style>
