<template>
  <v-loading :active="isLoading" loader="dots" :z-index="1000"></v-loading>
  <div class="container">
    <div class="row my-4">
      <div class="col-lg-2">
        <div class="text-center my-4">
          <img
            class="img-fluid"
            src="@/assets/images/daoru-logo.png"
            alt="daoru logo"
            style="width: 140px"
          />
        </div>
        <div
          class="text-center d-sm-flex flex-lg-column flex-row justify-content-center d-none"
        >
          <button
            type="button"
            class="btn btn-outline-dark px-4 m-2"
            aria-current="true"
            @click="getProducts('全部')"
          >
            全部
          </button>
          <button
            type="button"
            class="btn btn-outline-dark px-4 m-2"
            @click="getProducts('日式刨冰')"
          >
            日式刨冰
          </button>
          <button
            type="button"
            class="btn btn-outline-dark px-4 mx-2 m-2"
            @click="getProducts('飲品')"
          >
            飲品
          </button>
          <button
            type="button"
            class="btn btn-outline-dark px-4 mx-2 m-2"
            @click="getProducts('甜點')"
          >
            甜點
          </button>
        </div>
      </div>
      <!-- menu -->
      <div class="col-lg-10 my-4 d-flex flex-column align-items-md-center">
        <h2 class="text-center my-4">
          本季菜單<br />
          <span class="text-primary fs-6">— {{ categoryMsg }} —</span>
        </h2>
        <div class="d-sm-none">
          <select
            class="form-select form-select-sm"
            @change="getProducts(this.$refs.menuCategory.value)"
            ref="menuCategory"
          >
            <option value="全部" selected>全部</option>
            <option value="日式刨冰">日式刨冰</option>
            <option value="飲品">飲品</option>
            <option value="甜點">甜點</option>
          </select>
        </div>
        <div class="col-md-10 p-2">
          <div v-for="product in products" :key="product.id">
            <a
              class="menu text-dark fs-5 d-block p-3"
              :class="product.imageUrl ? 'menu-detail' : ''"
              data-bs-toggle="collapse"
              :href="`#${product.id}`"
              role="button"
              aria-expanded="false"
            >
              <div class="row d-flex align-items-center">
                <div class="col-8 col-xl-10">
                  <div class="d-sm-block d-flex flex-column">
                    <span class="fw-bold">{{ product.title }}</span>
                    <span
                      v-if="product.notes"
                      class="fs-6 text-primary ps-sm-2"
                    >
                      {{ product.notes }}
                    </span>
                  </div>
                  <div class="fs-6 text-dark">{{ product.content }}</div>
                </div>
                <div class="col-4 col-xl-2 text-end">
                  <span v-if="product.price_large">
                    大 ${{ product.price_large }}<br />
                  </span>
                  <span v-if="product.price_large">小</span> ${{
                    product.price
                  }}
                </div>
              </div>
            </a>
            <!-- collapse content -->
            <div v-if="product.imageUrl" class="collapse" :id="product.id">
              <div class="card card-body position-relative border-0">
                <div class="row d-flex align-items-center">
                  <div class="col-lg-6 mb-3 mb-lg-0">
                    <img
                      class="img-fluid"
                      :src="product.imageUrl"
                      :alt="product.title"
                    />
                  </div>
                  <div
                    v-html="product.description"
                    class="description col-lg-6 text-dark"
                  ></div>
                  <a
                    class="text-dark fs-5 text-end position-absolute bottom-0"
                    data-bs-toggle="collapse"
                    :href="`#${product.id}`"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <i class="bi bi-arrow-bar-up"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      categoryMsg: "",
      isLoading: true,
    };
  },
  methods: {
    getProducts(category = "全部") {
      this.categoryMsg = category;
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}`;
      if (category === "全部") {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      }
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          const menuProducts = res.data.products.filter(
            (item) => item.category !== "宅配"
          );
          this.products = menuProducts.sort(
            (a, b) => a.menu_sort - b.menu_sort
          );
          this.isLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
