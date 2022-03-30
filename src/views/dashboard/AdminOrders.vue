<template>
  <v-loading :active="isLoading" loader="dots" :z-index="1060"></v-loading>
  <div class="container py-4">
    <h2>訂單管理</h2>
    <table class="table table-hover mt-3 align-middle">
      <thead>
        <th>訂購時間</th>
        <th>訂單編號</th>
        <th>項目</th>
        <th class="text-end">應付金額</th>
        <th class="text-center">是否付款</th>
        <th class="text-center">編輯</th>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ new Date(order.create_at * 1000).toLocaleDateString() }}</td>
          <td>{{ order.id }}</td>
          <td>
            <div v-for="item in order.products" :key="item.id">
              {{ item.product.title }} * {{ item.qty }}
            </div>
          </td>
          <td class="text-end">$ {{ order.total }}</td>
          <td class="text-center">
            <div class="form-check d-flex justify-content-center">
              <input
                class="form-check-input me-1"
                type="checkbox"
                :id="order.id"
                v-model="order.is_paid"
                :true-value="true"
                :false-value="false"
                @change="updatePaid(order)"
              />
              <label class="form-check-label" :for="order.id">
                <span v-if="order.is_paid" class="text-success">已付款</span>
                <span v-else>待付款</span>
              </label>
            </div>
          </td>
          <td class="text-center">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="openModal('view', order)"
            >
              查看
            </button>
            <button
              type="button"
              class="btn btn-outline-danger ms-1"
              @click="openModal('del', order)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @get-data="getOrders"></pagination>
    <!-- OrderModal -->
    <order-modal
      :order="orderTemp"
      ref="orderModal"
      @update-paid="updatePaid"
    ></order-modal>
    <!-- DelModal -->
    <del-modal
      :item="orderTemp"
      ref="delModal"
      @del-item="delOrder"
    ></del-modal>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
import Pagination from "@/components/PaginationComponent.vue";
import OrderModal from "@/components/OrderModal.vue";
import DelModal from "@/components/DelModal.vue";

export default {
  components: {
    Pagination,
    OrderModal,
    DelModal,
  },
  data() {
    return {
      orders: [],
      pagination: {},
      orderModal: {},
      delModal: {},
      orderTemp: {
        user: {},
      },
      isLoading: false,
    };
  },
  methods: {
    getOrders(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch((error) => {
          this.$httpMessageState(
            error.response,
            `${error.response.data.message}`
          );
          this.isLoading = false;
        });
    },
    openModal(status, item) {
      if (status === "view") {
        this.orderTemp = { ...item };
        this.orderModal.show();
      } else if (status === "del") {
        this.orderTemp = { ...item };
        this.delModal.show();
      }
    },
    updatePaid(order) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`;
      const data = { data: order };
      this.isLoading = true;
      this.$http
        .put(url, data)
        .then((res) => {
          this.isLoading = false;
          this.$httpMessageState(res, `更新 ${order.id} 訂單`);
          this.orderModal.hide();
          this.getOrders(this.pagination.current_page);
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, error.response.data.message);
          this.getOrders(this.pagination.current_page);
        });
    },
    delOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.orderTemp.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$httpMessageState(res, `刪除 ${this.orderTemp.id} 訂單`);
          this.delModal.hide();
          this.getOrders(this.pagination.current_page);
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
          this.delModal.hide();
          this.getOrders(this.pagination.current_page);
        });
    },
  },
  mounted() {
    this.getOrders();
    this.orderModal = new Modal(this.$refs.orderModal.modal);
    this.delModal = new Modal(this.$refs.delModal.modal);
  },
};
</script>
