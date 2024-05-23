<template>
  <v-row fluid grid-list-sm>
    <v-spacer></v-spacer>
    <v-col cols="8">
      <div>
        <div v-if="article">
          <h1>제목 : {{ article.title }}</h1>
          <div>
            <p class="text-h6">
              작성자: {{ article.nickname ? article.nickname : "Unknown" }}
              <span v-if="article.created_at != article.updated_at"> - (수정됨)</span>
            </p>
          </div>
          <v-sheet border="info md" height="250px" width="100%" rounded>{{ article.content }}</v-sheet>
          <div>
            <p>작성시간 : {{ formatDate(article.created_at) }}</p>
            <p v-if="article.created_at != article.updated_at">수정시간 : {{ formatDate(article.updated_at) }}</p>
          </div>
        </div>
        <hr />
        <div>
          <span><v-btn @click="goArticle">게시판으로 돌아가기</v-btn></span>
          <span v-if="userCheck.userId && article && article.userId === userCheck.userId">
            | <v-btn @click="updateArticle">수정하기</v-btn> | <v-btn @click="deleteArticle">삭제</v-btn>
          </span>
        </div>
        <hr />
        <div>
          <h2>댓글</h2>
          <div class="spacer">
            <CreateComment @create-comment="getBoardDetail(articleId)" />
          </div>
          <hr />
          <div>
            <Comment v-for="comment in comments" :key="comment ? comment.id : null" :comment-Info="comment" @delete-comment="getBoardDetail(articleId)" />
          </div>
        </div>
      </div>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
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

const goArticle = () => {
  router.push({ name: 'board' })
}

const deleteArticle = () => {
  const question = window.confirm('게시글을 삭제하시겠습니까?')
  if (question) {
    axios({
      method: 'delete',
      url: `${store.API_URL}/api/v1/boards/article_detail/${article.value.id}/`,
      headers: {
        Authorization: `Token ${userCheck.token}`
      }
    })
      .then(() => {
        router.push({ name: 'board' })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const updateArticle = () => {
  router.push({ name: 'UpdateView' })
}

onMounted(() => {
  getBoardDetail(articleId)
})

const formatDate = (dateInfo) => {
  const date = new Date(dateInfo)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`
  return formattedDate
}

const getBoardDetail = (articleId) => {
  axios({
    method: 'get',
    url: `${userCheck.API_URL}/api/v1/boards/article_detail/${articleId}/`,
    headers: {
      Authorization: `Token ${userCheck.token}`
    }
  })
    .then((res) => {
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

.spacer {
  margin: 30px;
}
</style>
