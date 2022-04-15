<template>
  <Loading :active="isLoading" loader="dots" :z-index="1000" />
  <div class="container">
    <div class="my-4">
      <h2 class="text-center my-4">
        宅配專區<br />
        <span class="text-primary fs-6">— 手工製作 低鹽健康 —</span>
      </h2>
      <div class="row">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-md-6 col-lg-3 mt-2"
        >
          <div class="card border-gray text-center h-100">
            <router-link class="image" :to="`/product/${product.id}`">
              <img
                :src="product.imageUrl"
                class="card-img-top"
                :alt="product.title"
              />
              <button class="btn btn-dark" type="button">更多細節</button>
            </router-link>
            <div
              class="card-body px-1 d-flex flex-column justify-content-between"
            >
              <h5 class="card-title">
                <router-link
                  class="text-dark"
                  :to="{
                    path: `/product/${product.id}`,
                  }"
                >
                  {{ product.title }}
                </router-link>
              </h5>
              <div>
                <p
                  v-if="product.price === product.origin_price"
                  class="card-text fs-5 fw-bold text-dark mx-2"
                >
                  $ {{ product.price }}
                </p>
                <p v-else class="card-text fw-bold text-danger fs-4">
                  $ {{ product.price }}
                  <del class="text-muted fw-normal fs-5">
                    $ {{ product.origin_price }}
                  </del>
                </p>
                <button
                  type="button"
                  class="btn btn-outline-dark mx-2"
                  @click="addToCart(product)"
                  :disabled="btnLoading"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-secondary text-center">
      <h5 class="fs-5 fw-bold mb-4 bg-dark text-white py-2 rounded-top">
        配送須知 / 風險承擔
      </h5>
      <p class="lh-lg text-dark pb-4">
        軟綿綿的豆腐乳於玻璃罐中很嬌弱，<br />
        因運送時難免碰撞或嚴重搖晃，<br />
        可能導致豆腐乳無法維持完整的型態<br />
        並不影響風味及食用，無法因此退貨，<br />
        介意者可親至我方門市選購。
      </p>
    </div>
  </div>
</template>

<script>
import emitter from "@/utils/emitter";

export default {
  data() {
    return {
      products: [],
      isLoading: true,
      btnLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}&category=宅配`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    addToCart(product, qty = 1) {
      const data = {
        data: {
          product_id: product.id,
          qty: qty,
        },
      };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.btnLoading = true;
      this.$http
        .post(url, data)
        .then((res) => {
          this.$httpMessageState(res, `將 ${product.title} 加入購物車`);
          emitter.emit("get-cart");
          this.btnLoading = false;
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
