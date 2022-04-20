<template>
  <div class="dropdown">
    <a
      type="button position-relative p-2"
      data-bs-toggle="dropdown"
      data-bs-auto-close="outside"
      ref="cartDropdown"
      @click="toggleCartDropdown"
    >
      <i class="bi bi-cart3 text-dark fs-4"></i>
      <span
        v-if="cart.carts.length"
        class="badge rounded-pill position-absolute top-0 start-50 bg-danger text-white"
      >
        {{ cart.carts.length }}
        <span class="visually-hidden">unread messages</span>
      </span>
    </a>
    <div class="dropdown-menu p-2 overflow-auto">
      <template v-if="cart.carts.length">
        <p class="text-center text-muted">— 已加入商品 —</p>
        <ul class="list-group list-group-flush">
          <li
            v-for="item in cart.carts"
            :key="item.id"
            class="list-group-item d-flex align-items-center justify-content-between px-1"
          >
            <img
              :src="item.product.imageUrl"
              :alt="item.product.title"
              class="w-25"
            />
            <div class="d-flex flex-column justify-conetent-center mx-2">
              <span class="mb-1">{{ item.product.title }}</span>
              <span class="mb-1">$ {{ item.product.price }}</span>
              <div class="d-flex">
                <button
                  class="btn btn-sm btn-outline-dark"
                  :disabled="item.qty === 1 || btnLoading"
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
                  :disabled="btnLoading"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>
            <a class="text-muted" href="#" @click.prevent="delCartItem(item)">
              <div
                v-if="delbtnLoading"
                class="spinner-border spinner-border-sm"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <i v-else class="bi bi-trash"></i>
            </a>
          </li>
        </ul>
        <hr class="dropdown-divider" />
        <div class="text-end mx-2">
          <p class="fw-bold me-2">總計：$ {{ cart.total }}</p>
          <button
            class="btn btn-dark mb-2 w-100"
            type="button"
            @click="checkout"
          >
            前往結帳
          </button>
          <a class="text-muted me-2" href="#" @click.prevent="openDelModal">
            清空購物車
          </a>
        </div>
      </template>
      <template v-else>
        <p class="text-center text-muted">— 空空如也 —</p>
        <a
          href="#/products"
          class="btn btn-dark mb-2 w-100"
          type="button"
          @click="hideCartDropdown"
        >
          前往購物
        </a>
      </template>
    </div>
    <DelModal :item="{ msg: '全部項目' }" @del-item="delCart" ref="delModal" />
  </div>
</template>

<script>
import emitter from "@/utils/emitter";
import Dropdown from "bootstrap/js/dist/dropdown";
import Modal from "bootstrap/js/dist/modal";
import DelModal from "@/components/DelModal.vue";

export default {
  components: {
    DelModal,
  },
  data() {
    return {
      cart: {
        carts: [],
      },
      btnLoading: false,
      delbtnLoading: false,
      cartDropdown: {},
      delModal: {},
    };
  },
  methods: {
    getCart() {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          this.cart = res.data.data;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    delCart() {
      this.delModal.hide();
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$httpMessageState(res, `清空購物車`);
          this.getCart();
          emitter.emit("get-check-order");
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    delCartItem(item) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.delbtnLoading = true;
      this.$http
        .delete(url)
        .then((res) => {
          this.$httpMessageState(res, `刪除 ${item.product.title}`);
          this.getCart();
          emitter.emit("get-check-order");
          this.delbtnLoading = false;
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
      this.btnLoading = true;
      this.$http
        .put(url, data)
        .then((res) => {
          this.$httpMessageState(res, `更新 ${item.product.title} 數量`);
          this.getCart();
          emitter.emit("get-check-order");
          this.btnLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    toggleCartDropdown() {
      this.cartDropdown.toggle();
    },
    hideCartDropdown() {
      this.cartDropdown.hide();
    },
    checkout() {
      this.$router.push("/checkorder");
      this.hideCartDropdown();
    },
    openDelModal() {
      this.delModal.show();
      this.hideCartDropdown();
    },
  },
  mounted() {
    this.getCart();
    emitter.on("get-cart", () => {
      this.getCart();
    });
    this.cartDropdown = new Dropdown(this.$refs.cartDropdown);
    this.delModal = new Modal(this.$refs.delModal.modal);
  },
};
</script>

<style>
.dropdown .dropdown-menu {
  min-width: 360px;
  max-height: 80vh;
  right: -18px;
  left: auto;
}
</style>
