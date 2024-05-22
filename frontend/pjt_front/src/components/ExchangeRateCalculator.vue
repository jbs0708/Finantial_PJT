<script setup>
import { ref, computed, watch, vModelCheckbox, callWithErrorHandling } from 'vue'
import axios from 'axios'
import { userCheckStore } from '@/stores/usercheck'


const store = userCheckStore()
const baseURL = `${store.API_URL}/api/v1/exchange_rate/get/`
const currentDate = new Date()
const searchDate = ref(currentDate.toISOString().slice(0, 10))
const from = ref('')
const fromValue = ref()
const to = ref('')
const toValue = ref()
const rate = ref()
const mod = ref(1)
const warningMsg = ref('')


// from 이나 to에서 100 단위 환율인 인도네시아 루피아, 일본 엔 선택 시 => mod 값을 100으로 변경 / 다른 화폐는 모두 mod 값이 1
watch([from, to], () => {
    fromValue.value = ''
    toValue.value = ''
    if (['IDR(100)', 'JPY(100)'].includes(from.value) | ['IDR(100)', 'JPY(100)'].includes(to.value)) {
        mod.value = 100
    } else {
        mod.value = 1
    }
})


// from 에서 한국 원이 아닌 다른 화폐를 선택한 경우, to는 한국 원으로 바꿔줌
watch(from, (newVal, oldVal) => {
    if (newVal != 'KRW') {
        to.value = 'KRW'
    }
})


// to 에서 한국 원이 아닌 다른 화폐를 선택한 경우, from은 한국 원으로 바꿔줌
watch(to, (newVal, oldVal) => {
    if (newVal != 'KRW') {
        from.value = 'KRW'
    }
})


// fromValue에 변화가 있으면, toValue 초기화
watch(fromValue, (newVal, oldVal) => {
    toValue.value = ''
})


const calculate = function () {
    const URL = `${store.API_URL}/api/v1/exchange_rate/get/?searchDate=${searchDate.value}&from=${from.value}&to=${to.value}`
    axios({
        method: 'get',
        url: URL
    })
        .then((response) => {
            // console.log(response)
            const data = response.data
            const idx = data.findIndex((item) => {
                if (to.value === 'KRW') {
                    return item.cur_unit === from.value
                } else {
                    return item.cur_unit === to.value
                }
            })
            rate.value = parseFloat(data[idx].deal_bas_r.replace(',', '')) // 매매 기준율

            if (to.value === 'KRW') {
                toValue.value = ((fromValue.value * rate.value) / mod.value).toFixed(2)
            } else {
                toValue.value = ((fromValue.value / rate.value) * mod.value).toFixed(2)
            }

            if (searchDate.value != data[idx].search_date) {
                window.alert(`영업시간이 아닙니다. ${data[idx].search_date}의 기준환율로 계산됩니다.`)
                warningMsg.value = `영업시간이 아닙니다. ${data[idx].search_date}의 기준환율로 계산됩니다.`
            } else {
                warningMsg.value = ''
            }
        })
        .catch((error) => {
            console.log(error)
        })

}

const changeFromTo = () => {
    [from.value, to.value] = [to.value, from.value]
}

</script>

<template>
    <v-card class="exchange-card">
        <v-card-title>
            <h2 style="font-size: 24px;">환율계산기</h2>
            <p style="font-size: 16px;">매매기준율로 계산됩니다.</p>
        </v-card-title>
        <v-card-text>
            <v-divider></v-divider>
            <v-row>
                <v-col cols="12">
                    <div>
                        <label for="source-input" style="font-size: 16px;">FROM</label><br>
                        <select id="source-input" v-model="from" style="font-size: 16px;" class="custom-select">
                            <option value="AED">아랍에미리트 디르함</option>
                            <option value="AUD">호주 달러</option>
                            <option value="BHD">바레인 디나르</option>
                            <option value="BND">브루나이 달러</option>
                            <option value="CAD">캐나다 달러</option>
                            <option value="CHF">스위스 프랑</option>
                            <option value="CNH">중국 위안화</option>
                            <option value="DKK">덴마크 크로네</option>
                            <option value="EUR">유럽연합 유로</option>
                            <option value="GBP">영국 파운드</option>
                            <option value="HKD">홍콩 달러</option>
                            <option value="IDR(100)">인도네시아 루피아</option>
                            <option value="JPY(100)">일본 엔</option>
                            <option value="KRW">한국 원</option>
                            <option value="KWD">쿠웨이트 디나르</option>
                            <option value="MYR">말레이시아 링깃</option>
                            <option value="NOK">노르웨이 크로네</option>
                            <option value="NZD">뉴질랜드 달러</option>
                            <option value="SAR">사우디 리얄</option>
                            <option value="SEK">스웨덴 크로나</option>
                            <option value="SGD">싱가포르 달러</option>
                            <option value="THB">태국 달러</option>
                            <option value="USD">미국 달러</option>
                        </select>
                    </div>
                </v-col>
                <v-col cols="6">
                    <div>
                        <label for="source-output" style="font-size: 16px;">TO</label><br>
                        <select id="source-output" v-model="to" style="font-size: 16px;" class="custom-select">
                            <option value="AED">아랍에미리트 디르함</option>
                            <option value="AUD">호주 달러</option>
                            <option value="BHD">바레인 디나르</option>
                            <option value="BND">브루나이 달러</option>
                            <option value="CAD">캐나다 달러</option>
                            <option value="CHF">스위스 프랑</option>
                            <option value="CNH">중국 위안화</option>
                            <option value="DKK">덴마크 크로네</option>
                            <option value="EUR">유럽연합 유로</option>
                            <option value="GBP">영국 파운드</option>
                            <option value="HKD">홍콩 달러</option>
                            <option value="IDR(100)">인도네시아 루피아</option>
                            <option value="JPY(100)">일본 엔</option>
                            <option value="KRW">한국 원</option>
                            <option value="KWD">쿠웨이트 디나르</option>
                            <option value="MYR">말레이시아 링깃</option>
                            <option value="NOK">노르웨이 크로네</option>
                            <option value="NZD">뉴질랜드 달러</option>
                            <option value="SAR">사우디 리얄</option>
                            <option value="SEK">스웨덴 크로나</option>
                            <option value="SGD">싱가포르 달러</option>
                            <option value="THB">태국 달러</option>
                            <option value="USD">미국 달러</option>
                        </select>
                    </div>
                </v-col>
            </v-row>
            <v-btn class="swap-btn" @click="changeFromTo" style="font-size: 16px; margin-top: 10px;">Swap</v-btn>
            <v-btn class="calculate-btn col-12" @click="calculate"
                style="font-size: 16px; margin-top: 10px;">계산하기</v-btn>
            <div style="margin-top: 20px; margin-bottom: 20px;">
                <div style="margin-top: 20px; margin-bottom: 20px;">
                    <input type="number" v-model="fromValue" id="source-input-value" placeholder="금액 입력"
                        style="font-size: 16px;" class="custom-select">
                    <label style="font-size: 16px;">{{ from.includes('(100)') ? from.slice(0, 3) : from }}</label>
                </div>
                <div style="margin-top: 20px; margin-bottom: 20px;">
                    <p style="display: inline; font-size: 16px;"> = </p>
                    <p style="display: inline; font-size: 20px;">{{ toValue }}</p>
                    <label style="display: inline; font-size: 20px;">{{ to.includes('(100)') ? to.slice(0, 3) : to
                        }}</label>
                </div>

            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.exchange-card {
    width: 400px;
    /* 카드의 너비 조정 */
    background-color: #f5f5f5;
    /* 카드의 배경색 지정 */
    padding: 20px;
    /* 내부 여백 설정 */
}

.swap-btn,
.calculate-btn {
    margin-top: 10px;
    /* 버튼 간격 조정 */
}

.swap-btn {
    background-color: #1976D2;
    /* 스왑 버튼 배경색 */
    color: white;
    /* 스왑 버튼 텍스트 색상 */
}

.calculate-btn {
    background-color: #388E3C;
    /* 계산하기 버튼 배경색 */
    color: white;
    /* 계산하기 버튼 텍스트 색상 */
}

.custom-select {
    padding: 8px 16px;
    /* 선택 옵션의 패딩 설정 */
    border: 1px solid #ccc;
    /* 선택 옵션의 테두리 설정 */
    border-radius: 4px;
    /* 선택 옵션의 모서리 둥글기 설정 */
    background-color: #fff;
    /* 선택 옵션의 배경색 설정 */
    font-size: 16px;
    /* 선택 옵션의 글자 크기 설정 */
}
</style>
