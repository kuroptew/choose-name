<template>
  <form @submit.prevent :class="[$style.form, $style[`form_${parent}`]]">
    <input
      type="text"
      :class="$style.input"
      placeholder="Введите имя"
      v-model="name.value"
    />
    <input
      type="text"
      :class="$style.input"
      placeholder="Введите рейтинг имени"
      v-model.number="name.rating"
    />
    <button-add-name :disabled="!formValid"  @click="addName" :parent="parent" />
  </form>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

import ButtonAddName from "./ButtonAddName.vue";

export default {
  components: { ButtonAddName },
  props: {
    parent: {
      type: String,
      default: "mom",
    },
  },
  data() {
    return {
      name: {
        value: "",
        rating: "",
      },
    };
  },
  computed: {
    formValid() {
      return this.name.value.length >= 2 && this.name.rating >= 1;
    },
  },
  methods: {
    addName() {
      if (this.formValid) {
        this.name.id = uuidv4();
        this.$emit("add", this.name);
      }
      this.name = {
        value: "",
        rating: "",
        id: "",
      };
    },
  },
};
</script>

<style lang="scss" module>
.form {
  width: 360px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 20px;

  &_mom {
    background-color: $pink;
  }

  &_dad {
    background-color: $blue;
  }
}

.input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: none;
  @include font-size(12, 16);
  color: $black;

  &::placeholder {
    color: $beige;
  }
}
</style>