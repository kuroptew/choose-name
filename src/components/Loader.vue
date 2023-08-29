<template>
  <div :class="$style.centered">
    <div :class="$style['blob-1']"></div>
    <div :class="$style['blob-2']"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" module>
.centered {
  display: flex;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.blob-1,
.blob-2 {
  width: 70px;
  height: 70px;
  position: absolute;
  background-color: $pink;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.blob-1 {
  left: 20%;
  animation: osc-l 2.5s ease infinite;
}
.blob-2 {
  left: 80%;
  animation: osc-r 2.5s ease infinite;
  background-color: $blue;
}
@keyframes osc-l {
  0% {
    left: 20%;
  }
  50% {
    left: 50%;
  }
  100% {
    left: 20%;
  }
}
@keyframes osc-r {
  0% {
    left: 80%;
  }
  50% {
    left: 50%;
  }
  100% {
    left: 80%;
  }
}
</style>