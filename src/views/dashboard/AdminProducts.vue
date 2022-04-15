<template>
  <Loading :active="isLoading" loader="dots" :z-index="1000" />
  <div class="container py-4">
    <h2>產品列表</h2>
    <div class="d-flex justify-content-between pt-4">
      <select
        class="form-select form-select-sm w-auto"
        @change="getProducts(1, this.$refs.category.value)"
        ref="category"
      >
        <option value="全部" selected>全部</option>
        <option value="日式刨冰">日式刨冰</option>
        <option value="飲品">飲品</option>
        <option value="甜點">甜點</option>
        <option value="甜湯">甜湯</option>
        <option value="宅配">宅配</option>
      </select>
      <div class="text-end">
        <button
          type="button"
          class="btn btn-primary"
          @click="openProductModal('new')"
        >
          + 新增產品
        </button>
      </div>
    </div>
    <table class="table table-hover mt-3 align-middle">
      <thead>
        <tr>
          <th width="30%">產品名稱</th>
          <th class="text-end">原價</th>
          <th class="text-end">售價</th>
          <th width="24%" class="text-center">是否啟用</th>
          <th class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.title }}</td>
          <td class="text-end">{{ product.origin_price }}</td>
          <td class="text-end">{{ product.price }}</td>
          <td class="text-center">
            <div class="form-check form-switch d-flex justify-content-center">
              <input
                class="form-check-input me-1"
                type="checkbox"
                role="switch"
                :id="product.id"
                v-model="product.is_enabled"
                :true-value="1"
                :false-value="0"
                @change="updateIsEnabled(product)"
              />
              <label
                v-if="product.is_enabled"
                class="form-check-label"
                :for="product.id"
                >啟用</label
              >
              <label
                v-else
                class="form-check-label"
                for="flexSwitchCheckChecked"
                >不啟用</label
              >
            </div>
          </td>
          <td class="text-center">
            <button
              type="button"
              class="btn btn-primary me-1"
              @click="openProductModal('edit', product)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="openProductModal('del', product)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination="pagination" @get-data="getProducts" />
    <ProductModal
      :product="productTemp"
      :is-new="isNew"
      @update-product="updateProduct"
      ref="productModal"
    />
    <DelModal :item="productTemp" ref="delModal" @del-item="delProduct" />
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
import Pagination from "@/components/PaginationComponent.vue";
import ProductModal from "@/components/ProductModal.vue";
import DelModal from "@/components/DelModal.vue";

export default {
  components: {
    Pagination,
    ProductModal,
    DelModal,
  },
  data() {
    return {
      products: [],
      pagination: {},
      productModal: {},
      delModal: {},
      productTemp: {},
      isNew: false,
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1, category = "全部") {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}&category=${category}`;
      if (category === "全部") {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      }
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
          this.isLoading = false;
        });
    },
    updateIsEnabled(product) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${product.id}`;
      const data = { data: product };
      this.isLoading = true;
      this.$http
        .put(url, data)
        .then((res) => {
          this.isLoading = false;
          this.$httpMessageState(res, `更新 ${product.title}`);
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
          this.getProducts(this.pagination.current_page);
          this.isLoading = false;
        });
    },
    openProductModal(status, product) {
      if (status === "new") {
        this.isNew = true;
        this.productTemp = {
          imagesUrl: [],
        };
        this.productModal.show();
      } else if (status === "edit") {
        this.isNew = false;
        this.productTemp = { ...product };
        this.productModal.show();
      } else if (status === "del") {
        this.productTemp = { ...product };
        this.delModal.show();
      }
    },
    updateProduct() {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.productTemp.id}`;
      let http = `put`;
      let msg = `更新 ${this.productTemp.title}`;
      if (this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
        http = `post`;
        msg = `新增 ${this.productTemp.title}`;
      }
      const data = { data: this.productTemp };
      this.$http[http](url, data)
        .then((res) => {
          this.$httpMessageState(res, msg);
          this.productModal.hide();
          this.getProducts(this.pagination.current_page);
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.productTemp.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$httpMessageState(res, `刪除 ${this.productTemp.title}`);
          this.getProducts(this.pagination.current_page);
          this.delModal.hide();
        })
        .catch((error) => {
          this.$httpMessageState(error.response, error.response.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
    this.productModal = new Modal(this.$refs.productModal.modal);
    this.delModal = new Modal(this.$refs.delModal.modal);
  },
};
</script>
