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
        메인프로필?
    </div>
</template>

<style>

</style>