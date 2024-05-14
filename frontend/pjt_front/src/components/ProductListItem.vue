<template>
  <div>
    <!-- <span>{{data.id}}</span>
    <p>금융회사명 : {{ data.deposit_product.kor_co_nm }}</p> 
    <p>상품명 : {{ data.deposit_product.fin_prdt_nm }}</p>
    <p>개월수 : {{ data.save_trm }} | 예금율 : {{ data.intr_rate }}</p>  -->
    <hr>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const datas = ref(null)
defineProps({
  data: {
    type: Object,
    required: true
  }
})

</script>

<style scoped>

</style>