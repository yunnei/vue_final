<template>
  <Loading :active="isLoading" :opacity="0.8" :z-index="1000">
    <Loader></Loader>
  </Loading>
  <div class="container">
    <template v-if="cart.carts.length">
      <div class="d-flex justify-content-center text-center pt-4">
        <div class="step d-flex flex-column align-items-center p-4">
          <div
            class="step-num bg-dark text-white border border-secondary border-3"
          >
            1
          </div>
          <p class="text-muted mt-2">建立訂單</p>
        </div>
        <div class="step d-flex flex-column align-items-center p-4">
          <div
            class="step-num bg-secondary text-dark border border-secondary border-3"
          >
            2
          </div>
          <p class="text-muted mt-2">確認結帳</p>
        </div>
        <div class="d-flex flex-column align-items-center p-4">
          <div
            class="step-num bg-secondary text-dark border border-secondary border-3"
          >
            3
          </div>
          <p class="text-muted mt-2">完成訂單</p>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-8 p-4">
          <div class="p-4">
            <h2 class="fs-4 mb-4">確認訂單內容</h2>
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>商品內容</th>
                  <th class="d-none d-md-table-cell text-end" width="16%">
                    單價
                  </th>
                  <th class="d-none d-md-table-cell text-center" width="24%">
                    數量
                  </th>
                  <th class="d-none d-md-table-cell text-end" width="16%">
                    金額
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="d-flex align-items-center">
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                      class="w-36"
                    />
                    <div class="ms-3">
                      <div class="mb-2">{{ item.product.title }}</div>
                      <div class="d-md-none">
                        <div class="mb-2 fw-bold">
                          $ {{ item.product.price }}
                        </div>
                        <div class="d-flex">
                          <button
                            class="btn btn-sm btn-outline-dark"
                            type="button"
                            @click="modifyQty('sub', item)"
                          >
                            <i class="bi bi-dash"></i>
                          </button>
                          <input
                            type="text"
                            class="form-control form-control-sm text-center border-dark w-25"
                            v-model.number="item.qty"
                            @change="modifyQty('change', item)"
                          />
                          <button
                            class="btn btn-sm btn-outline-dark"
                            type="button"
                            @click="modifyQty('add', item)"
                          >
                            <i class="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="d-none d-md-table-cell text-end">
                    $ {{ item.product.price }}
                  </td>
                  <td class="d-none d-md-table-cell text-center">
                    <div class="d-md-flex p-4">
                      <div class="input-group mb-3">
                        <button
                          class="btn btn-sm btn-outline-dark"
                          type="button"
                          @click="modifyQty('sub', item)"
                        >
                          <i class="bi bi-dash"></i>
                        </button>
                        <input
                          type="number"
                          class="form-control form-control-sm text-center border-dark"
                          v-model.number="item.qty"
                          @change="modifyQty('change', item)"
                          @onkeyup="inputLimit(item.qty)"
                        />
                        <button
                          class="btn btn-sm btn-outline-dark"
                          type="button"
                          @click="modifyQty('add', item)"
                        >
                          <i class="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td class="d-none d-md-table-cell text-end">
                    $ {{ item.total }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row flex-sm-row align-items-center flex-column-reverse">
              <div class="col-md-6">
                <div class="input-group mb-3 d-flex align-items-center">
                  <input
                    type="text"
                    class="form-control me-2"
                    :placeholder="
                      cart.final_total === cart.total
                        ? '請輸入優惠券代號'
                        : '已成功使用優惠券'
                    "
                    v-model="coupon"
                  />
                  <button class="btn btn-dark" type="button" @click="useCoupon">
                    使用優惠券
                  </button>
                </div>
              </div>
              <div class="col-md-6">
                <p
                  v-if="cart.final_total === cart.total"
                  class="fs-5 fw-bold text-end"
                >
                  總金額：$ {{ cart.total }}
                </p>
                <p v-else class="fs-5 fw-bold text-end text-success">
                  <span class="text-muted fw-normal">
                    <s>總金額：$ {{ cart.total }} </s>
                  </span>
                  <br />
                  折扣後金額：$ {{ parseInt(cart.final_total) }}
                </p>
              </div>
            </div>
            <span v-if="cart.final_total === cart.total" class="text-muted">
              （可使用優惠券：冰友順啦）
            </span>
          </div>
        </div>
        <div class="col-xl-4 my-4 p-4 bg-secondary">
          <div class="p-xl-0 p-4">
            <h2 class="fs-4 mb-4">填寫收件人資料</h2>
            <Form v-slot="{ errors }" @submit="createOrder">
              <div class="mb-3">
                <label for="name" class="form-label">
                  姓名 <span class="text-danger">*</span>
                </label>
                <Field
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="請輸入姓名"
                  v-model="form.user.name"
                  name="姓名"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  rules="required"
                ></Field>
                <error-message
                  name="姓名"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email <span class="text-danger">*</span>
                </label>
                <Field
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="example@email.com"
                  v-model="form.user.email"
                  name="email"
                  :class="{ 'is-invalid': errors['email'] }"
                  rules="email|required"
                ></Field>
                <error-message
                  name="email"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="mb-3">
                <label for="tel" class="form-label">
                  電話 <span class="text-danger">*</span>
                </label>
                <Field
                  type="text"
                  class="form-control"
                  id="tel"
                  placeholder="09xxxxxxxx"
                  v-model="form.user.tel"
                  name="電話"
                  :class="{ 'is-invalid': errors['電話'] }"
                  :rules="isPhone"
                ></Field>
                <error-message
                  name="電話"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">
                  地址 <span class="text-danger">*</span>
                </label>
                <Field
                  type="text"
                  class="form-control"
                  id="address"
                  placeholder="請輸入地址"
                  v-model="form.user.address"
                  name="地址"
                  :class="{ 'is-invalid': errors['地址'] }"
                  rules="required"
                ></Field>
                <error-message
                  name="地址"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="message"
                  rows="4"
                  placeholder="請輸入想說的話"
                  v-model="form.message"
                />
              </div>
              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-dark w-100"
                  :disabled="Object.keys(errors).length > 0"
                >
                  送出訂單
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class="d-flex flex-column justify-content-center align-items-center text-center min-vh-50"
      >
        <p class="text-dark">
          <i class="bi bi-exclamation-circle"></i> 購物車內沒有商品
        </p>
        <a href="#/products" class="btn btn-dark mb-2" type="button">
          前往購物
        </a>
      </div>
    </template>
    <DelModal :item="itemTemp" @del-item="delItem" ref="delModal" />
  </div>
</template>

<script>
import emitter from "@/utils/emitter";
import Modal from "bootstrap/js/dist/modal";
import DelModal from "@/components/DelModal.vue";
import Loader from "@/components/LoadingComponents.vue";

export default {
  components: {
    DelModal,
    Loader,
  },
  data() {
    return {
      cart: {
        carts: [],
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      coupon: "",
      itemTemp: {},
      delModal: {},
      isLoading: true,
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.cart = res.data.data;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    useCoupon() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      const data = {
        data: {
          code: this.coupon,
        },
      };
      this.$http
        .post(url, data)
        .then((res) => {
          this.getCart();
          this.$httpMessageState(res, `套用優惠券`);
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    createOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const data = {
        data: this.form,
      };
      this.$http
        .post(url, data)
        .then((res) => {
          this.$router.push(`/checkout/${res.data.orderId}`);
          emitter.emit("get-cart");
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    openDelModal(item) {
      this.itemTemp = item;
      this.delModal.show();
    },
    delItem() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${this.itemTemp.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.delModal.hide();
          this.$httpMessageState(res, `將 ${this.itemTemp.product.title} 刪除`);
          this.getCart();
          emitter.emit("get-cart");
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    modifyQty(status, item) {
      if (status === "add") {
        item.qty += 1;
      } else if (status === "sub") {
        item.qty -= 1;
      }
      if (item.qty === "") {
        item.qty = 1;
      } else if (item.qty === 0) {
        this.openDelModal(item);
        item.qty = 1;
      } else if (item.qty % 1) {
        item.qty = parseInt(item.qty);
      }
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const data = {
        data: {
          product_id: item.id,
          qty: item.qty,
        },
      };
      this.$http
        .put(url, data)
        .then((res) => {
          this.$httpMessageState(res, `更新 ${item.product.title} 數量`);
          emitter.emit("get-cart");
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "電話 須為有效的電話號碼";
    },
  },
  mounted() {
    this.delModal = new Modal(this.$refs.delModal.modal);
    this.getCart();
    emitter.on("get-check-order", () => {
      this.getCart();
    });
  },
};
</script>
