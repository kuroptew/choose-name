<template>
  <form @submit.prevent :class="[$style.form, $style[`form_${sex}`]]">
    <input
      type="text"
      :class="$style.input"
      placeholder="Введите имя"
      v-model="name"
    />
    <input
      type="text"
      :class="$style.input"
      placeholder="Введите рейтинг имени"
      v-model="rating"
    />
    <button
      @click="addName"
      :class="[$style.button, $style[`button_${sex}`]]"
      :disabled="!formValid"
    >
      Добавить имя
    </button>
  </form>
</template>

<script>
export default {
  props: {
    sex: {
      type: String,
      default: "male",
    },
  },
  data() {
    return {
      name: "",
      rating: "",
    };
  },
  computed: {
    formValid() {
      return this.name.length > 2 && this.rating >= 1;
    },
  },
  methods: {
    addName() {
      console.log("name");
    },
  },
};
</script>

<style lang="scss" module>
.form {
  width: 360px;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  border-radius: 20px;
  &_female {
    background-color: $pink;
  }

  &_male {
    background-color: $blue;
  }
}

.input {
  padding: 8px;
  border-radius: 4px;
  border: none;
  @include font-size(12, 16);
  color: $black;

  &::placeholder {
    color: $beige;
  }
}

.button {
  padding: 12px;
  border-radius: 8px;
  color: $black;
  cursor: pointer;

  &:disabled {
    opacity: 0.8;
  }

  &_female {
    background-color: $dark-pink;
  }

  &_male {
    background-color: $dark-blue;
  }
}
</style>