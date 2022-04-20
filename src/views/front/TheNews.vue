<template>
  <Loading :active="isLoading" :opacity="0.8" :z-index="1000">
    <Loader></Loader>
  </Loading>
  <div class="container d-flex justify-content-center">
    <div class="col-lg-8">
      <nav
        class="mt-4"
        style="--bs-breadcrumb-divider: '>'"
        aria-label="breadcrumb"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">首頁</a></li>
          <li class="breadcrumb-item">
            <a href="#/news">最新消息</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ article.title }}
          </li>
        </ol>
      </nav>
      <h2 class="fw-bold">{{ article.title }}</h2>
      <small class="text-muted">
        <span class="me-2">
          <i class="bi bi-pencil"></i>
          {{ article.author }}
        </span>
        <span class="me-2">
          <i class="bi bi-calendar3"></i>
          {{ new Date(article.create_at * 1000).toLocaleDateString() }}
        </span>
        <div class="mt-2">
          <span
            v-for="(tag, i) in article.tag"
            :key="i"
            class="badge bg-secondary me-1 text-dark"
            >{{ tag }}</span
          >
        </div>
      </small>
      <img class="my-4 img-fluid" :src="article.image" />
      <div v-html="article.content" class="article-content"></div>
      <div class="row my-5">
        <router-link class="col-md-6" :to="`/news/${preArticle.id}`">
          <div
            v-if="preArticle"
            class="page p-3 text-dark border-start border-dark border-4"
          >
            <i class="bi bi-arrow-left"></i> 前一篇 <br />
            <span class="mt-1 fw-bold">{{ preArticle.title }}</span>
          </div>
        </router-link>
        <router-link class="col-md-6" :to="`/news/${nextArticle.id}`">
          <div
            v-if="nextArticle"
            class="page p-3 text-dark text-md-end border-end border-dark border-4"
          >
            後一篇 <i class="bi bi-arrow-right"></i> <br />
            <span class="mt-1 fw-bold">{{ nextArticle.title }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/LoadingComponents.vue";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      id: "",
      article: [],
      articles: {},
      preArticle: [],
      nextArticle: [],
      getNextArticle: [],
      isLoading: false,
    };
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        this.getArticle();
        this.getArticles();
      }
    },
  },
  methods: {
    getArticle() {
      this.id = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${this.id}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.article = res.data.article;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    getArticles() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles`;
      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.articles;
          this.getNextArticles(this.articles);
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    getNextArticles(articles) {
      articles.forEach((item, i) => {
        if (item.id === this.id) {
          this.preArticle = articles[i + 1] || false;
          this.nextArticle = articles[i - 1] || false;
        }
      });
    },
  },
  mounted() {
    this.getArticle();
    this.getArticles();
  },
};
</script>

<style>
.article-content {
  color: #343a40;
}
.article-content h4 {
  font-size: 1.5rem;
  margin-top: 2rem;
}
.page {
  background: #ece6db;
}
.page:hover {
  background: rgba(86, 181, 194, 0.075);
  transition: 1s;
}
</style>
