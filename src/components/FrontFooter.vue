<template>
  <footer class="bg-primary p-4">
    <div class="container d-lg-flex justify-content-between align-items-center">
      <div class="col text-center">
        <img
          class="img-fluid mb-3"
          src="@/assets/images/daoru-logo.png"
          alt="daoru logo"
          width="30%"
        />
      </div>
      <div class="col text-muted text-center">
        <p>
          <span class="fw-bold">島入冰店</span><br />
          日式刨冰｜飲品｜甜點 專門店<br />
          電話：0958-558-137<br />
          營業時間：每週肆伍陸日 12：00 - 18：00<br />
          地址：700 台南市中西區赤崁東街 15 巷 2 號<br />
          ＊詳細營業情況請見臉書公告為準＊
        </p>
      </div>
      <div class="col fs-3 text-center">
        <a
          class="text-muted mx-2"
          href="https://www.instagram.com/daoru.iceshop/"
          ><i class="bi bi-instagram"></i
        ></a>
        <a class="text-muted mx-2" href="https://www.facebook.com/daoru.ice"
          ><i class="bi bi-facebook"></i
        ></a>
        <a class="text-muted mx-2" href=""><i class="bi bi-envelope"></i></a>
      </div>
    </div>
  </footer>
  <div class="d-flex text-primary bg-dark justify-content-center">
    <router-link to="/admin">後台</router-link>｜
    <router-link to="/login">登入</router-link>
  </div>
</template>
