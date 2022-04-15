<template>
  <Loading :active="isLoading" loader="dots" :z-index="1000" />
  <div class="container">
    <div class="my-4">
      <h2 class="text-center my-4">
        本季菜單<br />
        <span class="text-primary fs-6">— 歡迎來店品嚐 —</span>
      </h2>
      <div class="fs-3 menu-category">
        <img
          class="me-2"
          src="@/assets/images/shaved-ice.png"
          alt="product.title"
        />
        <span>日式刨冰</span>
      </div>
      <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1 gy-5 mb-5">
        <div
          v-for="product in iceProducts"
          :key="product.id"
          class="col card border-0 menu-card"
        >
          <img :src="product.imageUrl" class="card-img-top" alt="" />
          <div class="menu-card-body">
            <p class="fs-4 fw-bold card-text m-0">《 {{ product.title }} 》</p>
            <p class="ps-3 menu-card-content mb-1">{{ product.content }}</p>
            <p class="fs-5 ps-3 mb-0 menu-card-price">
              <span v-if="product.price_large">
                <span class="me-3">大 ${{ product.price_large }}</span>
                小
              </span>
              ${{ product.price }}
            </p>
            <router-link :to="`/product/${product.id}`">
              <button class="btn btn-sm btn-outline-dark" type="button">
                更多細節
              </button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="row row-cols-md-2 row-cols-1 gy-4 mb-5">
        <div class="col">
          <div class="fs-3 menu-category">
            <img class="me-2" src="@/assets/images/shaved-ice.png" alt="" />
            <span>飲品</span>
          </div>
          <div
            class="px-3 d-lg-flex justify-content-between align-items-center"
            v-for="product in baverageProducts"
            :key="product.id"
          >
            <div>
              <span class="fs-5 fw-bold text-dark me-1">{{
                product.title
              }}</span>
              <span class="fs-6 text-primary">{{ product.notes }}</span>
              <p class="fs-6 text-primary mb-0">{{ product.content }}</p>
            </div>
            <p class="fs-5 text-dark">$ {{ product.price }}</p>
          </div>
        </div>
        <div class="col">
          <div class="fs-3 menu-category">
            <img
              class="me-2"
              src="@/assets/images/shaved-ice.png"
              alt="shaved ice"
            />
            <span>甜點</span>
          </div>
          <div
            class="px-3 d-lg-flex justify-content-between align-items-center"
            v-for="product in dessertProducts"
            :key="product.id"
          >
            <div>
              <span class="fs-5 fw-bold text-dark me-1">
                {{ product.title }}
              </span>
              <span class="fs-6 text-primary">{{ product.notes }}</span>
              <p class="fs-6 mb-0 text-primary">{{ product.content }}</p>
            </div>
            <p class="fs-5 text-dark">$ {{ product.price }}</p>
          </div>
          <div
            class="px-3 d-lg-flex justify-content-between align-items-center"
          >
            <div>
              <span class="fs-5 fw-bold text-dark me-1">限定手做蛋糕</span>
              <p class="fs-6 text-primary">每週公告於粉絲專業</p>
            </div>
            <p class="fs-5 text-dark">$ 時價</p>
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
      iceProducts: [],
      baverageProducts: [],
      dessertProducts: [],
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
          this.iceProducts = this.categoryFilter(res, "日式刨冰");
          this.baverageProducts = this.categoryFilter(res, "飲品");
          this.dessertProducts = this.categoryFilter(res, "甜點");
          this.isLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    categoryFilter(res, category) {
      const menuProducts = res.data.products.filter(
        (item) => item.category === category
      );
      return menuProducts.sort((a, b) => a.menu_sort - b.menu_sort);
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style>
.menu-category {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 2px solid #70502a;
  margin-bottom: 1rem;
  width: 300px;
}
.menu-card-body {
  position: absolute;
  left: 0.2rem;
  bottom: -0.5rem;
  background: rgba(86, 181, 194, 0.7);
  color: #fff;
  width: 68%;
  height: 20%;
  padding: 0.2rem;
  transition: 0.4s linear;
  overflow: hidden;
}
.menu-card-content {
  display: none;
  margin-top: 1rem;
}
.menu-card .btn {
  display: none;
  position: absolute;
  bottom: -2rem;
}
.menu-card:hover {
  cursor: pointer;
}
.menu-card:hover .menu-card-content {
  display: block;
  transition: 0.4s linear;
}
.menu-card:hover .menu-card-body {
  background: rgb(236, 230, 219, 0.9);
  color: #70502a;
  width: 94%;
  height: 52%;
  transition: 0.4s linear;
}
.menu-card:hover .menu-card-price {
  font-weight: bold;
  position: absolute;
  bottom: 0.5rem;
}
.menu-card:hover .btn {
  display: block;
  bottom: 0.5rem;
  right: 1rem;
}
</style>
