<template>
  <div
    class="container-fluid d-flex justify-content-center align-items-center bg-secondary min-vh-100"
  >
    <div
      class="text-center border p-5 d-flex flex-column align-items-center bg-primary"
    >
      <h1 class="mb-4 border-bottom border-dark">登入</h1>
      <div>
        <form @submit.prevent="login" class="mb-5">
          <div class="form-floating mb-3">
            <input
              v-model="user.username"
              type="email"
              id="username"
              class="form-control"
              placeholder="user@example.com"
              required
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              v-model="user.password"
              type="password"
              id="password"
              class="form-control"
              placeholder="password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button type="submit" class="btn btn-dark w-100">登入</button>
        </form>
      </div>
      <p class="text-muted">&copy; 2021~∞ - 島入冰店</p>
    </div>
    <!-- <div class="login text-center">
      <h1 class="mb-4 border-bottom border-dark">登入</h1>
      <form @submit.prevent="login" class="d-flex flex-column">
        <div class="form-floating mb-3">
          <input
            v-model="user.username"
            type="email"
            id="username"
            class="form-control"
            placeholder="user@example.com"
            required
          />
          <label for="username">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input
            v-model="user.password"
            type="password"
            id="password"
            class="form-control"
            placeholder="password"
            required
          />
          <label for="password">Password</label>
        </div>
        <button type="submit" class="btn btn-warning w-100">登入</button>
      </form>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const url = `${process.env.VUE_APP_API}/admin/signin`;
      this.$http
        .post(url, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hextoken=${token}; expires=${new Date(expired)};`;
          this.$router.push("/admin");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
