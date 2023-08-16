<script>
import FormName from "./components/FormName.vue";
import ListNames from "./components/ListNames.vue";

export default {
  components: { FormName, ListNames },
  data() {
    return {
      namesByMom: [
        { name: "Кира", rating: 10 },
        { name: "Ира", rating: 2 },
      ],
      namesByDad: [
        { name: "Кира", rating: 10 },
        { name: "Ира", rating: 2 },
      ],
    };
  },
  computed: {
    hasNamesByMom() {
      return this.namesByMom.length > 0;
    },
    hasNamesByDad() {
      return this.namesByDad.length > 0;
    },
  },
  methods: {
    addNameByMom(name) {
      this.namesByMom.push(name);
    },
    addNameByDad(name) {
      this.namesByDad.push(name);
    },
  },
};
</script>

<template>
  <div :class="$style.container">
    <h1 :class="$style.title">Выбираем имя ребенку</h1>
    <div :class="$style.content">
      <div :class="$style['container_mom']">
        <form-name :parent="'mom'" @add="addNameByMom"/>
        <h2
          v-if="hasNamesByMom"
          :class="[$style.subtitle, $style['subtitle_mom']]"
        >
          Имена от мамы
        </h2>
        <h2 v-else :class="[$style.subtitle, $style['subtitle_mom']]">
          От мамы нет имен
        </h2>
        <list-names :names="namesByMom" :parent="'mom'" />
      </div>
      <div :class="$style['container_dad']">
        <form-name :parent="'dad'" @add="addNameByDad"/>
        <h2
          v-if="hasNamesByDad"
          :class="[$style.subtitle, $style['subtitle_dad']]"
        >
          Имена от папы
        </h2>
        <h2 v-else :class="[$style.subtitle, $style['subtitle_dad']]">
          От папы имен нет
        </h2>
        <list-names v-if="hasNamesByDad" :names="namesByDad" :parent="'dad'" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  margin: 0 auto;
  max-width: 1000px;
}
.title {
  margin-bottom: 28px;
  @include font-size(50, 60);
  color: $black;
  text-align: center;
}

.subtitle {
  margin-top: 16px;
  @include font-size(32, 38);
  text-align: center;

  &_mom {
    color: $dark-pink;
  }

  &_dad {
    color: $dark-blue;
  }
}

.content {
  display: flex;
  justify-content: space-between;
}
</style>