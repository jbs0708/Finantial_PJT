<template>
  <div v-if="!store.token">
      <h3>비로그인 사용자입니다.</h3>
  </div>
  <div v-else>
      <div class="mt-5">
          <h1>{{ username }}님의 프로필</h1>
            <div>
              <div>
                <button type="submit">상세정보 수정</button> | 
                <button @click="store.withdraw">회원 탈퇴</button>
              </div>
              <hr>
              <h3>{{ username }}님의 상세정보</h3>
              <div class="sort">
                <div>
                    <p>E-mail : {{ email }}</p>
                </div>
                <div>
                  <p>닉네임 : {{ nickname }}</p>
                </div>
                <div>
                  <p>생년월일 : {{ birthday }}</p>
                </div>
                <div>
                  <p>성별 : {{ gender }}</p>
                </div>
                <div>
                  <p>자산 : {{ asset }} 원</p>
                </div>
                <div>
                  <p>연봉 : {{ salary }} 원</p>
                </div>
                <div>
                  <p>주거래은행 : {{ bank }}</p>
                </div>
                <div>
                  <p>희망 유치기간 : {{ period }}</p>
                </div>
              </div>
            </div>
            <hr>
            <h3> 가입한 상품들</h3>
              <div class="sort">
                <div>
                  ~가입한 상품들~
                </div>
              </div>
            <hr>
            <h3> 가입한 상품 금리</h3>
              <div class="sort">
                <div>
                  ~가입한 상품 금리 차트~
                </div>
              </div>
            <hr>
            <h3>{{ username }}님이 쓴 게시글 목록</h3>
            <div class="sort">
              <div>
                ~게시글 목록~
              </div>
            </div>
            <hr>
            <h3>{{ username }}님이 댓글을 남긴 게시글 목록</h3>
            <div class="sort">
              <div>
                ~댓글 쓴 게시글 목록~   
              </div>
            </div>
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