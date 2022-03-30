<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white">
            <span v-if="isNew">新增優惠券</span>
            <span v-else>編輯優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <v-form v-slot="{ errors }" @submit="updateCoupon">
          <div class="modal-body">
            <div class="mb-3">
              <label for="title" class="form-label">名稱</label>
              <v-field
                type="text"
                class="form-control"
                id="title"
                placeholder="請輸入優惠券名稱"
                v-model="couponTemp.title"
                name="優惠券名稱"
                :class="{ 'is-invalid': errors['優惠券名稱'] }"
                rules="required"
              ></v-field>
              <error-message
                name="優惠券名稱"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-3">
              <label for="code" class="form-label">優惠碼</label>
              <v-field
                type="text"
                class="form-control"
                id="code"
                placeholder="請輸入優惠碼"
                v-model="couponTemp.code"
                name="優惠碼"
                :class="{ 'is-invalid': errors['優惠碼'] }"
                rules="required"
              ></v-field>
              <error-message
                name="優惠碼"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-3">
              <label for="percent" class="form-label">折扣</label>
              <v-field
                type="number"
                min="0"
                max="100"
                class="form-control"
                id="percent"
                placeholder="請輸入折扣百分比"
                v-model.number="couponTemp.percent"
                name="折扣百分比"
                :class="{ 'is-invalid': errors['折扣百分比'] }"
                rules="required|min_value:0|max_value:100"
              ></v-field>
              <error-message
                name="折扣百分比"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-3">
              <label for="due_date" class="form-label">期限</label>
              <input
                type="date"
                class="form-control"
                id="due_date"
                v-model="due_date"
              />
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input me-1"
                type="checkbox"
                role="switch"
                id="couponTemp.id"
                v-model="couponTemp.is_enabled"
                :true-value="1"
                :false-value="0"
              />
              <label class="form-check-label" :for="couponTemp.id">
                <span v-if="couponTemp.is_enabled">啟用</span>
                <span v-else>不啟用</span>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="Object.keys(errors).length > 0"
            >
              <span v-if="isNew">新增</span>
              <span v-else>儲存</span>
            </button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["coupon", "isNew"],
  data() {
    return {
      couponTemp: {
        is_enabled: 0,
      },
      due_date: "",
      modal: {},
    };
  },
  watch: {
    coupon() {
      this.couponTemp = this.coupon;
      this.due_date = new Date(this.couponTemp.due_date * 1000)
        .toISOString()
        .split("T")[0];
    },
    due_date() {
      this.couponTemp.due_date = new Date(this.due_date).getTime() / 1000;
    },
  },
  methods: {
    updateCoupon() {
      this.$emit("update-coupon", this.couponTemp);
    },
    percentLimit() {
      if (this.couponTemp.percent > 100) {
        this.couponTemp.percent = 100;
      } else if (this.couponTemp.percent < 0) {
        this.couponTemp.percent = 0;
      }
    },
  },
  mounted() {
    this.modal = this.$refs.modal;
  },
};
</script>
