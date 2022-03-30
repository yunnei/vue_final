<template>
  <div class="min-vh-100">
    <front-navbar></front-navbar>
    <toast-message></toast-message>
    <router-view></router-view>
  </div>
  <Footer></Footer>
</template>

<script>
import FrontNavbar from "@/components/FrontNavbar.vue";
import ToastMessage from "@/components/ToastMessage.vue";
import Footer from "@/components/FrontFooter.vue";

export default {
  components: {
    FrontNavbar,
    Footer,
    ToastMessage,
  },
};
</script>
