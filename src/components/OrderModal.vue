<template>
  <div class="modal order-modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white">訂單細節</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body row">
          <div class="col-4">
            <h4>訂購人資料</h4>
            <table class="table align-middle">
              <tbody>
                <tr>
                  <th>姓名</th>
                  <td>
                    <input
                      v-if="isEdit"
                      type="text"
                      v-model="orderTemp.user.name"
                    />
                    <span v-else>{{ orderTemp.user.name }}</span>
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>
                    <input
                      v-if="isEdit"
                      type="text"
                      v-model="orderTemp.user.email"
                    />
                    <span v-else>{{ orderTemp.user.email }}</span>
                  </td>
                </tr>
                <tr>
                  <th>電話</th>
                  <td>
                    <input
                      v-if="isEdit"
                      type="text"
                      v-model="orderTemp.user.tel"
                    />
                    <span v-else>{{ orderTemp.user.tel }}</span>
                  </td>
                </tr>
                <tr>
                  <th>地址</th>
                  <td>
                    <input
                      v-if="isEdit"
                      type="text"
                      v-model="orderTemp.user.address"
                    />
                    <span v-else>{{ orderTemp.user.address }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-8">
            <div class="d-flex justify-content-between">
              <h4>訂單內容</h4>
              <button
                class="btn btn-outline-dark btn-sm"
                type="button"
                @click="isEdit = true"
              >
                修改
              </button>
            </div>
            <table class="table align-middle">
              <tbody>
                <tr>
                  <th>訂單編號</th>
                  <td>{{ orderTemp.user.name }}</td>
                </tr>
                <tr>
                  <th>訂單時間</th>
                  <td>
                    {{
                      new Date(orderTemp.create_at * 1000).toLocaleDateString()
                    }}
                  </td>
                </tr>
                <tr>
                  <th>訂購項目</th>
                  <td>
                    <div v-for="(item, key) in orderTemp.products" :key="key">
                      {{ item.product.title }} * {{ item.qty }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>總金額</th>
                  <td>$ {{ orderTemp.total }}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input me-1"
                        type="checkbox"
                        id="is_paid"
                        v-model="orderTemp.is_paid"
                        :true-value="true"
                        :false-value="false"
                      />
                      <label class="form-check-label" for="is_paid">
                        <span v-if="orderTemp.is_paid" class="text-success"
                          >已付款</span
                        >
                        <span v-else>待付款</span>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>備註</th>
                  <td>
                    <textarea
                      v-if="isEdit"
                      v-model="orderTemp.message"
                      rows="3"
                      cols="30"
                    />
                    <span v-else>{{ orderTemp.message }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            @click="isEdit = false"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updatePaid(orderTemp)"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order"],
  data() {
    return {
      orderTemp: {
        user: {},
      },
      modal: {},
      isEdit: false,
    };
  },
  watch: {
    order() {
      this.orderTemp = this.order;
      console.log(this.orderTemp);
    },
  },
  methods: {
    updatePaid() {
      this.$emit("update-paid", this.orderTemp);
      this.isEdit = false;
    },
  },
  mounted() {
    this.modal = this.$refs.modal;
  },
};
</script>

<style>
.order-modal input,
.order-modal textarea {
  border: 1px solid #ced4da;
  padding: 0.2rem 0.5rem;
}
</style>
