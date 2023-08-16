<template>
  <form @submit.prevent :class="[$style.form, $style[`form_${parent}`]]">
    <input
      type="text"
      :class="$style.input"
      placeholder="Введите имя"
      v-model="objName.name"
    />
    <input
      type="text"
      :class="$style.input"
      placeholder="Введите рейтинг имени"
      v-model.number="objName.rating"
    />
    <button
      @click="addName"
      :class="[$style.button, $style[`button_${parent}`]]"
      :disabled="!formValid"
    >
      Добавить имя
    </button>
  </form>
</template>

<script>
export default {
  props: {
    parent: {
      type: String,
      default: "mom",
    },
  },
  data() {
    return {
      objName: {
        name: "",
        rating: "",
      },
    };
  },
  computed: {
    formValid() {
      return this.objName.name.length > 2 && this.objName.rating >= 1;
    },
  },
  methods: {
    addName() {
      if (this.formValid) {
        this.$emit("add", this.objName);
      }
      this.objName = {
        name:"",
        rating:"",
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
  gap: 16px;
  border-radius: 20px;

  &_mom {
    background-color: $pink;
  }

  &_dad {
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

  &_mom {
    background-color: $dark-pink;
  }

  &_dad {
    background-color: $dark-blue;
  }
}
</style>