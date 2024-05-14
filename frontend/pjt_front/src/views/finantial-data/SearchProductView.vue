<template>
  <div>
    <h1>예적금 상품 조회</h1>
    <ProductList/>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useDataStore } from '@/stores/finantialdata'
  import ProductList from '@/components/ProductList.vue'

  const store = useDataStore()

  onMounted(() => {
    store.getDatas()
  })
</script>

<style scoped>

</style>