<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card v-if="detail" class="mx-auto my-5" max-width="800">
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

            <v-row>
              <v-col v-for="(rate, term) in rates" :key="term" cols="5" offset="1">
                <div v-if="!rate == ''">
                  <span>{{ term }}개월 이율 : {{ rate }}%</span>
                  <v-btn v-if="!joinList[term]" color="primary" @click="joinProduct(term)">상품 가입하기</v-btn>
                  <v-btn v-else color="red" @click="joinProduct(term)">상품 가입취소</v-btn>
                </div>
              </v-col>
            </v-row>
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
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores/finantialdata'
import { userCheckStore } from '@/stores/usercheck'
import axios from 'axios'

const route = useRoute()
const store = useDataStore()
const userStore = userCheckStore()

const detail = ref(null)
const rates = ref({})
const options = ref(null)
const joinList = ref({})
const statement = ref(null)

onMounted(async () => {
  const API_LINK = route.params.fin_prdt_cd
  const product = store.depositDatas.find(item => item.fin_prdt_cd === API_LINK)
  console.log(product)
  
  try {
    const optionsRes = await axios.get(`${store.API_URL}/compare_deposit/deposit_product/options/${API_LINK}/`)
    options.value = optionsRes.data
    console.log(options.value)

    if (options.value.length > 0) {
      const promises = options.value.map(async (option) => {
        if (option.save_trm >= 6) {
          rates.value[option.save_trm] = option.intr_rate
          await check_joins_user(option.save_trm)
          joinList.value[option.save_trm] = statement.value
          console.log(option.save_trm)
        }
      })
      
      await Promise.all(promises)
      console.log(joinList.value)
    }

    const detailRes = await axios.get(`${store.API_URL}/compare_deposit/deposit_product/detail/${API_LINK}/`)
    detail.value = detailRes.data

  } catch (err) {
    console.log(err)
  }
})

const check_joins_user = async function (term) {
  try {
    const res = await axios({
      method: 'get',
      url: `${store.API_URL}/compare_deposit/${route.params.fin_prdt_cd}/joins_deposit_check/${term}/`,
      headers: {
        Authorization: `Token ${userStore.token}`
      }
    })
    statement.value = res.data.user
  } catch (err) {
    console.log(err)
  }
}

const joinProduct = async function(term) {
  try {
    const res = await axios({
      method: 'post',
      url: `${store.API_URL}/compare_deposit/${route.params.fin_prdt_cd}/joins_deposit/${term}/`,
      headers: {
        Authorization: `Token ${userStore.token}`
      }
    })

    if (res.data.joined) {
      joinList.value[term] = true
    } else {
      joinList.value[term] = false
    }
  } catch (err) {
    console.log(err)
  }
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
.v-row {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
