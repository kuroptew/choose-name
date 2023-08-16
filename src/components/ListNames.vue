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
      console.log('delete',name);
    },
  },
};
</script>

<template>
  <ul :class="[$style['list-names'], $style[`list-names_${parent}`]]">
    <li
      v-for="name in names"
      :key="name"
      :class="[$style['item-name'], $style[`item-name_${parent}`]]"
    >
      <span :class="$style.name">{{ name.name }}</span>
      <span :class="$style.rating">{{ name.rating }}</span>
      <button 
      @click="deleteName(name)"
      :class="$style['button-delete']">Удалить имя</button>
    </li>
  </ul>
</template>

<style lang="scss" module>
.list-names {
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
}

.item-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  color: #fff;

  &_mom:not(:last-child) {
    border-bottom: 2px solid $dark-pink;
  }

  &_dad:not(:last-child) {
    border-bottom: 2px solid $dark-blue;
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