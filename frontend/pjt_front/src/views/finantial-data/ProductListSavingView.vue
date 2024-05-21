<template>
  <div>
    <v-tabs v-model="activeTab" background-color="indigo darken-2" dark>
      <v-tab to="/ProductListDeposit">예금 상품 보기</v-tab>
      <v-tab to="/ProductListSaving">적금 상품 보기</v-tab>
    </v-tabs>
    <h1 class="title">적금</h1>
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

<style scoped>
.title {
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333; /* 제목 색상 설정 */
}
</style>