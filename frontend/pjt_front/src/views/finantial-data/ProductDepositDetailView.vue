<template>
  <div>
    <div v-if="detail">
      <h2>
        {{detail.fin_prdt_nm}} 상세정보
      </h2>
      <div>
        <label>금융회사명 : </label>
        <span>{{ detail.kor_co_nm }}</span>
      </div>
      <div>
        <label>상품명 : </label>
        <span>{{ detail.fin_prdt_nm }}</span>
      </div>
      <div>
        <label>가입제한 : </label>
        <span>{{ detail.join_deny }}</span>
      </div>
      <div>
        <label>가입 방법 : </label>
        <span>{{ detail.join_way }}</span>
      </div>
      <div>
        <label>우대조건 : </label>
        <span>{{ detail.spcl_cnd }}</span>
      </div>
      <div>
        <label>기타 유의사항 : </label>
        <span>{{ detail.etc_note }}</span>
      </div>
    </div>
      <div v-else>
        <h2>
          상세정보 받아오는 중...
        </h2>
      </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore } from '@/stores/finantialdata'

import axios from 'axios'

const route = useRoute()
const router = useRouter()
const store = useDataStore()
const id = route.params.id

const detail = ref(null)

onMounted(() => {
  const API_LINK = route.params.fin_prdt_cd
  axios.get(`${store.API_URL}/compare_deposit/deposit_product/detail/${API_LINK}/`)
 .then((res) => {
    detail.value = res.data
    console.log(detail.value)
  })
  .catch((err) => {
    console.log(err)
  })
}
)

</script>

<style  scoped>

</style>