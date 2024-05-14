<template>
  <div>
    <h3>상품 리스트</h3>
    <!-- <ProductListItem v-for="data in store.datas" :key="data.id" :data="data" /> -->
    <test/>
  </div>
</template>

<script setup>
import { useDataStore } from '@/stores/finantialdata'
import ProductListItem from '@/components/ProductListItem.vue'
import test from '@/components/test.vue'

const store = useDataStore()
</script>

<style scoped>

</style>