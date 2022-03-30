<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <div class="container container-fluid">
      <router-link to="/" class="navbar-brand position-absolute start-50">
        <img
          src="@\assets\images\daoru-logo02.png"
          alt="daoru logo"
          height="56"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/menu" class="nav-link">本季菜單</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">宅配專區</router-link>
          </li>
        </ul>
      </div>
      <!-- 購物車 -->
      <cart-dropdown-menu></cart-dropdown-menu>
    </div>
  </nav>
</template>

<script>
import CartDropdownMenu from "@/components/CartDropdownMenu.vue";

export default {
  components: {
    CartDropdownMenu,
  },
};
</script>
<style>
.navbar-brand {
  transform: translate(-50%);
}
.dropdown-menu {
  min-width: 400px;
  max-height: 80vh;
}
</style>
