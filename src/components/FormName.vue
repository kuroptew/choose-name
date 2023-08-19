<template>
  <form @submit.prevent :class="[$style.form, $style[`form_${parent}`]]">
    <h3 :class="[$style.title, $style[`title_${parent}`]]">{{ titleForm }}</h3>
    <v-autocomplete
      :items="namesForChoose"
      variant="outlined"
      color="$pink"
      placeholder="Введите имя"
      v-model="name.value"
    >
    </v-autocomplete>
    <input
      type="text"
      :class="$style.input"
      placeholder="Введите Ваш рейтинг имени"
      v-model.number="name.rating"
    />
    <button-add-name :disabled="!formValid" @click="addName" :parent="parent" />
  </form>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { VAutocomplete } from "vuetify/components";

import ButtonAddName from "./ButtonAddName.vue";

export default {
  components: { ButtonAddName },
  props: {
    parent: {
      type: String,
      default: "mom",
    },
    namesForChoose: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: {
        value: null,
        rating: "",
      },
    };
  },
  computed: {
    formValid() {
      if (!this.name.value) return false;
      return this.name.value.length >= 2 && this.name.rating >= 1;
    },
    titleForm() {
      if (this.parent === "dad") {
        return "Имя от папы";
      }
      return "Имя от мамы";
    },
  },
  methods: {
    updateName(name) {
      this.name.value = name;
    },
    addName() {
      if (this.formValid) {
        this.name.id = uuidv4();
        this.$emit("add", this.name);
      }
      this.name = {
        value: null,
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

  .title {
    @include font-size(28, 32);
    font-weight: 700;
    color: $white;

    &_mom {
      color: $dark-pink;
    }

    &_dad {
      color: $dark-blue;
    }
  }

  .input {
    width: 100%;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 4px;
    min-height: 32px;
    border: none;
    @include font-size(12, 16);
    color: $black;
    background-color: $white;

    &:focus {
      outline: none;
      border: 2px solid $beige;
    }

    &::placeholder {
      color: $beige;
    }
  }
}
</style>