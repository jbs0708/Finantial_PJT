<template>
  <div>
    <h1>게시판</h1>
    <v-btn @click="goCreateView">게시글 작성하기</v-btn>
    <ArticleList />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBoardStore } from '@/stores/board'
import { useRouter } from 'vue-router'
import ArticleList from '@/components/ArticleList.vue'

const store = useBoardStore()
const router = useRouter()

onMounted(() => {
  store.getArticles()
})

const goCreateView = () => {
  router.push({ name: 'CreateView' })
}
</script>

<style scoped>
.v-btn:hover {
  background-color: lightskyblue;
}
</style>