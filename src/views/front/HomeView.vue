<template>
  <div class="banner container-fluid">
    <div class="banner-content">
      <div class="banner-text">
        <p class="mb-0">
          使用在地當令食材<br />
          創作出一碗<br />
          擁有法式細膩靈魂<br />
          翻新味蕾感受的日式刨冰<br />
        </p>
      </div>
      <div class="text-end">
        <button
          class="btn btn-dark text-white"
          type="button"
          @click="toPage('/products')"
        >
          前往購物 <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
  <div class="container">
    <h3 class="text-center my-5" data-aos="fade-up" data-aos-duration="1000">
      <span class="border-bottom border-primary border-1"> 新品上市 </span>
    </h3>
    <div
      class="row d-flex justify-content-center mb-5"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div class="new-arival-image col-10 col-lg-4 text-end p-2 m-lg-4">
        <img
          class="img-fluid"
          src="@/assets/images/plumice.jpg"
          alt="春梅冬花"
        />
      </div>
      <div
        class="new-arival-content col-lg-4 d-flex flex-column justify-content-center m-4 text-center text-lg-start"
      >
        <h4 class="my-4 mt-lg-4 fw-bold">
          《春梅冬花》<br />
          <span class="fs-6">抓住冬天的尾巴 享受春天的開始</span>
        </h4>
        <p>
          在冬日自家婆婆蜜好的洛神花，<br />
          與春天盛產的梅子完美結合！<br />
          添加玫瑰露，綿密滑順的清爽優格奶霜，<br />
          從頂層灑下來自日本的乾燥紫蘇葉鹽，<br />
          挖開裏面有梅酒製成的蒟蒻果凍，<br />
          帶給你片刻的 Q 彈驚喜，<br />
          忍不住一口接一口！<br />
        </p>
        <div class="text-end">
          <button
            class="btn btn-outline-dark btn-sm"
            type="button"
            @click="toPage('/product/-MzJuc3M76y9gHXMhuQy')"
          >
            更多細節 <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-secondary" data-aos="fade-up" data-aos-duration="1000">
    <div class="container py-4">
      <h3 class="text-center mt-2 mb-5">
        <span class="border-bottom border-primary">本週限定</span>
      </h3>
      <div class="row d-flex justify-content-center">
        <div class="weekonly weekonly-left col-10 col-md-5 col-lg-4">
          <div class="weekonly-image">
            <img
              class="img-fluid"
              src="@\assets\images\weekOnly01.jpg"
              alt="濃肉桂生乳捲"
            />
          </div>
          <div class="weekonly-content text-dark">
            <h4 class="fw-bold">濃<br />肉桂<br />生乳捲</h4>
            <p class="mb-0">肉桂控<br />黑糖肉桂香氣<br />浮雲般蛋糕體</p>
          </div>
        </div>
        <div class="weekonly weekonly-right col-10 col-md-5 col-lg-4">
          <div class="weekonly-image">
            <img
              class="img-fluid"
              src="@\assets\images\weekOnly02.jpg"
              alt="三層草莓生乳酪"
            />
          </div>
          <div class="weekonly-content text-dark">
            <h4 class="fw-bold">三層<br />草莓<br />生乳酪</h4>
            <p class="mb-0">三層製作<br />酸甜滋味<br />滑順微彈口感</p>
          </div>
        </div>
        <div class="text-center">
          <button
            class="btn btn-outline-dark btn-sm mb-2"
            type="button"
            @click="toPage('/menu')"
          >
            更多餐點 <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="container" data-aos="fade-up" data-aos-duration="500">
    <h3 class="text-center mt-5">堅持，只做好東西與大家分享</h3>
    <div class="row p-3" data-aos="fade-up" data-aos-duration="1000">
      <div class="col-md col-12">
        <img class="img-fluid my-3" src="@/assets/images/water.jpg" alt="ice" />
      </div>
      <div
        class="col d-flex flex-column justify-content-center align-items-center text-center mt-2"
      >
        <h4 class="border-bottom border-primary mb-4">純淨的透明冰</h4>
        <p class="lh-lg">
          RO 水自製無雜質、純透明冰，安全無慮。<br />
          耗費 50 小時，慢速結冰，讓冰體融化慢。<br />
          選用日本武士刀片，只為刨出完美鵝絨冰。
        </p>
      </div>
    </div>
    <div
      class="row p-3 gx-4 d-flex flex-md-row-reverse"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div class="col-md col-12">
        <img
          class="img-fluid my-3"
          src="@/assets/images/tomato.jpg"
          alt="透明冰"
        />
      </div>
      <div
        class="col d-flex flex-column align-items-center justify-content-center text-center mt-2"
      >
        <h4 class="border-bottom border-primary mb-4">手工的心意</h4>
        <p class="lh-lg">
          從冰塊、淋醬到配料，<br />
          闆娘通通不假他人之手，<br />
          使用天然食材手工製作。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toPage(page) {
      this.$router.push(page);
    },
  },
};
</script>
