<script>
import FormName from "./components/FormName.vue";
import TableNames from "./components/TableNames.vue";
import SectionParent from "./components/SectionParent.vue";
import { addNewName, getNames, deleteName } from "./api";

export default {
  components: { FormName, TableNames, SectionParent },
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
    <section :class="$style['section-parents']">
      <section-parent
        :names="namesByMom"
        :parent="'mom'"
        @delete="deleteNameByMom"
        @add="addNameByMom"
      />
      <section-parent
        :names="namesByDad"
        :parent="'dad'"
        @delete="deleteNameByDad"
        @add="addNameByDad"
      />
    </section>
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

.section-parents {
  display: flex;
  justify-content: space-between;
}
</style>