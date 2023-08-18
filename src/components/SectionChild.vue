<template>
  <section :class="$style['section-child']">
    <template v-if="hasNames">
      <h2 :class="$style.title">Список общих имен</h2>
    <table :class="$style['table-names']">
      <thead>
        <th>Имя</th>
        <th>Рейтинг</th>
      </thead>
      <tbody>
        <tr
          v-for="name in names"
          :key="name.value"
          :class="$style['item-name']"
        >
          <td :class="$style.name">{{ name.value }}</td>
          <td :class="$style.rating">{{ name.rating }}</td>
        </tr>
      </tbody>
    </table>
    </template>
    <h2 v-else :class="$style.title">Общих имен нет</h2>
  </section>
</template>

<script>
export default {
  props: {
    names: {
      type: Array,
      required: true,
    },
  },
  computed:{
    hasNames(){
      return this.names.length > 0
    }
  }
};
</script>

<style lang="scss" module>
.section-child {
  margin-top: 40px;
  padding: 40px;
  border-radius: 20px;
  background-color: $grey;
}
.title {
  @include font-size(32, 38);
  text-align: center;
  color: $black;
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
    text-align: center;
  }
}
</style>