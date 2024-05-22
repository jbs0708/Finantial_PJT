<template>
  <div>
    <h2 style="margin: 10px;">국내증시 시가총액 Top5</h2>
    <table class="stock-table">
      <thead>
        <tr>
          <th>주식명</th>
          <th>현재가</th>
          <th>시가총액</th>
          <th>PER</th>
          <th>PBR</th>
          <th>전일가</th>
          <th>시작가</th>
          <th>고가</th>
          <th>저가</th>
          <th>거래량</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in stocks" :key="stock.stockCode">
          <td>{{ stock.stockName }}</td>
          <td>{{ stock.currentPrice }}원</td>
          <td>{{ stock.marketSum }}</td>
          <td>{{ stock.PER }}배</td>
          <td>{{ stock.PBR }}배</td>
          <td>{{ stock.yesterdayPrice }}원</td>
          <td>{{ stock.startPrice }}원</td>
          <td>{{ stock.highPrice }}원</td>
          <td>{{ stock.lowPrice }}원</td>
          <td>{{ stock.tradingVolume }}주</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useDataStore } from '@/stores/finantialdata';
const store = useDataStore();
const stocks = ref([]);

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const loadStockData = () => {
  axios({
    method: 'get',
    url: `${store.API_URL}/mainpage/stock/`
  })
  .then((res) => {
    console.log(res.data);
    stocks.value = res.data.map(stock => ({
      stockCode: stock.stockCode,
      stockName: stock.stockName,
      currentPrice: numberWithCommas(stock.currentPrice),
      marketSum: numberWithCommas(stock.marketSum),
      PER: stock.PER,
      PBR: stock.PBR,
      yesterdayPrice: numberWithCommas(stock.yesterdayPrice),
      startPrice: numberWithCommas(stock.startPrice),
      highPrice: numberWithCommas(stock.highPrice),
      lowPrice: numberWithCommas(stock.lowPrice),
      tradingVolume: numberWithCommas(stock.tradingVolume)
    }));
  })
  .catch((err) => {
    console.error(err);
  });
};

onMounted(() => {
  loadStockData();
});
</script>

<style scoped>
.stock-table {
  width: 100%;
  border-collapse: collapse;
}

.stock-table th,
.stock-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.stock-table th {
  background-color: #f2f2f2;
}

.stock-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
