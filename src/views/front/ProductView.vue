<template>
  <Loading :active="isLoading" loader="dots" :z-index="1000" />
  <div class="product container">
    <div class="row d-flex justify-content-center">
      <div class="col-lg-4 col-md-6 my-4 mx-lg-2 text-center">
        <ProductSwiper :product="product" />
      </div>
      <div
        class="col-md-6 col-11 my-4 mx-lg-2 d-flex flex-column justify-content-between"
      >
        <div>
          <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">首頁</a></li>
              <li v-if="product.category === '宅配'" class="breadcrumb-item">
                <a href="#/products">宅配專區</a>
              </li>
              <li v-else class="breadcrumb-item">
                <a href="#/menu">本季菜單</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ product.title }}
              </li>
            </ol>
          </nav>
          <h2 class="mb-2 mb-lg-4">{{ product.title }}</h2>
          <span class="mb-0 product-content-title">介紹</span>
          <p class="mb-2 mb-lg-4" v-html="product.description"></p>
          <span class="mb-0 product-content-title">內容</span>
          <p>{{ product.content }}</p>
        </div>
        <div v-if="product.category === '宅配'">
          <p
            v-if="product.price === product.origin_price"
            class="text-dark fs-3"
          >
            $ {{ product.price }}
          </p>
          <p v-else class="text-danger fw-bold fs-3">
            $ {{ product.price }}
            <del class="text-muted fw-normal fs-5">
              $ {{ product.origin_price }}
            </del>
          </p>
          <div class="d-md-flex pb-2">
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
        <div v-else class="text-dark fw-bold fs-4 pb-2">
          <span v-if="product.price_large">
            <span class="me-3">大 ${{ product.price_large }}</span>
            小
          </span>
          ${{ product.price }}
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid bg-secondary">
    <div
      class="container p-4 text-dark d-flex flex-column justify-content-center align-items-center"
    >
      <template v-if="product.category !== '宅配'">
        <h5 class="fs-5 fw-bold ms-lg-2 mb-4 pb-1 border-bottom border-dark">
          島入入島守則
        </h5>
        <ul>
          <li class="mb-2">
            每人低消為任一品項餐點，45 元起，或兩人共食一份大碗冰品。
          </li>
          <li class="mb-2">
            冰品建議拍是時間為 3
            分鐘，融化會影響風味跟口感，闆娘會很傷心！很傷心！
          </li>
          <li class="mb-2">
            日式刨冰一碗碗現做現出，如有拍攝需要，需多晚同時出冰，請先告知。
          </li>
          <li class="mb-2">如欲滿座有人候位時，用餐時限為 50 分鐘。</li>
          <li class="mb-2">外帶時請將垃圾帶走，感謝您的貼心！</li>
          <li class="mb-2">外帶可先來電預約，節省您的寶貴時間。</li>
          <li class="mb-2">周邊紅線為汽車重點拖吊區，停車位置請洽櫃台。</li>
        </ul>
      </template>
      <template v-else>
        <h5 class="fs-5 fw-bold ms-lg-2 mb-4 pb-1 border-bottom border-dark">
          島入好吃秘訣
        </h5>
        <p class="col-lg-6">
          古法製作，選用「非基因改造」黃豆為原料的手工豆腐，以天然菌種釀造而成，絕不含人工添加物、防腐劑及香料。
        </p>
        <p class="col-lg-6">
          每罐豆腐乳皆純手工製作，用最天然純粹的好原料，做出低鹽健康、甘醇味美的優質產品，與一般市售高糖、高鹽及人工添加物的產品風味截然不同，值得您細細品味。
        </p>
        <p class="col-lg-6">
          因豆腐乳售出時仍處於持續發酵階段，在活菌作用下，色澤及酒香氣會漸漸加深，並產生氣體，屬於自然現象，請安心食用
        </p>
      </template>
    </div>
  </div>
  <div class="container p-4">
    <h4 class="fs-4 text-dark fw-bold ms-lg-2 mb-4">您可能感興趣的餐點</h4>
    <AutoSwiper
      class="px-2"
      :products="categoryProducts"
      @get-products="getProduct"
    />
  </div>
</template>

<script>
import emitter from "@/utils/emitter";
import ProductSwiper from "@/components/ProductSwiper.vue";
import AutoSwiper from "@/components/AutoSwiper.vue";

export default {
  components: {
    ProductSwiper,
    AutoSwiper,
  },
  data() {
    return {
      id: "",
      qty: 1,
      product: {},
      isLoading: true,
      btnLoading: false,
      products: [],
      categoryProducts: [],
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
          this.getProducts();
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
    getProducts() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.getCategoryProducts();
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    getCategoryProducts() {
      const { category, id } = this.product;
      this.categoryProducts = this.products.filter(
        (item) => item.category === category && item.id != id
      );
      console.log(this.categoryProducts);
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style>
.product p {
  margin-bottom: 0.25rem;
}
.product-content-title {
  position: relative;
}
.product-content-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0.2rem;
  height: 0.4rem;
  width: 100%;
  background: rgba(86, 181, 194, 0.2);
}
</style>
