<template>
  <div>
    <RouterLink to="/ProductListDeposit">예금 상품 보기</RouterLink> |
    <RouterLink to="/ProductListSaving">적금 상품 보기</RouterLink>
    <h3>예금</h3>
    <ProductListDepositItem/>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useDataStore } from '@/stores/finantialdata'
import { RouterLink, RouterView } from 'vue-router'

import ProductListDepositItem from '@/components/ProductListDepositItem.vue'

const store = useDataStore()

onMounted(() => {
  store.getDatas()
})

</script>

<style scoped>

</style>
