<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="custom-window" max-width="1000">
          <h1 class="pb-8 font-weight-bold">
            추천상품
          </h1>
          <v-card-text>
            <v-autocomplete v-model="selectedCompany" :items="companyNames" label="금융회사명" clearable variant="underlined"></v-autocomplete>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="info" size="x-large" dark tile rounded="lg" elevation="10" class="text-none mb-4" @click="recommendProduct(selectedCompany)">
              추천 상품 검색
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
  const data = store.savingDatas
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
  if (selectedCompany === '') {
    alert('금융회사명을 선택해주세요')
    return
  }
  router.push({ name: 'ProductSavingRecommendView', params: { selectedCompany: selectedCompany } })
}
</script>

<style scoped>
.custom-window {
  margin: 10px;
  padding: 20px;
  width: 100%;
  /* 원하는 너비로 변경 가능 */
}
</style>
