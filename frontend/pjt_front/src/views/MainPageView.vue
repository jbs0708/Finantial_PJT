<template>
    <div>
      <section class="main-visual">
        <img src="#" alt="Main Visual" />
        <div class="main-visual-content">
          <h1>금융 프로젝트에 오신 것을 환영합니다!</h1>
          <p>더 나은 금융 서비스를 제공하는데 동참해보세요.</p>
          <v-btn @click="exploreFeatures" color="primary">주요 기능 알아보기</v-btn>
        </div>
      </section>
  
      <!-- 이하 기존 섹션들을 유지한 코드 -->
      <section class="intro-section border-visible">
        1
        <!-- 소개 섹션 내용 -->
      </section>
  
      <section class="features-section border-visible">
        2
        <!-- 주요 기능 섹션 내용 -->
      </section>
  
      <section class="news-section border-visible">
        3
        <!-- 최신 소식 섹션 내용 -->
      </section>
  
      <section class="testimonial-section border-visible">
        4
        <!-- 사용자 테스티모니얼 섹션 내용 -->
      </section>
  
      <section class="contact-section border-visible">
        5
        <!-- 문의하기 섹션 내용 -->
      </section>
    </div>
  </template>
  
  <script>
  import ExchangeRateCalculator from '@/components/ExchangeRateCalculator.vue'

  export default {
    name: 'MainPage',
    methods: {
      exploreFeatures() {
        // 주요 기능 섹션으로 스크롤 이동
        const featuresSection = document.querySelector('.features-section');
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  </script>
  
  <style scoped>
  .border-visible {
    border: 1px solid black;
    border-radius: 5px;
  }
  .main-visual {
    position: relative;
    height: 500px;
    overflow: hidden;
  }
  
  .main-visual img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .main-visual-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
  }
  
  .main-visual-content h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .main-visual-content p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  
  @media (max-width: 768px) {
    .main-visual-content h1 {
      font-size: 2rem;
    }
  
    .main-visual-content p {
      font-size: 1rem;
    }
  }
  </style>
  