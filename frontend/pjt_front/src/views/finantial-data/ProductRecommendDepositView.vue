<template>
  <div>
    추천상품
  </div>
  <v-combobox
    v-model="selectedCompany"
    label="금융회사명"
    :items="companyNames"
    variant="underlined"
  ></v-combobox>
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
      // 만약 data가 객체 배열이라면 바로 사용
      const uniqueCompanies = [...new Set(data.map(product => product.금융회사명))]
      companyNames.value = uniqueCompanies
    } catch (error) {
      console.error('Error processing data:', error)
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
