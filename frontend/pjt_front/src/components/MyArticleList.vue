<template>
  <div>
    <MyArticleListItem 
      v-for="article in store.articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script setup>
import { useBoardStore } from '@/stores/board'
import MyArticleListItem from '@/components/MyArticleListItem.vue'

const store = useBoardStore()
</script>
