<template>
  <section :class="$style['section-child']">
    <template v-if="hasNames">
      <div :class="$style.container">
        <form :class="$style['form-filters']">
          <h3 :class="$style['form-filters__title']">Фильтры</h3>
          <select
            :class="$style['form-filters__select']"
            v-model="selectedSort"
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
        </form>
        <div :class="$style['names-list']">
          <h2 :class="$style.title">Список общих имен</h2>
          <table :class="$style['table-names']">
            <thead>
              <th>Имя</th>
              <th>Рейтинг</th>
            </thead>
            <tbody>
              <tr
                v-for="name in sortedNames"
                :key="name.value"
                :class="$style['item-name']"
              >
                <td :class="$style.name">{{ name.value }}</td>
                <td :class="$style.rating">{{ name.rating }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    <h2 v-else :class="$style.title">Общих имен нет</h2>
  </section>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { value: "По алфавиту А-Я", name: "По алфавиту А-Я" },
        { value: "По алфавиту Я-А", name: "По алфавиту Я-А" },
        { value: "По убыванию рейтинга", name: "По убыванию рейтинга" },
        { value: "По возрастанию рейтинга", name: "По возрастанию рейтинга" },
      ],
      selectedSort: "",
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
          console.log("А-Я");
          return [...this.names].sort((name1, name2) =>
            name1.value.localeCompare(name2.value)
          );
        case "По алфавиту Я-А":
          console.log("Z-A");
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
  },
};
</script>

<style lang="scss" module>
.section-child {
  margin-top: 40px;
  padding: 40px;
  border-radius: 20px;
  background-color: $grey;
}

.container {
  display: flex;
  align-items: center;
}

.form-filters {
  background-color: #fff;
  margin-right: 100px;
  padding: 12px;
  min-height: 200px;
  border-radius: 10px;

  &__title {
    margin-bottom: 12px;
    @include font-size(14, 18);
    color: $black;
    text-decoration: underline;
  }

  &__select {
    padding: 4px;
    border-radius: 4px;
    border: 1px solid $beige;
  }
}
.title {
  @include font-size(32, 38);
  text-align: center;
  color: $black;
}

.names-list {
  margin: 0 auto;
}

.table-names {
  display: flex;
  padding: 20px;
  border-radius: 20px;
  margin-top: 24px;
  flex-direction: column;

  thead {
    display: block;
    width: 100%;
    color: $white;

    th {
      display: inline-block;
      width: 50%;
      text-shadow: 2px 2px 4px $black;
    }
  }
}

.item-name {
  display: block;
  width: 100%;
  padding: 8px 0;
  color: black;
  &:not(:last-child) {
    border-bottom: 2px solid $black;
  }

  td {
    display: inline-block;
    width: 50%;
    font-weight: 600;
    text-align: center;
  }
}
</style>