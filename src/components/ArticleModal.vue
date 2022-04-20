<template>
  <div class="modal fade" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white">
            <span v-if="isNew">新增貼文</span>
            <span v-else>編輯貼文</span>
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
                <label for="title" class="form-label fs-5">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入貼文標題"
                  v-model="articleTemp.title"
                />
              </div>
              <div class="mb-3">
                <label for="image" class="form-label fs-5">封面圖片</label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片網址"
                    v-model="articleTemp.image"
                  />
                  <button
                    class="btn btn-outline-danger"
                    type="button"
                    id="image"
                    @click="articleTemp.image = ''"
                  >
                    刪除
                  </button>
                </div>
                <input
                  v-if="!articleTemp.image"
                  class="form-control"
                  type="file"
                  ref="imageFile"
                  @change="uploadImage"
                />
                <img
                  v-if="articleTemp.image"
                  class="mt-4 img-fluid"
                  :src="articleTemp.image"
                />
              </div>
              <div class="mb-3">
                <label for="autohr" class="form-label fs-5">作者</label>
                <input
                  type="text"
                  class="form-control"
                  id="autohr"
                  placeholder="請輸入作者名稱"
                  v-model="articleTemp.author"
                />
              </div>
              <div class="mb-3">
                <label for="create_at" class="form-label fs-5">
                  建立日期
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="create_at"
                  v-model="create_date"
                />
              </div>
            </div>
            <div class="col-8">
              <div class="mb-3">
                <label for="description" class="form-label fs-5">描述</label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                  v-model="articleTemp.description"
                ></textarea>
              </div>
              <div class="mb-3">
                <p class="form-label fs-5">內文</p>
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="articleTemp.content"
                ></ckeditor>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label fs-5">標籤</label>
                <div class="mb-2 fs-5">
                  <span
                    v-for="(tag, i) in articleTemp.tag"
                    :key="i"
                    class="badge bg-secondary text-dark me-1"
                  >
                    {{ tag }}
                    <a href="#" @click.prevent="articleTemp.tag.splice(i, 1)">
                      x
                    </a>
                  </span>
                </div>
                <div class="input-group input-group-sm mb-3 w-50">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入標籤"
                    ref="newTag"
                  />
                  <button
                    class="btn btn-outline-dark"
                    type="button"
                    @click="addTag"
                  >
                    新增
                  </button>
                </div>
              </div>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="isPublic"
                  v-model="articleTemp.isPublic"
                  :true-value="true"
                  :false-value="false"
                />
                <label class="form-check-label" for="isPublic">
                  <span v-if="articleTemp.isPublic">發布</span>
                  <span v-else>未發布</span>
                </label>
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
          <button type="button" class="btn btn-primary" @click="updateArticle">
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
  props: ["article", "isNew"],
  data() {
    return {
      articleTemp: {},
      create_date: "",
      modal: {},
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "link",
          "|",
          "numberedList",
          "bulletedList",
          "|",
        ],
      },
    };
  },
  watch: {
    article() {
      this.articleTemp = this.article;
      this.create_date = new Date(this.articleTemp.create_at * 1000)
        .toISOString()
        .split("T")[0];
    },
    create_date() {
      this.articleTemp.create_at = new Date(this.create_date).getTime() / 1000;
    },
  },
  methods: {
    updateArticle() {
      this.$emit("update-article", this.articleTemp);
    },
    addTag() {
      if (this.articleTemp.tag) {
        this.articleTemp.tag.push(this.$refs.newTag.value);
      } else {
        this.articleTemp.tag = [`${this.$refs.newTag.value}`];
      }
      this.$refs.newTag.value = "";
    },
    uploadImage() {
      const file = this.$refs.imageFile.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", file);

      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http
        .post(url, formData)
        .then((res) => {
          this.articleTemp.image = res.data.imageUrl;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
  mounted() {
    this.modal = this.$refs.modal;
  },
};
</script>
