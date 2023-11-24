<template>
  <ul
      class="sidenav app-sidenav"
      :class="{open: isOpen}"
  >
      <li
          v-for="route in routes"
          :key="route.url"
          :class="{'active': $route.path === route.url}"
      >
        <router-link
           :to="route.url"
           class="waves-effect waves-orange pointer">
          {{route.title}}
        </router-link>
      </li>
  </ul>
</template>

<script>
export default {
  name: "Aside",
  props: {
    modelValue: {
      type: Boolean
    }
  },
  data: () => ({
    routes: [
      {title: 'Счет', url: '/'},
      {title: 'История', url: '/history'},
      {title: 'Планирование', url: '/planning'},
      {title: 'Новая запись', url: '/record'},
      {title: 'Категории', url: '/categories'},
      {title: 'Настройки', url: '/settings'}
    ]
  }),
  computed: {
    isOpen: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      }
    }
  }
}
</script>

<style scoped>

</style>