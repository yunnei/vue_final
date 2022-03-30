<template>
  <div class="modal fade" id="productModal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white" id="exampleModalLabel">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label h5">主要圖片</label>
                <div class="input-group mb-2">
                  <input
                    type="text"
                    id="imageUrl"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="productTemp.imageUrl"
                  />
                  <button
                    class="btn btn-outline-danger"
                    type="button"
                    @click="productTemp.imageUrl = ''"
                  >
                    刪除
                  </button>
                </div>
                <div class="input-group mb-3">
                  <input
                    v-if="!productTemp.imageUrl"
                    type="file"
                    class="form-control"
                    @change="uploadImage(true, $event)"
                  />
                </div>
                <img :src="productTemp.imageUrl" class="img-fluid" />
              </div>
              <p class="h5">多圖新增</p>
              <div v-if="productTemp.imagesUrl">
                <div
                  v-for="(image, key) in productTemp.imagesUrl"
                  :key="key"
                  class="mb-3"
                >
                  <div class="input-group mb-2">
                    <input
                      type="text"
                      id="imagesUrl"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model="productTemp.imagesUrl[key]"
                    />
                    <button
                      class="btn btn-outline-danger"
                      type="button"
                      @click="productTemp.imagesUrl.splice(key, 1)"
                    >
                      刪除
                    </button>
                  </div>
                  <input
                    v-if="!image"
                    type="file"
                    class="form-control"
                    @change="uploadImage(false, $event)"
                  />
                  <img :src="image" class="img-fluid" />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-primary w-100"
                  @click="createImages"
                >
                  + 新增圖片
                </button>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="title" class="form-label h5">產品名稱</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入產品名稱"
                  v-model="productTemp.title"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="notes" class="form-label h5">備註</label>
                <input
                  type="text"
                  class="form-control"
                  id="notes"
                  placeholder="請輸入備註"
                  v-model="productTemp.notes"
                  required
                />
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="category" class="form-label h5">類別</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="請輸入產品類別"
                    v-model="productTemp.category"
                    required
                  />
                </div>
                <div class="col mb-3">
                  <label for="unit" class="form-label h5">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    placeholder="請輸入產品單位"
                    v-model="productTemp.unit"
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="price_large" class="form-label h5">
                    售價（L）
                  </label>
                  <input
                    type="number"
                    min="0"
                    class="form-control"
                    id="price_large"
                    placeholder="請輸入大份產品售價"
                    v-model="productTemp.price_large"
                  />
                </div>
                <div class="col mb-3">
                  <label for="price" class="form-label h5">售價</label>
                  <input
                    type="number"
                    min="0"
                    class="form-control"
                    id="price"
                    placeholder="請輸入產品售價"
                    v-model="productTemp.price"
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="origin_price" class="form-label h5">原價</label>
                  <input
                    type="number"
                    min="0"
                    class="form-control"
                    id="origin_price"
                    placeholder="請輸入產品原價"
                    v-model="productTemp.origin_price"
                    required
                  />
                </div>
                <div class="col mb-3">
                  <label for="price" class="form-label h5">菜單順序</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    placeholder="請輸入菜單順序"
                    v-model.number="productTemp.menu_sort"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <p class="h5">描述</p>
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="productTemp.description"
                ></ckeditor>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label h5">內容</label>
                <textarea
                  class="form-control"
                  id="content"
                  placeholder="請輸入產品內容"
                  v-model="productTemp.content"
                ></textarea>
              </div>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="is_enabled"
                  v-model="productTemp.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label
                  v-if="productTemp.is_enabled"
                  class="form-check-label"
                  for="is_enabled"
                  >啟用</label
                >
                <label v-else class="form-check-label" for="is_enabled"
                  >不啟用</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  props: ["product", "isNew"],
  data() {
    return {
      productTemp: {},
      modal: {},
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ["heading", "typing", "bold", "|", "link"],
      },
    };
  },
  watch: {
    product() {
      this.productTemp = this.product;
    },
  },
  methods: {
    createImages() {
      if (this.productTemp.imagesUrl) {
        this.productTemp.imagesUrl.push("");
      } else {
        this.productTemp.imagesUrl = [];
        this.productTemp.imagesUrl.push("");
      }
    },
    uploadImage(isMain, e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", file);

      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http
        .post(url, formData)
        .then((res) => {
          if (isMain) {
            this.productTemp.imageUrl = res.data.imageUrl;
          } else {
            this.productTemp.imagesUrl[this.productTemp.imagesUrl.length - 1] =
              res.data.imageUrl;
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    updateProduct() {
      this.$emit("updateProduct", this.productTemp);
    },
  },
  mounted() {
    this.modal = this.$refs.modal;
  },
};
</script>
