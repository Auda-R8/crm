<template>
  <component :is="layout">

  </component>
</template>

<script>
import PageLayout from "./layouts/PageLayout.vue"
import LoginLayout from "./layouts/LoginLayout.vue"

  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || 'LoginLayout')
      }
    },
    components: {
      PageLayout,
      LoginLayout
    }
  }
</script>


<style scoped>
</style>
