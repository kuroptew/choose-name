<script>
import FormName from "./components/FormName.vue";
export default {
  components: { FormName },
};
</script>

<template>
  <div :class="$style.container">
    <h1 :class="$style.title">Выбираем имя ребенку</h1>
    <div :class="$style.content">
      <div :class="$style['container_mom']">
        <form-name sex="female" />
        <h2 :class="[$style.subtitle, $style['subtitle_mom']]">
          Имена от мамы
        </h2>
      </div>
      <div :class="$style['container_dad']">
        <form-name sex="male" />
        <h2 :class="[$style.subtitle, $style['subtitle_dad']]">
          Имена от папы
        </h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  margin: 0 auto;
  max-width: 1000px;
}
.title {
  margin-bottom: 28px;
  @include font-size(50, 60);
  color: $black;
  text-align: center;
}

.subtitle {
  margin-top: 16px;
  @include font-size(32, 38);
  text-align: center;

  &_mom {
    color: $dark-pink;
  }

  &_dad {
    color: $dark-blue;
  }
}

.content {
  display: flex;
  justify-content: space-between;
}
</style>