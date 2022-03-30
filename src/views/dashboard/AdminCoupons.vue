<template>
  <v-loading :active="isLoading" loader="dots" :z-index="1000"></v-loading>
  <div class="container py-4">
    <h2>優惠券</h2>
    <div class="text-end">
      <button type="button" class="btn btn-primary" @click="openModal('new')">
        + 新增優惠券
      </button>
    </div>
    <table class="table table-hover mt-3 align-middle">
      <thead>
        <th>名稱</th>
        <th>折扣代碼</th>
        <th class="text-center">折扣</th>
        <th class="text-center">期限</th>
        <th class="text-center">啟用</th>
        <th class="text-center">編輯</th>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td class="ps-0">{{ coupon.title }}</td>
          <td class="ps-0">{{ coupon.code }}</td>
          <td class="text-center">{{ coupon.percent / 10 }} 折</td>
          <td class="text-center">
            ~ {{ new Date(coupon.due_date * 1000).toLocaleDateString() }}
          </td>
          <td class="text-center">
            <div class="form-check form-switch d-flex justify-content-center">
              <input
                class="form-check-input me-1"
                type="checkbox"
                role="switch"
                :id="coupon.id"
                v-model="coupon.is_enabled"
                :true-value="1"
                :false-value="0"
                @change="updateIsEnabled(coupon)"
              />
              <label class="form-check-label" :for="coupon.id">
                <span v-if="coupon.is_enabled">啟用</span>
                <span v-else>不啟用</span>
              </label>
            </div>
          </td>
          <td class="text-center">
            <button
              type="button"
              class="btn btn-primary me-1"
              @click="openModal('edit', coupon)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="openModal('del', coupon)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @get-data="getCoupons"></pagination>
    <!-- CouponModal -->
    <coupon-modal
      :coupon="couponTemp"
      :is-new="isNew"
      @update-coupon="updateCoupon"
      ref="couponModal"
    ></coupon-modal>
    <del-modal
      :item="couponTemp"
      @del-item="delCoupon"
      ref="delModal"
    ></del-modal>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
import Pagination from "@/components/PaginationComponent.vue";
import CouponModal from "@/components/CouponModal.vue";
import DelModal from "@/components/DelModal.vue";

export default {
  components: {
    Pagination,
    CouponModal,
    DelModal,
  },
  data() {
    return {
      coupons: [],
      pagination: {},
      couponTemp: {
        is_enabled: 0,
      },
      due_date: "",
      couponModal: {},
      delModal: {},
      isNew: true,
      isLoading: false,
    };
  },
  watch: {
    due_date() {
      this.couponTemp.due_date = new Date(this.due_date).getTime() / 1000;
    },
  },
  methods: {
    getCoupons(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
          this.isLoading = false;
        });
    },
    openModal(status, coupon) {
      if (status === "new") {
        this.isNew = true;
        this.couponTemp = {
          is_enabled: 0,
          due_date: new Date().getTime() / 1000,
        };
        this.couponModal.show();
      } else if (status === "edit") {
        this.isNew = false;
        this.couponTemp = { ...coupon };
        this.couponModal.show();
      } else if (status === "del") {
        this.couponTemp = { ...coupon };
        this.delModal.show();
      }
    },
    updateCoupon() {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.couponTemp.id}`;
      let http = "put";
      let msg = `更新 ${this.couponTemp.title} 優惠券`;
      if (this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
        http = "post";
        msg = `新增 ${this.couponTemp.title} 優惠券`;
      }
      this.$http[http](url, { data: this.couponTemp })
        .then((res) => {
          this.getCoupons(this.pagination.current_page);
          this.couponModal.hide();
          this.$httpMessageState(res, msg);
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    updateIsEnabled(coupon) {
      this.couponTemp = { ...coupon };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.couponTemp.id}`;
      this.isLoading = true;
      this.$http
        .put(url, { data: this.couponTemp })
        .then((res) => {
          this.isLoading = false;
          this.$httpMessageState(res, `更新 ${this.couponTemp.title} 優惠券`);
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, error.response.data.message);
          this.getCoupons(this.pagination.current_page);
        });
    },
    delCoupon(coupon) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.couponTemp.id}`;
      this.$http
        .delete(url, { data: coupon })
        .then((res) => {
          this.$httpMessageState(res, `刪除 ${this.couponTemp.title} 優惠券`);
          this.delModal.hide();
          this.getCoupons(this.pagination.current_page);
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
          this.delModal.hide();
        });
    },
  },
  mounted() {
    this.getCoupons();
    this.couponModal = new Modal(this.$refs.couponModal.modal);
    this.delModal = new Modal(this.$refs.delModal.modal);
  },
};
</script>
