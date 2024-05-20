<template>
  <div>
    추천상품
  </div>
  <v-autocomplete
    v-model="selectedCompany"
    :items="companyNames"
    label="금융회사명"
    clearable
    variant="outlined"
  ></v-autocomplete>
  <v-btn @click="recommendProduct(selectedCompany)">검색</v-btn>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/finantialdata'

const selectedCompany = ref('')
const companyNames = ref([])
const store = useDataStore()
const router = useRouter()

// 로컬 스토리지에서 데이터 불러오기
const loadCompanies = () => {
  const data = store.depositDatas
  if (data) {
    try {
      // 중복된 값을 제거하여 고유한 회사명 리스트 생성
      const uniqueCompanies = [...new Set(data.map(product => product.금융회사명))]
      companyNames.value = uniqueCompanies
    } catch (error) {
      console.error('데이터 처리 중 오류 발생:', error)
    }
  }
};

onMounted(loadCompanies)

const recommendProduct = function (selectedCompany) {
  router.push({ name: 'ProductDepositRecommendView', params: { selectedCompany: selectedCompany} })
}
</script>

<style scoped>
</style>
