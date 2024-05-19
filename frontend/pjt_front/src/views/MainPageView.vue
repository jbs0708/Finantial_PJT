<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { userCheckStore } from '@/stores/usercheck';
import ExchangeRateCalculator from '@/components/ExchangeRateCalculator.vue'

const userStore = userCheckStore()

</script>

<template>
    <div>
        메인페이지임ㅋㅋ
        <hr>
        <ExchangeRateCalculator />
    </div>
</template>

<style scoped>


</style>