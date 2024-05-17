<template>
  <div>
    <div v-for="product in filteredProducts" :key="product.id" @click="selectProduct(product)">
      <!-- Display product details here -->
      <div>
        <!-- 금융회사명과 상품명 -->
        <p>{{ product.금융회사명 }}</p>
        <p>{{ product.상품명 }}</p>
        <!-- 개월수에서 가장 높은 값만 표시 -->
        <p>최고 연이율: {{ getMaxMonth(product) }}</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  filteredProducts: Array
})

const emit = defineEmits(['productSelected'])

const selectProduct = (product) => {
  emit('productSelected', product)
}

// 개월 수에서 가장 높은 값을 가져오는 함수
const getMaxMonth = (product) => {
  const maxMonth = Math.max(product["6개월"] || 0, product["12개월"] || 0, product["24개월"] || 0, product["36개월"] || 0)
  return maxMonth !== 0 ? `${maxMonth}` : "N/A"
}
</script>

<style scoped>
/* Add your styles here */
</style>
