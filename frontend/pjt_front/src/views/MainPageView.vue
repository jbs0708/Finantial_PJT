<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { userCheckStore } from '@/stores/usercheck';
import MainProfile from '@/components/MainProfile.vue';

const userStore = userCheckStore()

</script>

<template>
    <div class="outer">
        <div class="container1 mx-5">
            <div class="row">
                <div class="col-lg-3">
                    <MainProfile class="profile-box" style="height: 40%;"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container1 {
    /* height: 6rem; */
}

.container2 {
    /* height: 20rem; */
    margin: 3.5rem;
}
.MMBoard {
    background-color: #d7fff6;
    border-radius: 10px;
    padding: 20px;
}

.LBoard {
    background-color: #d5ffee;
    border-radius: 10px;
    padding: 20px;
}

.quiz {
    /* display: grid;
    place-items: center;
    background-color: #00B992;
    color: white;
    border-radius: 10px; */
    height: 35%;
}

.indexList {
    margin-top: 3rem;
    /* height: 59%; */
    border: gray 3px solid;
    border-radius: 10px;
}

.exchange-rate-sub {
        display: none; 
}

@media (max-width: 1700px) {
    .exchange-rate-main {
        display: none;
    }
    .exchange-rate-sub {
        display: block;
        height: 22rem;
        margin: 2rem 4rem;
    }
    .profile-box {
        height: 17rem !important;
    }
}

@media (max-width: 980px) {
    div {
        margin-top: 2rem;
    }

    .exchange-rate-main {
        height: 22rem !important;
    }

    .profile-box {
        height: 15rem !important;
    }
}

</style>