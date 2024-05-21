<template>
  <v-container>
    <v-app-bar
      app
      color="indigo-darken-2"
      dark
    >
      <v-toolbar-title>금융 상품</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-window
      v-model="window"
      show-arrows="hover"
      class="custom-window my-5"
    >
      <v-window-item
        v-for="(item, index) in items"
        :key="index"
        :value="index"
      >
        <v-card
          class="mx-auto"
          height="200px"
          @click="navigateTo(item.route)"
          style="cursor: pointer;"
        >
          <v-card-text class="text-center">
            <div class="text-h2">{{ item.title }}</div>
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
    <v-row justify="center" class="my-10">
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="6"
        md="3"
      >
        <v-btn
          block
          large
          color="primary"
          class="my-3"
          @click="navigateTo(item.route)"
        >
          {{ item.title }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/finantialdata'

// 라우터 객체를 가져옴
const router = useRouter()

// 데이터 스토어를 사용
const store = useDataStore()

// 반응형 상태 선언
const window = ref(0)

// 컴포넌트가 마운트될 때 데이터를 저장
onMounted(() => {
  store.saveDatas()
})

// 네비게이션 아이템 목록
const items = ref([
  { title: '예금 상품 추천 받기', route: { name: 'ProductRecommendDeposit' }, context: '예금 상품 추천 받기' },
  { title: '적금 상품 추천 받기', route: { name: 'ProductRecommendSaving' }, context: '적금 상품 추천 받기' },
  { title: '예금 상품 보기', route: { name: 'ProductListDeposit' }, context: '예금 상품 보기 내용' },
  { title: '적금 상품 보기', route: { name: 'ProductListSaving' }, context: '적금 상품 보기 내용' },
])

// 지정된 경로로 네비게이션하는 함수
const navigateTo = (route) => {
  router.push(route)
}
</script>

<style scoped>
.custom-window {
  width: 100%; /* 원하는 너비로 변경 가능 */
}

.v-card {
  width: 100%;
  max-width: 1000px; /* 원하는 최대 너비 설정 */
}

.text-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; /* 부모 요소의 높이와 같도록 설정 */
}
</style>
