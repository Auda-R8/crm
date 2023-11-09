<template>
  <div class="app-main-layout">
    <Navigation/>
    <Aside/>

    <router-view/>

    <ActionBtn/>
  </div>
</template>

<script>
import ActionBtn from "../components/btns/ActionBtn.vue"
import Aside from "../components/Aside.vue"
import Navigation from "../components/Navigation.vue"


export default {
  name: "PageLayout",
  components: {
    ActionBtn,
    Aside,
    Navigation
  }
}
</script>

<style scoped>

</style>