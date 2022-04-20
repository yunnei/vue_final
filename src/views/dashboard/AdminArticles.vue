<template>
  <div class="container py-4">
    <h2>貼文</h2>
    <div class="text-end">
      <button class="btn btn-primary" type="button" @click="openModal('new')">
        + 新增貼文
      </button>
    </div>
    <div class="row row-cols-3 g-2 my-3">
      <div v-for="article in articles" :key="article.id" class="col">
        <div class="card p-0 h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="mb-4">
              <div
                class="d-flex justify-content-between align-items-center mb-1"
              >
                <h5 class="card-title fw-bold">{{ article.title }}</h5>
                <span class="fs-6 fw-normal text-muted">
                  {{ new Date(article.create_at * 1000).toLocaleDateString() }}
                </span>
              </div>
              <p class="card-text card-truncate">
                {{ article.description }}
              </p>
            </div>
            <div class="d-flex justify-content-between align-items-end">
              <div>
                <span class="text-success fw-bold" v-if="article.isPublic">
                  已發布<i class="bi bi-check"></i>
                </span>
                <span class="text-muted" v-else>未發布</span>
              </div>
              <div>
                <button
                  class="btn btn-primary me-1"
                  type="button"
                  @click="getArticle(article.id)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-danger"
                  type="button"
                  @click="openModal('del', article)"
                >
                  刪除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pagination="pagination" @get-data="getArticles" />
    <ArticleModal
      :article="articleTemp"
      :is-new="isNew"
      @update-article="updateArticle"
      ref="articleModal"
    />
    <DelModal
      ref="delModal"
      :item="articleTemp"
      @del-item="delArticle(articleTemp)"
    />
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
import DelModal from "@/components/DelModal.vue";
import Pagination from "@/components/PaginationComponent.vue";
import ArticleModal from "@/components/ArticleModal.vue";

export default {
  components: {
    DelModal,
    Pagination,
    ArticleModal,
  },
  data() {
    return {
      articles: [],
      pagination: {},
      isNew: false,
      articleTemp: {
        tag: [],
      },
      create_date: "",
      articleModal: {},
      delModal: {},
    };
  },
  methods: {
    openModal(status, article) {
      if (status === "new") {
        this.isNew = true;
        this.articleTemp = {
          create_at: new Date().getTime() / 1000,
          isPublic: false,
          tag: [],
        };
        this.articleModal.show();
      } else if (status === "edit") {
        this.isNew = false;
        this.articleTemp = { ...article };
        this.articleModal.show();
      } else if (status === "del") {
        this.articleTemp = { ...article };
        this.delModal.show();
      }
    },
    getArticles(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    getArticle(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.openModal("edit", res.data.article);
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    updateArticle() {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.articleTemp.id}`;
      let http = "put";
      let msg = `新增 ${this.articleTemp.title}`;
      if (this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
        http = "post";
        msg = `更新 ${this.articleTemp.title}`;
      }
      const data = { data: this.articleTemp };
      this.$http[http](url, data)
        .then((res) => {
          this.$httpMessageState(res, msg);
          this.getArticles();
          this.articleModal.hide();
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    delArticle(article) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${article.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$httpMessageState(res, `刪除 ${this.articleTemp.title}`);
          this.getArticles(this.pagination.current_page);
          this.delModal.hide();
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
  },
  mounted() {
    this.articleModal = new Modal(this.$refs.articleModal.modal);
    this.delModal = new Modal(this.$refs.delModal.modal);
    this.getArticles();
  },
};
</script>

<style>
.card-truncate {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
}
</style>
