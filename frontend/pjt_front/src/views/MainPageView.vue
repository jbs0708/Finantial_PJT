<template>
  <v-row fluid grid-list-md>
    <v-col cols="8" offset="1" style="height: 800px;">
      <Banner />
    </v-col>
    <v-col cols="2" class="calculator-column">
      <ExchangeRateCalculator />
    </v-col>
    <v-divider></v-divider>
    <v-col cols="5" offset="1" class="scrollable-column">
      <NaverNews />
    </v-col>
    <v-col cols="5" class="scrollable-column">
      <NaverStock />
    </v-col>
  </v-row>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import ExchangeRateCalculator from '@/components/ExchangeRateCalculator.vue'
import Banner from '@/components/Banner.vue'
import NaverNews from '@/components/NaverNews.vue'
import NaverStock from '@/components/NaverStock.vue'
</script>

<style scoped>
.calculator-column {
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
}

.scrollable-column {
  height: 100%;
  max-height: 600px;
  overflow-y: auto;
}

/* 수직 스크롤바 스타일 */
.scrollable-column::-webkit-scrollbar {
  width: 12px; /* 수직 스크롤바의 너비 */
}

.scrollable-column::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 스크롤바 트랙의 배경색 */
}

.scrollable-column::-webkit-scrollbar-thumb {
  background-color: #888; /* 스크롤바의 색 */
  border-radius: 6px; /* 스크롤바의 모서리 반경 */
}
</style>
