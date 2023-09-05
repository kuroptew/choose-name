<template>
  <form @submit.prevent :class="[$style.form, $style[`form_${parent}`]]">
    <h3 :class="[$style.title, $style[`title_${parent}`]]">{{ titleForm }}</h3>
    <div :class="$style['input-wrapper']">
      <label :class="$style.label" :for="`${parent}-name`"> Имя </label>
      <v-autocomplete
        :items="namesForChoose"
        variant="outlined"
        color="$pink"
        placeholder="Введите имя"
        v-model="name.value"
        :menu-props="{
          closeOnContentClick: true,
          maxHeight: 250,
        }"
        @keydown="enterName"
        no-data-text="Имени в списке нет"
        ref="inputName"
        :id="`${parent}-name`"
        @blur="onBlurName"
        @focus="onFocusName"
      >
      </v-autocomplete>
      <span
        v-if="showErrorName && isInvalidName"
        :class="$style['error-message']"
        >{{ errorMessageName }}</span
      >
    </div>
    <div :class="$style['input-wrapper']">
      <label :class="$style.label" :for="`${parent}-rating`">Рейтинг</label>
      <input
        :id="`${parent}-rating`"
        type="text"
        :class="$style.input"
        placeholder="Введите рейтинг имени"
        v-model.number="name.rating"
        @blur="onBlurRating"
        @focus="onFocusRating"
        ref="inputRating"
      />
      <span
        v-if="showErrorRating && isInvalidRating"
        :class="$style['error-message']"
        >{{ errorMessageRating }}</span
      >
    </div>
    <div :class="$style['input-wrapper']">
      <div :class="$style['radio-wrapper']">
        <input
          :class="[$style['input-radio'], $style['input-radio_boy']]"
          type="radio"
          :id="`${parent}-boy`"
          value="m"
          v-model="name.gender"
        />
        <label :for="`${parent}-boy`">Для мальчика</label>
      </div>

      <div :class="$style['radio-wrapper']">
        <input
          :class="[$style['input-radio'], $style['input-radio_girl']]"
          type="radio"
          :id="`${parent}-girl`"
          value="g"
          v-model="name.gender"
        />
        <label :for="`${parent}-girl`">Для девочки</label>
      </div>

      <div :class="$style['radio-wrapper']">
        <input
          :class="[$style['input-radio'], $style['input-radio_universal']]"
          type="radio"
          :id="`${parent}-universal`"
          value="u"
          v-model="name.gender"
        />
        <label :for="`${parent}-universal`">Универсальное</label>
      </div>
    </div>

    <button-add-name :disabled="!formValid" @click="addName" :parent="parent" />
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
        gender: "m",
      },
      showErrorName: false,
      showErrorRating: false,
    };
  },
  computed: {
    formValid() {
      return !this.isInvalidName && !this.isInvalidRating;
    },
    titleForm() {
      if (this.parent === "dad") {
        return "Имя от папы";
      }
      return "Имя от мамы";
    },
    errorMessageName() {
      if (this.name.value === null || this.name.value.length === 0) {
        return "Поле обязательное для заполнения";
      }

      if (this.name.value.length < 2) {
        return "Имя должно содержать не менее 2 символов";
      }

      return "";
    },
    errorMessageRating() {
      if (!this.name.rating) {
        return "Поле обязательное для заполнения";
      }

      if (this.name.rating < 2 || this.name.rating > 10) {
        return "Рейтинг должен быть от 1 до 10";
      }

      return "";
    },
    isInvalidName() {
      return this.errorMessageName.length > 0;
    },
    isInvalidRating() {
      return this.errorMessageRating.length > 0;
    },
  },
  methods: {
    enterName(event) {
      if (event.key === "Enter" || event.key === "Tab") {
        this.$refs.inputName.menu = false;
        this.name.value = event.target.value;
      }
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
        gender: "m",
      };
      this.$refs.inputName.blur();
      this.$refs.inputRating.blur();
      this.showErrorName = false;
      this.showErrorRating = false;
    },
    onBlurName() {
      this.showErrorName = true;
    },
    onFocusName() {
      this.showErrorName = false;
    },
    onBlurRating() {
      this.showErrorRating = true;
    },
    onFocusRating() {
      this.showErrorRating = false;
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
  gap: 32px;
  border-radius: 20px;
  box-shadow: 8px 8px 16px rgba($black, 0.5);

  @media screen and (max-width: 760px) {
    max-width: 300px;
    padding: 12px 8px;
    border-radius: 10px;
    gap: 24px;
  }

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

    @media screen and (max-width: 760px) {
      @include font-size(20, 24);
    }

    &_mom {
      color: $dark-pink;
    }

    &_dad {
      color: $dark-blue;
    }
  }

  .input-wrapper {
    position: relative;
    width: 100%;

    .label {
      display: block;
      margin-bottom: 4px;
      @include font-size(16, 20);

      @media screen and (max-width: 760px) {
        @include font-size(12, 14);
      }
    }

    .radio-wrapper {
      display: flex;
      align-items: center;

      &:not(:last-child) {
        margin-bottom: 4px;
      }

      input[type="radio"],
      label {
        cursor: pointer;
      }

      label {
        margin-left: 12px;
        @include font-size(16, 20);

        @media screen and (max-width: 760px) {
          @include font-size(12, 14);
        }
      }

      .input-radio {
        position: relative;
        @include box(20px);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          @include box(20px);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background-color: $white;
        }

        &_boy::before {
          border: 2px solid $dark-blue;
        }

        &_girl::before {
          border: 2px solid $dark-pink;
        }

        &_universal::before {
          border: 2px solid $beige;
        }

        &:checked::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          @include box(10px);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          visibility: visible;
        }

        &_boy:checked::after {
          background-color: $dark-blue;
        }

        &_girl:checked::after {
          background-color: $dark-pink;
        }

        &_universal:checked::after {
          background-color: $beige;
        }
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
        color: rgba($black, 0.3);
      }
    }

    .error-message {
      position: absolute;
      bottom: -18px;
      left: 0px;
      @include font-size(12, 14);
      color: $red;
      @media screen and (max-width: 760px) {
        bottom: -16px;
      }
    }
  }
}
</style>