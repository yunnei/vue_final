<template>
  <v-loading :active="isLoading" loader="dots" :z-index="1000"></v-loading>
  <div class="container">
    <div class="row my-4 d-flex align-items-center justify-content-around">
      <div class="col-md-5 my-4 text-end">
        <img class="img-fluid" :src="product.imageUrl" :alt="product.id" />
      </div>
      <div class="col-md-5 my-4">
        <h2>{{ product.title }}</h2>
        <div v-html="product.description" class="mt-4"></div>
        <p>內容：{{ product.content }}</p>
        <p v-if="product.price === product.origin_price" class="text-dark fs-3">
          $ {{ product.price }}
        </p>
        <p v-else class="text-danger fw-bold fs-3">
          $ {{ product.price }}
          <del class="text-muted fw-normal fs-5">
            $ {{ product.origin_price }}
          </del>
        </p>
        <div class="d-md-flex">
          <input
            class="col form-control me-2"
            type="number"
            min="1"
            v-model="qty"
          />
          <button
            class="btn btn-dark my-2 my-md-0"
            type="button"
            @click="addToCart(product)"
            :disabled="btnLoading"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "@/utils/emitter";

export default {
  data() {
    return {
      id: "",
      qty: 1,
      product: {},
      isLoading: true,
      btnLoading: false,
    };
  },
  methods: {
    getProduct() {
      this.id = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.product = res.data.product;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    addToCart(product) {
      const data = {
        data: {
          product_id: product.id,
          qty: this.qty,
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
    this.getProduct();
  },
};
</script>
