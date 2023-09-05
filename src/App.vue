<template>
  <div v-if="!isLoading" :class="$style.container">
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
  <loader v-else />
</template>

<script>
import SectionParent from "./components/SectionParent.vue";
import SectionChild from "./components/SectionChild.vue";
import Loader from "./components/Loader.vue";

import { addNewName, getNames, deleteName } from "./api";
import names from "./assets/names.json";

export default {
  components: { SectionParent, SectionChild, Loader },
  data() {
    return {
      namesByMom: [],
      namesByDad: [],
      namesForChoose: [],
      isLoading: true,
    };
  },
  computed: {
    commonNames() {
      return this.namesByMom.reduce((commonNames, nameByMom) => {
        const indexNameByDad = this.namesByDad.findIndex(
          (nameByDad) => nameByDad.value === nameByMom.value
        );

        const nameByDad = this.namesByDad[indexNameByDad];

        const isUniversalName =
          nameByDad?.gender === "u" || nameByMom.gender === "u";

        if (
          nameByDad &&
          (nameByDad.gender === nameByMom.gender || isUniversalName)
        ) {
          const commonName = {
            id: nameByDad.id + nameByMom.id,
            value: nameByDad.value,
            rating: nameByDad.rating + nameByMom.rating,
            gender: isUniversalName ? "u" : nameByDad.gender,
          };

          commonNames.push(commonName);
        }
        return commonNames;
      }, []);
    },
  },
  methods: {
    addNameByMom(name) {
      const indexNameInList = this.namesByMom.findIndex(
        (n) => n.value === name.value
      );
      const nameInList = indexNameInList !== -1;
      if (nameInList) {
        deleteName("namesByMom", name);
        this.namesByMom.splice(indexNameInList, 1);
      }
      this.namesByMom.push(name);
      addNewName("namesByMom", name);
    },
    addNameByDad(name) {
      const indexNameInList = this.namesByDad.findIndex(
        (n) => n.value === name.value
      );
      const nameInList = indexNameInList !== -1;
      if (nameInList) {
        deleteName("namesByDad", name);
        this.namesByDad.splice(indexNameInList, 1);
      }
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
    //Имитация долгой загрузки, похорошему надо массив имен из json получать с сервера, поэтому в реальности загрузка приложения будет идти долго
    setTimeout(() => {
      Promise.all([this.fetchNamesByMom(), this.fetchNamesByDad()]).then(() => {
        this.isLoading = false;
      });
      this.namesForChoose = names.map((name) => name.text);
    }, 1500);
  },
};
</script>

<style lang="scss" module>
.container {
  margin: 0 auto;
  max-width: 1000px;
  padding: 60px 10px;

  @media screen and (max-width: 760px) {
    max-width: 460px;
    padding: 20px 0;
  }
}

.section-hero {
  .title {
    margin-bottom: 20px;
    @include font-size(50, 60);
    color: $black;
    text-align: center;
    font-weight: 800;

    @media screen and (max-width: 760px) {
      @include font-size(25, 30);
    }
  }

  .text {
    @include font-size(20, 24);
    color: $white;
    text-align: center;
    text-shadow: 2px 2px 4px $black;

    @media screen and (max-width: 760px) {
      @include font-size(14, 18);
    }
  }
}

.section-parents {
  display: flex;
  justify-content: space-between;
  margin-top: 36px;

  @media screen and (max-width: 760px) {
    margin-top: 14px;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 30px;
  }
}
</style>