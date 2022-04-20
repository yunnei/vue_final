<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <div class="container">
      <router-link to="/" class="navbar-brand position-absolute start-50 top-0">
        <img
          src="@\assets\images\daoru-logo02.png"
          alt="daoru logo"
          height="56"
        />
      </router-link>
      <button
        class="navbar-toggler border-0"
        type="button"
        @click="toggleNavbarMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav" ref="navbarMenu">
        <ul class="navbar-nav ps-3">
          <li class="nav-item pt-lg-0 pt-3" @click="hideNavbarMenu">
            <router-link to="/" class="nav-link">首頁</router-link>
          </li>
          <li class="nav-item" @click="hideNavbarMenu">
            <router-link to="/menu" class="nav-link">本季菜單</router-link>
          </li>
          <li class="nav-item" @click="hideNavbarMenu">
            <router-link to="/products" class="nav-link">宅配專區</router-link>
          </li>
          <li class="nav-item" @click="hideNavbarMenu">
            <router-link to="/news" class="nav-link">最新消息</router-link>
          </li>
        </ul>
      </div>
      <!-- 購物車 -->
      <CartDropdownMenu class="cart-btn" />
    </div>
  </nav>
</template>

<script>
import CartDropdownMenu from "@/components/CartDropdownMenu.vue";
import Collapse from "bootstrap/js/dist/collapse";

export default {
  components: {
    CartDropdownMenu,
  },
  data() {
    return {
      navbarMenu: {},
    };
  },
  methods: {
    toggleNavbarMenu() {
      this.navbarMenu.toggle();
    },
    hideNavbarMenu() {
      this.navbarMenu.hide();
    },
  },
  mounted() {
    this.navbarMenu = new Collapse(this.$refs.navbarMenu, {
      toggle: false,
    });
  },
};
</script>
<style>
.navbar-brand {
  transform: translate(-50%);
}
@media (max-width: 991px) {
  .cart-btn {
    position: absolute;
    right: 18px;
    top: 1rem;
  }
}
</style>
