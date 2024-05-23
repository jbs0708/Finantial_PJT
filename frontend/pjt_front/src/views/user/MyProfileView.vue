<template>
  <div v-if="!store.token">
    <h3>비로그인 사용자입니다.</h3>
  </div>
  <div v-else>
    <v-container>
      <v-card-title>
        <h2>{{ username }}님의 상세정보</h2>
      </v-card-title>

      <form @submit.prevent="updateDetail">
      <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="username"
                  placeholder="UserName"
                  label="아이디"
                />
              </VCol>

              <!-- 👉 NickName -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="nickname"
                  placeholder="NickName"
                  label="닉네임"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="email"
                  label="E-mail"
                  placeholder="ssafy@gmail.com"
                  type="email"
                />
              </VCol>

              <!-- 👉 Birth Day -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="birthday"
                  label="생년원일"
                  placeholder="YYYY-MM-DD"
                  type="date"
                />
              </VCol>

              <!-- 👉 Gender -->
              <VCol
                cols="12"
                md="6"
              >
              <v-select
                v-model="gender"
                :items="genders"
                label="성별"
              ></v-select>
              </VCol>

              <!-- 👉 Asset -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="asset"
                  label="자산"
                />
              </VCol>

              <!-- 👉 Salary -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="salary"
                  label="연봉"
                />
              </VCol>

              <!-- 👉 Bank -->
              <VCol
                cols="12"
                md="6"
              >
              <v-select
                v-model="bank"
                :items="bankList"
                label="주거래은행"
              ></v-select>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <div>
          <v-btn type="submit">변경된 내용 저장</v-btn>
          <v-btn @click="store.withdraw">회원 탈퇴</v-btn>
          <v-btn @click="goChangePassword">비밀번호 변경</v-btn>
        </div>
      </form>

      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-card class="mx-auto my-5">
            <v-card-title>
              <h3>가입한 상품들</h3>
            </v-card-title>
            <v-card-text>
              <div class="row">
              <template v-if="products.deposit_list && products.deposit_list.length">
                <div v-for="deposit in products.deposit_list" :key="deposit.id">
                  <p>(정기예금){{ deposit.deposit_product.kor_co_nm }} - <span @click="goDetailDeposit(deposit.deposit_product.fin_prdt_cd)">{{ deposit.deposit_product.fin_prdt_nm }}</span></p>
                </div>
              </template>

              <div v-if="products.saving_list && products.saving_list.length">
                <div v-for="saving in products.saving_list" :key="saving.id">
                  <p>(정기적금){{ saving.saving_product.kor_co_nm }} - <span @click="goDetailSaving(saving.saving_product.fin_prdt_cd)">{{ saving.saving_product.fin_prdt_nm }}</span></p>
                </div>
              </div>

              <template v-if="!products.deposit_list && !products.saving_list">
                <div>
                  <p class="text-center"><strong>가입한 상품이 없습니다.</strong></p>
                </div>
              </template>
            </div>
            </v-card-text>
          </v-card>

          <v-card class="mx-auto my-5">
            <v-card-title>
              <h3>가입한 상품 금리</h3>
            </v-card-title>
            <v-card-text>
              <BarChart />
            </v-card-text>
          </v-card>

            <v-card-title>
              <h3>작성한 게시글 목록</h3>
            </v-card-title>
            <MyArticleList />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { userCheckStore } from '@/stores/usercheck'
import { useBoardStore } from '@/stores/board'
import { useRouter } from 'vue-router'
import MyArticleList from '@/components/MyArticleList.vue'
import BarChart from '@/components/BarChart.vue'

const router = useRouter()

const store = userCheckStore()
const boardStore = useBoardStore()
const products = ref('')

const username = ref(null)
const email = ref(null)
const birthday = ref(null)
const nickname = ref(null)
const gender = ref(null)
const asset = ref(null)
const salary = ref(null)
const bank = ref(null)
const genders = ref([
  "남성", "여성"
])


const goChangePassword = function (pk) {
  router.push({ name: 'changepassword' })
}

const periodList = [
  "1년 이하",
  "1년 초과 ~ 2년 이하",
  "2년 초과 ~ 3년 이하"
]

const bankList = [
  '우리은행', '한국스탠다드차타드은행', '대구은행', '부산은행',
  '광주은행', '제주은행', '전북은행', '경남은행', '중소기업은행',
  '한국산업은행', '국민은행', '신한은행', '농협은행주식회사',
  '하나은행', '수협은행', '주식회사 케이뱅크',
  '주식회사 카카오뱅크', '토스뱅크 주식회사'
]

const checkUser = function () {
  axios({
    method: 'get',
    url: `${store.API_URL}/api/v1/accounts/userdetail/`,
    headers: {
      Authorization: `Token ${store.token}`
    }
  })
    .then((res) => {
      username.value = res.data.user.username
      email.value = res.data.user.email
      nickname.value = res.data.nickname
      birthday.value = res.data.birthday
      gender.value = res.data.gender
      asset.value = res.data.asset
      salary.value = res.data.salary
      bank.value = res.data.bank
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(() => {
  checkUser(),
  boardStore.getMyArticles(),
  getJoinList()
})

const updateDetail = function () {
  axios({
    method: 'put',
    url: `${store.API_URL}/api/v1/accounts/userdetail/`,
    data: {
      email: email.value,
      nickname: nickname.value,
      gender: gender.value,
      birthday: birthday.value,
      asset: asset.value,
      salary: salary.value,
      bank: bank.value,
      userId: store.userId,

    },
    headers: {
      Authorization: `Token ${store.token}`
    }
  })
    .then((res) => {
      console.log('프로필 수정 완료')
      window.alert('개인정보 수정이 완료되었습니다.')
      store.nickname = nickname.value
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
    })
}

const getJoinList = function () {
  axios({
    method: 'get',
    url: `${store.API_URL}/api/v1/accounts/join_list/`,
    headers: {
      Authorization: `Token ${store.token}`
    }
  })
    .then((res) => {
      console.log(res.data)
      products.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const goDetailDeposit = function (fin_prdt_cd) {
  router.push({ name: 'ProductDepositDetailView', params: { fin_prdt_cd: fin_prdt_cd } })
}

const goDetailSaving = function (fin_prdt_cd) {
  router.push({ name: 'ProductSavingDetailView', params: { fin_prdt_cd: fin_prdt_cd } })
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

.v-btn {
  padding: 5px;
  margin: 5px;
}

.v-card {
  padding: 5%;
}

.v-card-text {
  font-size: 20px;
}

.spacer {
  margin: 20px;
}

span {
  cursor: pointer;
  color: blue;
}
</style>
