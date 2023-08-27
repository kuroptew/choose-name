<template>
  <div :class="$style.container">
    <section :class="$style['section-hero']">
      <h1 :class="$style.title">Выбираем имя ребенку</h1>
      <p :class="$style.text">
        Это приложение создано для выбора имени ребенка. Родители добавляют
        имена в свои списки и на их основании фомируется общий список имен для
        ребенка.
      </p>
    </section>
    <section :class="$style['section-parents']">
      <section-parent
        :namesForChoose="namesForChoose"
        :names="namesByMom"
        :parent="'mom'"
        @delete="deleteNameByMom"
        @add="addNameByMom"
      />
      <section-parent
        :namesForChoose="namesForChoose"
        :names="namesByDad"
        :parent="'dad'"
        @delete="deleteNameByDad"
        @add="addNameByDad"
      />
    </section>
    <section-child :names="commonNames" />
  </div>
</template>

<script>
import SectionParent from "./components/SectionParent.vue";
import SectionChild from "./components/SectionChild.vue";

import { addNewName, getNames, deleteName } from "./api";
import names from "./assets/names.json";

export default {
  components: { SectionParent, SectionChild },
  data() {
    return {
      namesByMom: [],
      namesByDad: [],
      namesForChoose: [],
    };
  },
  computed: {
    commonNames() {
      return this.namesByMom.reduce((commonNames, nameByMom) => {
        const indexNameByDad = this.namesByDad.findIndex(
          (nameByDad) => nameByDad.value === nameByMom.value
        );

        const nameByDad = this.namesByDad[indexNameByDad];

        const isUniversalName = nameByDad?.gender === "u" || nameByMom.gender === "u";

        if (nameByDad && (nameByDad.gender === nameByMom.gender || isUniversalName)) {
          const commonName = {
            id: nameByDad.id + nameByMom.id,
            value: nameByDad.value,
            rating: nameByDad.rating + nameByMom.rating,
            gender: isUniversalName ? 'u' : nameByDad.gender,
          };

          commonNames.push(commonName);
        }
        return commonNames;
      }, []);
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
    this.namesForChoose = names.map((name) => name.text);
  },
};
</script>

<style lang="scss" module>
.container {
  margin: 0 auto;
  max-width: 1000px;
}

.section-hero {
  .title {
    margin-bottom: 20px;
    @include font-size(50, 60);
    color: $black;
    text-align: center;
    font-weight: 800;
  }

  .text {
    @include font-size(20, 24);
    color: $white;
    text-align: center;
    text-shadow: 2px 2px 4px $black;
  }
}

.section-parents {
  display: flex;
  justify-content: space-between;
  margin-top: 36px;
}
</style>