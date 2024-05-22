<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card v-if="detail" class="mx-auto my-5" width="100%">
            <v-card-title>
              <h2>{{ detail.fin_prdt_nm }} 상세정보</h2>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <label>금융회사명: </label>
                  <span>{{ detail.kor_co_nm }}</span>
                </v-col>
                <v-col cols="12">
                  <label>상품명: </label>
                  <span>{{ detail.fin_prdt_nm }}</span>
                </v-col>
                <v-col cols="12">
                  <label>가입제한: </label>
                  <span>{{ detail.join_deny }}</span>
                </v-col>
                <v-col cols="12">
                  <label>가입 방법: </label>
                  <span>{{ detail.join_way }}</span>
                </v-col>
                <v-col cols="12">
                  <label>우대조건: </label>
                  <span>{{ detail.spcl_cnd }}</span>
                </v-col>
                <v-col cols="12">
                  <label>기타 유의사항: </label>
                  <span>{{ detail.etc_note }}</span>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col class="text-right">
                  <!-- <v-btn color="primary" @click="joinProduct(detail.fin_prdt_cd, term, rate)"> 가입하기</v-btn> -->
                  <v-btn v-if="statement == '가입하기'" color="primary" @click="joinProduct()">상품 {{ statement }}</v-btn>
                  <v-btn v-else color="red" @click="joinProduct()">상품 가입취소</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
          <v-card v-else class="mx-auto my-5" max-width="800">
            <v-card-title>
              <h2>상세정보 받아오는 중...</h2>
            </v-card-title>
            <v-card-text>
              <v-row justify="center">
                <v-col class="text-center">
                  <v-progress-circular indeterminate></v-progress-circular>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores/finantialdata'
import { userCheckStore } from '@/stores/usercheck'
import axios from 'axios'

const route = useRoute()
const store = useDataStore()
const userStore = userCheckStore()
const id = route.params.id
const userPK = userStore.userPK

const detail = ref(null)
const rates = ref({})

const statement = ref('')

onMounted(() => {
  const API_LINK = route.params.fin_prdt_cd
  axios.get(`${store.API_URL}/compare_deposit/saving_product/detail/${API_LINK}/`)
    .then((res) => {
      detail.value = res.data
      console.log(detail.value)

      // 로컬 스토리지에서 해당 상품의 가능한 개월 수와 금리 정보 가져오기
      const product = store.savingDatas.find(item => item.fin_prdt_cd === API_LINK)
      if (product) {
        for (const [key, value] of Object.entries(product)) {
          if (key !== '금융회사명' && key !== '상품명' && key !== 'fin_prdt_cd' && key !== 'id') {
            rates.value[key] = value
          }
        }
      }
      check_joins_user()
    })
    .catch((err) => {
      console.log(err)
    })
})

// const joinProduct = (productId, term, rate) => {
//   // 선택된 개월 수와 함께 가입하기 로직을 추가하세요.
//   console.log(`상품 ID: ${productId}, 가입 기간: ${term} 개월 , 이율 : ${rate}`)
// }

const joinProduct = function() {
  axios({
    method: 'post',
    url: `${store.API_URL}/compare_deposit/${route.params.fin_prdt_cd}/joins_saving/`,
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
    .then((res) => {
      if (res.data.joined) {
        statement.value = "가입취소"
      } else {
        statement.value = "가입하기"
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const check_joins_user = function () {
  axios({
    method: 'get',
    url: `${store.API_URL}/compare_deposit/${route.params.fin_prdt_cd}/joins_saving_check/`,
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
    .then((res) => {
      if (res.data.user) {
        console.log('가입됨')
        statement.value = '가입취소'
      }
      else {
        console.log('가입안됨')
        statement.value = '가입하기'
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style scoped>
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.my-5 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.text-center {
  text-align: center;
}
</style>
