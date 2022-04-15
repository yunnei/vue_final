<template>
  <div class="min-vh-100">
    <FrontNavbar />
    <ToastMessage />
    <RouterView />
  </div>
  <Footer />
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
  watch: {
    $route() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
