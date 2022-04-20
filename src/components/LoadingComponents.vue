<template>
  <div class="loading-bg">
    <div class="loading">
      <img src="@/assets/images/daoru-logo02.png" alt="shaved-ice" />
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style>
.loading-show {
  display: none;
}
.loading {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transform: translateY(-20%);
}
.loading img {
  width: 160px;
  position: absolute;
}
.loading span {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 2px solid rgba(86, 181, 194, 0.5);
  animation: circle 4s linear infinite;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.loading span:nth-child(2) {
  border-radius: 73% 27% 56% 44% / 54% 33% 67% 46%;
}
.loading span:nth-child(3) {
  animation-duration: 2s;
  border-radius: 33% 67% 33% 67% / 61% 34% 66% 39%;
}
.loading span:nth-child(4) {
  animation-direction: reverse;
  border-radius: 33% 67% 61% 39% / 36% 34% 66% 64%;
}
.loading span:nth-child(5) {
  border-radius: 100%;
}

@keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
