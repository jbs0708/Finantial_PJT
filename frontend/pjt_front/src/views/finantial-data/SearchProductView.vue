<template>
  <div>
    <RouterLink to="/ProductRecommendDeposit">예금 상품 추천 받기</RouterLink> |
    <RouterLink to="/ProductListDeposit">예금 상품 보기</RouterLink> |
    <RouterLink to="/ProductListSaving">적금 상품 보기</RouterLink>
    
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { useDataStore } from '@/stores/finantialdata'
  const store = useDataStore()
  onMounted(() => {
  store.saveDatas()
})

</script>

<style scoped>

</style>
