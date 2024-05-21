<template>
  <div>
    <v-row :style="{margin: '20px auto' }">
      <v-col cols="6">
        <v-card-title class="d-flex justify-center" :style="{ fontSize: '30px' }">{{company}} 추천상품</v-card-title>
        <v-card variant="outlined" :style="{ width: '80%', margin: '20px auto' }">
          <template #text>
            <!-- 개월 수의 데이터 값이 높은 순으로 정렬하여 ProductCardRecommendDeposit에 전달 -->
            <ProductCardRecommendDeposit :filteredProducts="sortedProducts" @productSelected="handleProductSelected" />
          </template>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card-title class="d-flex justify-center" :style="{ fontSize: '30px' }">추천상품 (상위 5개)</v-card-title>
        <v-card variant="outlined" :style="{ width: '80%', margin: '20px auto' }">
          <template #text>
            <!-- 개월 수의 데이터 값이 높은 순으로 정렬하여 ProductCardRecommendDeposit에 전달 -->
            <ProductCardRecommendDeposit :filteredProducts="top5Products" @productSelected="handleProductSelected" />
          </template>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores/finantialdata'
import ProductCardRecommendDeposit from '@/components/ProductCardRecommendDeposit.vue'

const store = useDataStore()
const route = useRoute()

const company = route.params.selectedCompany
const filteredProducts = ref([])
const selectedProductText = ref([])

onMounted(() => {
  const datas = store.depositDatas
  filteredProducts.value = datas.filter(product => product.금융회사명 === company)
})

// 개월 수의 데이터 값이 높은 순으로 정렬된 배열을 계산
const sortedProducts = computed(() => {
  return filteredProducts.value.slice().sort((a, b) => {
    const aMax = Math.max(a["6개월"] || 0, a["12개월"] || 0, a["24개월"] || 0, a["36개월"] || 0)
    const bMax = Math.max(b["6개월"] || 0, b["12개월"] || 0, b["24개월"] || 0, b["36개월"] || 0)
    return bMax - aMax
  })
})

// 개월 수의 데이터 값이 높은 순으로 정렬된 배열에서 상위 5개의 제품 선택
const top5Products = computed(() => {
  return store.depositDatas.slice().sort((a, b) => {
    const aMax = Math.max(a["6개월"] || 0, a["12개월"] || 0, a["24개월"] || 0, a["36개월"] || 0)
    const bMax = Math.max(b["6개월"] || 0, b["12개월"] || 0, b["24개월"] || 0, b["36개월"] || 0)
    return bMax - aMax
  }).slice(0, 5) // 상위 5개의 제품 선택
})

const handleProductSelected = (product) => {
  selectedProductText.push(`상품명: ${product.상품명}, 6개월: ${product["6개월"] || 'N/A'}, 12개월: ${product["12개월"] || 'N/A'}, 24개월: ${product["24개월"] || 'N/A'}, 36개월: ${product["36개월"] || 'N/A'}`)
}
</script>

<style scoped>

</style>
