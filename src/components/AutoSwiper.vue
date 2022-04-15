<template>
  <template v-if="products.length > 3">
    <swiper
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :breakpoints="{
        '@0.00': {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        '@0.75': {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        '@1.25': {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }"
      :loop="true"
      :modules="modules"
      class="autoSwiper"
    >
      <swiper-slide
        class="d-flex flex-column text-dark swiper-card mb-2"
        v-for="product in products"
        :key="product.id"
        @click="getProducts"
      >
        <router-link :to="`/product/${product.id}`">
          <img class="mb-2" :src="product.imageUrl" />
          <button class="btn btn-dark btn-sm" type="button">更多細節</button>
          <p class="fs-5 fw-bold mb-2">《 {{ product.title }} 》</p>
          <p>
            <span v-if="product.price_large">
              <span class="me-3">大 ${{ product.price_large }}</span>
              小
            </span>
            ${{ product.price }}
          </p>
        </router-link>
      </swiper-slide>
    </swiper>
  </template>
  <template v-else>
    <swiper
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :breakpoints="{
        '@0.00': {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        '@0.75': {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        '@1.25': {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }"
      :modules="modules"
      class="autoSwiper"
    >
      <swiper-slide
        class="d-flex flex-column text-dark swiper-card mb-2"
        v-for="product in products"
        :key="product.id"
        @click="getProducts"
      >
        <router-link :to="`/product/${product.id}`">
          <img class="mb-2" :src="product.imageUrl" />
          <button class="btn btn-dark btn-sm" type="button">更多細節</button>
          <p class="fs-5 fw-bold mb-2">《 {{ product.title }} 》</p>
          <p>
            <span v-if="product.price_large">
              <span class="me-3">大 ${{ product.price_large }}</span>
              小
            </span>
            ${{ product.price }}
          </p>
        </router-link>
      </swiper-slide>
    </swiper>
  </template>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import { Autoplay } from "swiper";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["products"],
  data() {
    return {
      modules: [Autoplay],
    };
  },
  methods: {
    getProducts() {
      this.$emit("get-products");
    },
  },
};
</script>

<style>
.autoSwiper {
  height: auto;
}
.swiper-card .btn {
  position: absolute;
  top: 72%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
.swiper-card a {
  color: #70502a;
}
.swiper-card:hover {
  box-shadow: 0 0.125rem 0.25rem rgba(184, 184, 184, 0.5);
  background: #ece6db;
  transition: 0.4s linear;
}
.swiper-card:hover img {
  opacity: 0.6;
  transition: 0.4s linear;
}
.swiper-card:hover .btn {
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.4s linear;
  opacity: 1;
}
</style>
