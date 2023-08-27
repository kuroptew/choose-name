<template>
  <section :class="$style['section-child']">
    <template v-if="hasNames">
      <div :class="$style.container">
        <form-filters
          :options="options"
          v-model:sort="selectedSort"
          @updateFilter="updateFilter"
        />
        <list-common-names :names="sortedAndFilteredNames" />
      </div>
    </template>
    <h2 v-else :class="$style.title">Общих имен нет</h2>
  </section>
</template>

<script>
import FormFilters from "./FormFilters.vue";
import ListCommonNames from "./ListCommonNames.vue";

export default {
  components: { ListCommonNames, FormFilters },
  data() {
    return {
      options: [
        { value: "По алфавиту А-Я", name: "По алфавиту А-Я" },
        { value: "По алфавиту Я-А", name: "По алфавиту Я-А" },
        { value: "По убыванию рейтинга", name: "По убыванию рейтинга" },
        { value: "По возрастанию рейтинга", name: "По возрастанию рейтинга" },
      ],
      selectedSort: "",
      filter: "all",
    };
  },
  props: {
    names: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasNames() {
      return this.names.length > 0;
    },
    sortedNames() {
      switch (this.selectedSort) {
        case "По алфавиту А-Я":
          return [...this.names].sort((name1, name2) =>
            name1.value.localeCompare(name2.value)
          );
        case "По алфавиту Я-А":
          return [...this.names]
            .sort((name1, name2) => name1.value.localeCompare(name2.value))
            .reverse();
        case "По убыванию рейтинга":
          return [...this.names].sort(
            (name1, name2) => name2.rating - name1.rating
          );
        case "По возрастанию рейтинга":
          return [...this.names].sort(
            (name1, name2) => name1.rating - name2.rating
          );
        default:
          return this.names;
      }
    },
    sortedAndFilteredNames() {
      switch (this.filter) {
        case "m":
          return this.sortedNames.filter(
            (name) => name.gender === "m" || name.gender === "u"
          );
        case "g":
          return this.sortedNames.filter(
            (name) => name.gender === "g" || name.gender === "u"
          );
        case "u":
          return this.sortedNames.filter((name) => name.gender === "u");
        default:
          return this.sortedNames;
      }
    },
  },
  methods: {
    updateFilter(value) {
      console.log(value, "form");
      this.filter = value;
    },
  },
};
</script>

<style lang="scss" module>
.section-child {
  margin-top: 40px;
  padding: 40px;
  border-radius: 20px;
  background-color: $grey;

  @media screen and (max-width: 760px) {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    margin-top: 20px;
  }
}

.container {
  display: flex;
  align-items: center;

  @media screen and (max-width: 760px) {
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 30px;
  }
}

.title {
  @include font-size(32, 38);
  text-align: center;
  color: $black;

  @media screen and (max-width: 760px) {
    @include font-size(20, 24);
  }
}
</style>