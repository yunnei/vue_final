<template>
  <v-loading :active="isLoading" loader="dots" :z-index="1000"></v-loading>
  <div class="container">
    <!-- step -->
    <div class="d-flex justify-content-center text-center pt-4">
      <div class="step-1 d-flex flex-column align-items-center p-4">
        <div class="step-num bg-dark text-white border border-dark border-3">
          1
        </div>
        <p class="text-muted mt-2">建立訂單</p>
      </div>
      <div
        class="d-flex flex-column align-items-center p-4"
        :class="order.is_paid ? 'step-1' : 'step-2'"
      >
        <div
          class="step-num bg-dark text-white border border-3"
          :class="order.is_paid ? 'border-dark' : 'border-secondary'"
        >
          2
        </div>
        <p class="text-muted mt-2">確認結帳</p>
      </div>
      <div class="d-flex flex-column align-items-center p-4">
        <div
          class="step-num bg-secondary border border-secondary border-3"
          :class="
            order.is_paid ? 'bg-dark text-white' : 'bg-secondary text-dark'
          "
        >
          3
        </div>
        <p class="text-muted mt-2">完成訂單</p>
      </div>
    </div>
    <div class="row">
      <!-- 確認訂單 -->
      <div class="col-md-8 p-4">
        <div class="p-4">
          <h2 class="fs-4 mb-4">訂購內容</h2>
          <table class="table align-middle">
            <thead>
              <tr>
                <th>商品內容</th>
                <th class="d-none d-md-table-cell text-end" width="20%">
                  單價
                </th>
                <th class="d-none d-md-table-cell text-center" width="20%">
                  數量
                </th>
                <th class="d-none d-md-table-cell text-end" width="20%">
                  金額
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="d-flex align-items-center">
                  <img
                    :src="item.product.imageUrl"
                    :alt="item.product.title"
                    style="width: 36%"
                  />
                  <div class="ms-3">
                    <div class="mb-2">{{ item.product.title }}</div>
                    <div class="d-md-none">
                      <div class="mb-2 fw-bold">$ {{ item.product.price }}</div>
                      <span class="text-start" type="number">
                        數量：{{ item.qty }}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="d-none d-md-table-cell text-end">
                  $ {{ item.product.price }}
                </td>
                <td class="d-none d-md-table-cell text-center">
                  <span class="text-center" type="number">
                    {{ item.qty }}
                  </span>
                </td>
                <td class="d-none d-md-table-cell text-end">
                  $ {{ item.total }}
                </td>
              </tr>
            </tbody>
          </table>
          <p class="fs-5 fw-bold text-end">
            總金額：$ {{ parseInt(order.total) }}
          </p>
        </div>
      </div>
      <!-- 資料確認 -->
      <div class="col-md-4 my-md-4 p-4 bg-secondary shadow-sm my-4">
        <h2 class="fs-4 mb-3">訂單資訊</h2>
        <ul class="list-unstyled mb-4">
          <li class="row mb-1">
            <span class="col-4">訂購時間：</span>
            {{ new Date(order.create_at * 1000).toLocaleDateString() }}
          </li>
          <li class="row mb-1">
            <span class="col-4">訂單編號：</span>{{ order.id }}
          </li>
          <li class="row d-flex mb-1 align-items-center">
            <span class="col-4">付款狀態：</span>
            <span
              class="col p-0 text-success fw-bold fs-5"
              v-if="order.is_paid"
            >
              已完成付款
            </span>
            <span class="col p-0 text-danger fw-bold fs-5" v-else>
              尚需付款 $ {{ parseInt(order.total) }}
            </span>
          </li>
        </ul>
        <ul class="list-unstyled mb-4">
          <h2 class="fs-4 mb-3">收件人資料</h2>
          <li class="row mb-1">
            <span class="col-4">姓名：</span>{{ order.user.name }}
          </li>
          <li class="row mb-1">
            <span class="col-4">Email：</span>{{ order.user.email }}
          </li>
          <li class="row mb-1">
            <span class="col-4">電話：</span>{{ order.user.tel }}
          </li>
          <li class="row mb-1">
            <span class="col-4">地址：</span>{{ order.user.address }}
          </li>
          <li class="row">
            <span class="col-4">留言：</span>
            <span class="col p-0" v-if="order.message">
              {{ order.message }}
            </span>
            <span class="col p-0" v-else>無</span>
          </li>
        </ul>
        <template v-if="!order.is_paid">
          <button class="btn btn-dark w-100" type="button" @click="payOrder">
            馬上付款
          </button>
        </template>
        <template v-else>
          <button
            class="btn btn-dark w-100"
            type="button"
            @click="payOrder"
            disabled
          >
            非常感謝您的支持！
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: {},
      isLoading: true,
    };
  },
  methods: {
    getOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.order = res.data.order;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    payOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.$http
        .post(url)
        .then((res) => {
          this.$httpMessageState(res, `付款`);
          this.getOrder();
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
  },
  mounted() {
    this.orderId = this.$route.params.id;
    this.getOrder();
  },
};
</script>
