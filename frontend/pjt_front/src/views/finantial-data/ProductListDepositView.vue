<template>
  <div>
    <v-tabs v-model="activeTab" background-color="indigo darken-2" dark>
      <v-tab to="/ProductListDeposit">예금 상품 보기</v-tab>
      <v-tab to="/ProductListSaving">적금 상품 보기</v-tab>
    </v-tabs>
    <h1 class="title">예금</h1>
    <ProductListDepositItem/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDataStore } from '@/stores/finantialdata'
import { RouterLink } from 'vue-router'

import ProductListDepositItem from '@/components/ProductListDepositItem.vue'

const store = useDataStore()

onMounted(() => {
  store.getDatas()
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
