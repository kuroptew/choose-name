<template>
  <section>
    <form-name
      :parent="parent"
      @add="addName"
      :namesForChoose="namesForChoose"
    />
    <template v-if="hasNames">
      <h2 :class="[$style.title, $style[`title_${parent}`]]">
        Список имен от {{ titleTable }}
      </h2>
      <table-names :names="names" :parent="parent" @delete="deleteName" />
    </template>
    <h2 v-else :class="[$style.title, $style[`title_${parent}`]]">
      Список имен пуст
    </h2>
  </section>
</template>

<script>
import FormName from "./FormName.vue";
import TableNames from "./TableNames.vue";

export default {
  components: { FormName, TableNames },
  props: {
    parent: {
      type: String,
      default: "mom",
    },
    names: {
      type: Array,
      required: true,
    },
    namesForChoose: {
      type: Array,
      required: true,
    },
  },
  computed: {
    titleTable() {
      if (this.parent === "dad") {
        return "папы";
      }
      return "мамы";
    },
    hasNames() {
      return this.names.length > 0;
    },
  },
  methods: {
    addName(name) {
      this.$emit("add", name);
    },
    deleteName(name) {
      this.$emit("delete", name);
    },
  },
};
</script>

<style lang="scss" module>
.title {
  margin-top: 16px;
  @include font-size(32, 38);
  font-weight: 800;
  text-align: center;

  @media screen and (max-width: 760px) {
    margin-top: 8px;
    @include font-size(20, 24);
  }

  &_mom {
    color: $dark-pink;
  }

  &_dad {
    color: $dark-blue;
  }
}
</style>