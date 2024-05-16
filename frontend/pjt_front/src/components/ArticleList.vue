<template>
  <div>
    <h3>게시글 목록</h3>
    <ArticleListItem 
      v-for="article in store.articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script setup>
import { useBoardStore } from '@/stores/board'
import ArticleListItem from '@/components/ArticleListItem.vue'

const store = useBoardStore()
</script>
