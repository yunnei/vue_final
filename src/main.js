import { createApp } from "vue";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import CKEditor from "@ckeditor/ckeditor5-vue";

import { defineRule, Form, Field, ErrorMessage, configure } from "vee-validate";
import {
  required,
  max,
  min,
  email,
  max_value,
  min_value,
} from "@vee-validate/rules";
import { localize, loadLocaleFromURL } from "@vee-validate/i18n";

import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App.vue";
import router from "./router";
import $httpMessageState from "@/utils/pushMessage.js";

loadLocaleFromURL(
  "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);
configure({
  generateMessage: localize("zh_TW"),
});

defineRule("required", required);
defineRule("max", max);
defineRule("min", min);
defineRule("email", email);
defineRule("max_value", max_value);
defineRule("min_value", min_value);

AOS.init();

const app = createApp(App);
app.config.globalProperties.$httpMessageState = $httpMessageState;
app.component("Loading", Loading);
app.use(VueAxios, axios);
app.use(CKEditor);
app.component("Form", Form);
app.component("Field", Field);
app.component("ErrorMessage", ErrorMessage);
app.use(router);
app.mount("#app");
