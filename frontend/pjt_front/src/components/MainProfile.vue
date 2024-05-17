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

const goMyProfile = function () {
    router.push({name:'myprofile'})
}
</script>

<template>
    <div>
        메인페이지임ㅋㅋ
    </div>
</template>

<style>

</style>