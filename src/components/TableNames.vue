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

<style lang="scss" module>
.table-names {
  display: flex;
  padding: 20px;
  border-radius: 20px;
  margin-top: 24px;
  flex-direction: column;
  box-shadow: 8px 8px 16px rgba($black, 0.5);
  &_mom {
    background-color: $pink;
  }
  &_dad {
    background-color: $blue;
  }

  thead {
    display: block;
    width: 100%;
    margin-bottom: 12px;
    color: $white;

    th {
      display: inline-block;
      width: 33%;
      text-shadow: 2px 2px 4px $black;
    }
  }
}

.item-name {
  display: block;
  width: 100%;
  padding: 8px 0;

  &_mom {
    color: $dark-pink;
    &:not(:last-child) {
      border-bottom: 2px solid $dark-pink;
    }

    td {
      .button-delete {
        color: $dark-pink;
      }
    }
  }

  &_dad {
    color: $dark-blue;
    &:not(:last-child) {
      border-bottom: 2px solid $dark-blue;
    }

    td {
      .button-delete {
        color: $dark-blue;
      }
    }
  }

  td {
    display: inline-block;
    width: 33%;
    text-align: center;
  }
}

.name,
.rating,
.button-delete {
  @include font-size(16, 20);
}

.button-delete {
  background: transparent;
  cursor: pointer;
}
</style>