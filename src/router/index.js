import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/front/HomeView.vue";

const routes = [
  {
    path: "/",
    component: () => import("../views/front/FrontView.vue"),
    children: [
      {
        path: "/",
        component: HomeView,
      },
      {
        path: "menu",
        component: () => import("../views/front/MenuView.vue"),
      },
      {
        path: "products",
        component: () => import("../views/front/ProductsView.vue"),
      },
      {
        path: "product/:id",
        component: () => import("../views/front/ProductView.vue"),
      },
      {
        path: "checkorder",
        component: () => import("../views/front/CheckOrder.vue"),
      },
      {
        path: "checkout/:id",
        component: () => import("../views/front/CheckoutView.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/admin",
    component: () => import("../views/dashboard/DashboardView.vue"),
    children: [
      {
        path: "/admin",
        component: () => import("../views/dashboard/AdminProducts.vue"),
      },
      {
        path: "orders",
        component: () => import("../views/dashboard/AdminOrders.vue"),
      },
      {
        path: "coupons",
        component: () => import("../views/dashboard/AdminCoupons.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
