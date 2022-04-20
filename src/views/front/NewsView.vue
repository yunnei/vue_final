<template>
  <Loading :active="isLoading" :opacity="0.8" :z-index="1000">
    <Loader></Loader>
  </Loading>
  <div class="container">
    <h2 class="text-center my-4">
      最新消息<br />
      <span class="text-primary fs-6">— 島入新聞 —</span>
    </h2>
    <button
      v-if="tag"
      class="btn btn-sm btn-outline-dark mb-2"
      type="button"
      @click="getArticles()"
    >
      <i class="bi bi-arrow-left"></i> 返回全部
    </button>
    <div class="row row-cols-md-2 row-cols-1 gx-4">
      <div v-for="article in articles" :key="article.id" class="col">
        <div class="article card mb-4 col">
          <router-link :to="`/news/${article.id}`">
            <div class="row g-0">
              <div class="col-md-4 d-flex align-items-center">
                <img :src="article.image" class="img-fluid" />
              </div>
              <div class="col-md-8">
                <div
                  class="card-body h-100 d-flex flex-column justify-content-between"
                >
                  <div class="mb-2">
                    <h5 class="card-title fw-bold">{{ article.title }}</h5>
                    <small class="text-muted">
                      <span class="me-2">
                        <i class="bi bi-pencil"></i>
                        {{ article.author }}
                      </span>
                      <i class="bi bi-calendar3"></i>
                      {{
                        new Date(article.create_at * 1000).toLocaleDateString()
                      }}
                    </small>
                    <p class="card-text mt-2">
                      {{ article.description }}
                    </p>
                  </div>
                  <div>
                    <span
                      v-for="(tag, i) in article.tag"
                      :key="i"
                      class="me-1"
                      @click="getTagArticle(tag)"
                    >
                      <a
                        class="tag badge"
                        href="#"
                        @click.prevent="getTagArticle(tag)"
                      >
                        {{ tag }}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
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
      articles: [],
      tag: "",
      isLoading: true,
    };
  },
  methods: {
    getArticles() {
      this.tag = "";
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.articles;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    getTagArticle(tag) {
      this.tag = tag;
      const tagArticles = [];
      this.articles.forEach((article) => {
        article.tag.forEach((item) => {
          if (item === tag) {
            tagArticles.push(article);
          }
        });
      });
      this.articles = tagArticles;
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>

<style>
.article a {
  color: #000;
}
.article {
  border: none;
  border-bottom: 1px solid #dee2e6;
}
.article:hover {
  background: rgba(86, 181, 194, 0.05);
}
.article .tag {
  background: #ece6db;
  color: #70502a;
}
.article .tag:hover {
  background: #70502a;
  color: #fff;
}
</style>
