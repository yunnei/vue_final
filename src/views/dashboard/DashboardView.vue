<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-0">
    <div class="container">
      <router-link to="/admin" class="navbar-brand">
        <img
          src="@\assets\images\daoru-logo00.png"
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
            <router-link to="/admin" class="nav-link">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link">
              訂單管理
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupons" class="nav-link">
              優惠券
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/articles" class="nav-link">
              貼文
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <ToastMessage />
  <RouterView v-if="loginStatus" />
</template>

<script>
import ToastMessage from "@/components/ToastMessage.vue";

export default {
  components: {
    ToastMessage,
  },
  data() {
    return {
      loginStatus: false,
    };
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        const url = `${process.env.VUE_APP_API}/api/user/check`;
        this.$http
          .post(url)
          .then(() => {
            this.loginStatus = true;
          })
          .catch((error) => {
            alert(error.response.data.message);
            this.$router.push("/login");
          });
      } else {
        alert("請先登入");
        this.$router.push("/login");
      }
    },
    logout() {
      const url = `${process.env.VUE_APP_API}/logout`;
      this.$http
        .post(url)
        .then((res) => {
          this.$router.push("/");
          alert(res.data.message);
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
