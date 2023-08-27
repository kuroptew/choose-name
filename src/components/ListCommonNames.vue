<template>
  <div v-if="hasNames" :class="$style['names-list']">
    <h2 :class="$style.title">Список общих имен</h2>
    <table :class="$style['table-names']">
      <thead>
        <th>Имя</th>
        <th>Рейтинг</th>
        <th>Пол</th>
      </thead>
      <tbody>
        <tr
          v-for="name in names"
          :key="name.value"
          :class="$style['item-name']"
        >
          <td :class="$style.name">{{ name.value }}</td>
          <td :class="$style.rating">{{ name.rating }}</td>
          <td v-if="name.gender === 'm'" :class="$style.gender">&#128102;</td>
          <td v-if="name.gender === 'g'" :class="$style.gender">&#128103;</td>
          <td v-if="name.gender === 'u'" :class="$style.gender">
            &#128102; &#128103;
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
    hasNames() {
      return this.names.length > 0;
    },
  }
};
</script>

<style lang="scss" module>
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
      width: 33%;
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
    width: 33%;
    font-weight: 600;
    text-align: center;
  }
}
</style>