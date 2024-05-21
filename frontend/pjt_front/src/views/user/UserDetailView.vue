<template>
  <div v-if="!store.token">
      <h3>비로그인 사용자입니다.</h3>
  </div>
  <div v-else>
      <div>
          <h1>개인정보 수정</h1>
          <form @submit.prevent="updateDetail">
              <div>
                  <span>ID: {{ username }}</span>
                  <v-btn @click="goChangePassword">비밀번호 수정</v-btn>
              </div>
              <hr>
              <div>
                  <div>
                      <label for="email">E-Mail :</label>
                      <input type="text" id="email" v-model="email" style="width: 70%;">
                  </div>
                  <div class="mb-3">
                      <label for="nickname">닉네임 :</label>
                      <input type="text" id="nickname" v-model="nickname" style="width: 70%;" >
                  </div>
                  <div class="mb-3">
                      <label for="birthday">생년월일 :</label>
                      <input type="text" id="birthday" placeholder="YYYYMMDD" v-model="birthday"
                          style="width: 70%;">
                  </div>
                  <div class="mb-3">
                      <label for="gender">성별 :</label>
                      <select id="gender" v-model="gender" style="width: 70%;">
                          <option disabled value="">다음 중 하나를 선택하세요</option>
                          <option>남성</option>
                          <option>여성</option>
                      </select>
                  </div>
                  <div class="mb-3">
                      <label for="asset" class="form-label">자산 :</label>
                      <input type="text" id="asset" v-model="asset" style="width: 70%;">원
                  </div>
                  <div class="mb-3">
                      <label for="salary">연봉 :</label>
                      <input type="text" v-model="salary" style="width: 70%;">원
                  </div>
                  <div class="mb-3">
                      <label for="bank">주거래은행 :</label>
                      <select name="bank" id="bank" v-model="bank" style="width: 70%;">
                          <option disabled value="">다음 중 하나를 선택하세요</option>
                          <option :value="bk" v-for="bk in bankList">{{ bk }}</option>
                      </select>
                  </div>
              </div>
              <div>
                <v-btn type="submit">수정</v-btn>
              </div>
              <div>
                  <v-btn @click="store.withdraw">회원 탈퇴</v-btn>
              </div>
          </form>
      </div>
  </div>
</template>


<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { userCheckStore } from '@/stores/usercheck'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = userCheckStore()

const username = ref(null)
const email = ref(null)
const birthday = ref(null)
const nickname = ref(null)
const gender = ref(null)
const asset = ref(null)
const salary = ref(null)
const bank = ref(null)
const period = ref(null)

const goChangePassword = function (pk) {
    router.push({ name: 'changepassword' })
}

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
            period.value = res.data.period
        })
        .catch((err) => {
            console.log(err)
        })
}


onMounted(() => {
    checkUser()
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
          period: period.value,
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
          router.push({ name: 'home' })
      })
      .catch((err) => {
          console.log(err)
      })
}



</script>

<style scoped>
.sort {
  margin: 20px 70px;
  padding: 10px;
}
</style>