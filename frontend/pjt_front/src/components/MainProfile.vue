<script setup>
import { userCheckStore } from '@/stores/usercheck';
import { useRouter } from 'vue-router'

const userStore = userCheckStore()

const router = useRouter()
const goLogin = function () {
    router.push({name: 'login'})
}
const goDetail = function () {
    router.push({name: 'userdetail'})
}
// const goRecommend = function () {
//     router.push({name: 'productRecommend'})
// }

const goMyProfile = function () {
    router.push({name:'myprofile'})
}

</script>

<template>
    <div v-if="userStore.token" class="profile_box login">
        <p class="h4 mt-5"><strong>{{ userStore.userId }}님</strong>, 안녕하세요</p>
        <div class="button-box d-flex justify-content-center">
            <div class="vbar">
                <button class="btn btn-lg px-3" @click="goDetail">개인정보 수정</button>
            </div>
            <div class="vbar">
                <button class="btn btn-lg px-3" @click="goMyProfile">나의 프로필</button>
            </div>
            <!-- <button class="btn btn-lg px-3" @click="goRecommend">추천 상품 보기</button> -->
        </div>
    </div>
    <div v-else class="profile_box notLogin">
        <div class="text-center">
            <p class="h4">비로그인 상태입니다</p>
            <p>로그인 후, 다양한 서비스를 이용하실 수 있습니다.</p>
        </div>
        <button class="btn btn-dark btn-lg" @click="goLogin">로그인</button>
    </div>
</template>

<style scoped>
.profile_box {
    display: grid;
    place-items: center;
    margin: 0;
    border-radius: 10px;
    /* text-align: center; */
}

.login {
    background-color: #cdcdcd7e;
}

.notLogin {
    border: solid 3px #575757;
    background-color: white;
}

.button-box {
    border-top: 1px gray solid;
    padding: 10px;
}

.vbar{
    display: inline-block;
    padding: 5px;
}
</style>