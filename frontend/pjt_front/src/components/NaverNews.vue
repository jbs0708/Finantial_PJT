<template>
  <div>
    <v-row>
      <h2 style="margin: 10px;">뉴스</h2>
      <v-col
        v-for="(article, index) in articles"
        :key="index"
        cols="12"
        class="news-item"
      >
        <h2 v-html="stripTags(article.title)"></h2>
        <p v-html="stripTags(article.description)"></p>
        <a :href="article.link" target="_blank">기사 원문 보기</a>
        <small>{{ article.pubDate }}</small>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useDataStore } from '@/stores/finantialdata';

const store = useDataStore();
const articles = ref([]);

const stripTags = (text) => {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
};

const loadCrawlingData = () => {
  axios({
    method: 'get',
    url: `${store.API_URL}/mainpage/article/`
  })
  .then((res) => {
    articles.value = res.data.items.map(article => ({
      ...article,
    }));
  })
  .catch((err) => {
    console.error(err);
  });
};

const extractImage = (description) => {
  const imgTagMatch = description.match(/<img[^>]+src="([^">]+)"/);
  return imgTagMatch ? imgTagMatch[1] : null;
};

onMounted(() => {
  loadCrawlingData();
});
</script>

<style scoped>
.news-item {
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
}
.news-item h2 {
  font-size: 1.5em;
}
.news-item img.news-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 10px 0;
}
.news-item p {
  font-size: 1em;
}
.news-item a {
  display: block;
  margin-top: 10px;
  color: blue;
}
.news-item small {
  display: block;
  margin-top: 5px;
  font-size: 0.8em;
  color: gray;
}
</style>
