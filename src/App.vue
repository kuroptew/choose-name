<script>
import FormName from "./components/FormName.vue";
import ListNames from "./components/ListNames.vue";
import { addNewName, getNames, deleteName } from "./api";

export default {
  components: { FormName, ListNames },
  data() {
    return {
      namesByMom: [],
      namesByDad: [],
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
      addNewName("namesByMom", name);
    },
    addNameByDad(name) {
      this.namesByDad.push(name);
      addNewName("namesByDad", name);
    },
    deleteNameByMom(name) {
      this.namesByMom = this.namesByMom.filter((n) => n.id !== name.id);
      deleteName("namesByMom", name);
    },
    deleteNameByDad(name) {
      this.namesByDad = this.namesByDad.filter((n) => n.id !== name.id);
      deleteName("namesByDad", name);
    },
    async fetchNamesByMom() {
      this.namesByMom = await getNames("namesByMom");
    },
    async fetchNamesByDad() {
      this.namesByDad = await getNames("namesByDad");
    },
  },
  mounted() {
    this.fetchNamesByMom();
    this.fetchNamesByDad();
  },
};
</script>

<template>
  <div :class="$style.container">
    <h1 :class="$style.title">Выбираем имя ребенку</h1>
    <div :class="$style.content">
      <div :class="$style['container_mom']">
        <form-name :parent="'mom'" @add="addNameByMom" />
        <template v-if="hasNamesByMom">
          <h2 :class="[$style.subtitle, $style['subtitle_mom']]">
            Имена от мамы
          </h2>
          <list-names
            :names="namesByMom"
            :parent="'mom'"
            @delete="deleteNameByMom"
          />
        </template>
        <h2 v-else :class="[$style.subtitle, $style['subtitle_mom']]">
          От мамы нет имен
        </h2>
      </div>
      <div :class="$style['container_dad']">
        <form-name :parent="'dad'" @add="addNameByDad" />
        <template v-if="hasNamesByDad">
          <h2 :class="[$style.subtitle, $style['subtitle_dad']]">
            Имена от папы
          </h2>
          <list-names 
          :names="namesByDad" 
          :parent="'dad'"
          @delete="deleteNameByDad" />
        </template>
        <h2 v-else :class="[$style.subtitle, $style['subtitle_dad']]">
          От папы имен нет
        </h2>
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