<template>
  <div>
    <RouterLink to="/ProductListDeposit">예금 상품 보기</RouterLink> |
    <RouterLink to="/ProductListSaving">적금 상품 보기</RouterLink>
    
  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>

</style>
