<template>
  <div>
    <RouterLink to="/ProductListDeposit">예금 상품 보기</RouterLink> |
    <RouterLink to="/ProductListSaving">적금 상품 보기</RouterLink>
      <h3>적금</h3>
    <ProductListSavingItem />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
import { onMounted } from 'vue'
import { useDataStore } from '@/stores/finantialdata'
import { RouterLink, RouterView } from 'vue-router'

import ProductListSavingItem from '@/components/ProductListSavingItem.vue'

const store = useDataStore()

onMounted(() => {
  store.getSavingDatas()
})
</script>

<style lang="scss" scoped>

</style>