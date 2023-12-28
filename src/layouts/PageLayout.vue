<template>
  <div class="app-main-layout">

    <Navigation :date="now" @clickMenu="toggleMenu"/>
    <Aside v-model="isOpen"/>

    <main class="app-content" :class="{'full': !isOpen}">
      <div class="app-page">
        <router-view @updateDate="updateSettingsDate"/>
      </div>
    </main>

    <ActionBtn/>
  </div>
</template>

<script>
import ActionBtn from "../components/button/ActionBtn.vue"
import Aside from "../components/Aside.vue"
import Navigation from "../components/Navigation.vue"
import {Database} from "../data/Database.js";


export default {
  title: "PageLayout",
  data: () => ({
    isOpen: true,
    now: null
  }),
  async mounted() {
    this.now = await Database.getNow()
  },
  methods: {
    async updateSettingsDate(updated) {
      this.now = updated
    },
    toggleMenu() {
      this.isOpen = !this.isOpen
    }
  },
  components: {
    ActionBtn,
    Aside,
    Navigation
  }
}
</script>

<style scoped>

</style>