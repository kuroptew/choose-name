<template>
  <form :class="$style['form-filters']">
    <h3 :class="$style['form-filters__title']">Фильтры</h3>
    <select
      :class="$style['form-filters__select']"
      :value="sort"
      @change="changeSort"
    >
      <option disabled value="">Выберите из списка</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
    <div :class="$style['input-wrapper']">
      <div :class="$style['radio-wrapper']">
        <input
          :class="[$style['input-radio'], $style['input-radio_all']]"
          type="radio"
          id="filter-all"
          value="all"
          @change="changeFilter"
          v-model="filter"
        />
        <label for="filter-all">Все</label>
      </div>
      <div :class="$style['radio-wrapper']">
        <input
          :class="[$style['input-radio'], $style['input-radio_boy']]"
          type="radio"
          id="filter-boys"
          value="m"
          @change="changeFilter"
          v-model="filter"
        />
        <label for="filter-boys">Мальчики</label>
      </div>

      <div :class="$style['radio-wrapper']">
        <input
          :class="[$style['input-radio'], $style['input-radio_girl']]"
          type="radio"
          id="filter-girls"
          value="g"
          @change="changeFilter"
          v-model="filter"
        />
        <label for="filter-girls">Девочки</label>
      </div>

      <div :class="$style['radio-wrapper']">
        <input
          :class="[$style['input-radio'], $style['input-radio_universal']]"
          type="radio"
          id="filter-universals"
          value="u"
          @change="changeFilter"
          v-model="filter"
        />
        <label for="filter-universals">Универсальные</label>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    sort: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filter: "all",
    };
  },
  methods: {
    changeSort(event) {
      this.$emit("update:sort", event.target.value);
    },
    changeFilter(event) {
      console.log(event.target.value);
      this.$emit("updateFilter", event.target.value);
    },
  },
};
</script>

<style lang="scss" module>
.form-filters {
  background-color: #fff;
  margin-right: 100px;
  padding: 12px;
  min-height: 200px;
  border-radius: 10px;

  @media screen and (max-width: 760px) {
    width: 100%;
    margin-right: 0;
  }

  &__title {
    margin-bottom: 12px;
    @include font-size(18, 24);
    color: $black;
    text-decoration: underline;

    @media screen and (max-width: 760px) {
      @include font-size(14, 16);
    }
  }

  &__select {
    padding: 4px;
    border-radius: 4px;
    @include font-size(16, 20);
    color: $black;
    border: 1px solid $beige;

    @media screen and (max-width: 760px) {
      @include font-size(12, 14);
    }
  }
}

.input-wrapper {
  width: 100%;
  margin-top: 20px;

  .label {
    display: block;
    margin-bottom: 4px;
    @include font-size(16, 20);
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

      &_all::before {
        border: 2px solid $black;
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

      &_all:checked::after {
        background-color: $black;
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
}
</style>