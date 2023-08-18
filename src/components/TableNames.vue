<script>
export default {
  props: {
    names: {
      type: Array,
      required: true,
    },
    parent: {
      type: String,
      default: "mom",
    },
  },
  methods: {
    deleteName(name) {
      this.$emit("delete", name);
    },
  },
};
</script>

<template>
  <table :class="[$style['table-names'], $style[`table-names_${parent}`]]">
    <thead>
      <th>Имя</th>
      <th>Рейтинг</th>
    </thead>
    <tbody>
      <tr
        v-for="name in names"
        :key="name.value"
        :class="[$style['item-name'], $style[`item-name_${parent}`]]"
      >
        <td :class="$style.name">{{ name.value }}</td>
        <td :class="$style.rating">{{ name.rating }}</td>
        <td>
          <button @click="deleteName(name)" :class="$style['button-delete']">
            Удалить имя
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" module>
.table-names {
  display: flex;
  padding: 20px;
  border-radius: 20px;
  margin-top: 24px;
  flex-direction: column;
  list-style: none;
  &_mom {
    background-color: $pink;
  }
  &_dad {
    background-color: $blue;
  }

  thead {
    display: block;
    width: 100%;
    color: #fff;

    th {
      display: inline-block;
      width: 33%;
    }
  }
}

.item-name {
  display: block;
  width: 100%;
  padding: 8px 0;
  color: #fff;

  &_mom:not(:last-child) {
    border-bottom: 2px solid $dark-pink;
  }

  &_dad:not(:last-child) {
    border-bottom: 2px solid $dark-blue;
  }

  td {
    display: inline-block;
    width: 33%;
    text-align: center;
  }
}

.name,
.rating {
  @include font-size(16, 20);
}

.button-delete {
  background: transparent;
  color: #fff;
  cursor: pointer;
}
</style>