<template>
  <button :class="[$style['button-add'], $style[`button-add_${parent}`]]">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    Добавить имя
  </button>
</template>

<script>
export default {
  props: {
    parent: {
      type: String,
      default: "mom",
    },
  },
};
</script>

<style lang="scss" module>
.button-add {
  position: relative;
  padding: 12px;
  display: flex;
  width: 160px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  outline: none;
  background-color: inherit;
  cursor: pointer;

  span:nth-child(1) {
    top: -2px;
      left: -2px;
    transform: rotate(180deg);
    background: transparent;
  }

  span:nth-child(2) {
    top: -2px;
      right: -2px;
    transform: rotate(270deg);
    background: transparent;
  }

  span:nth-child(3) {
    bottom: -2px;
      right: -2px;
    transform: rotate(0deg);
    background: transparent;
  }

  span:nth-child(4) {
    bottom: -2px;
      left: -2px;
    transform: rotate(90deg);
    background: transparent;
  }

  &:disabled {
    opacity: 0.5;

    span:nth-child(1) {
      transform: rotate(0);
    }

    span:nth-child(2) {
      transform: rotate(90deg);
    }

    span:nth-child(3) {
      transform: rotate(180deg);
    }

    span:nth-child(4) {
      transform: rotate(-90deg);
    }
  }

  span {
    position: absolute;
    width: 10px;
    height: 10px;
    transition: 0.5s;
  }

  &_mom {
    border: 2px solid rgba($dark-pink, 0.2);
    color: $dark-pink;

    span {
      border-bottom: 2px solid $dark-pink;
      border-right: 2px solid $dark-pink;
    }
  }

  &_dad {
    border: 2px solid rgba($dark-blue, 0.2);
    color: $dark-blue;

    span {
      border-bottom: 2px solid $dark-blue;
      border-right: 2px solid $dark-blue;
    }
  }
}
</style>