<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="this.$emit('clickMenu')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span ref="date" class="black-text"></span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            {{userName}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text"
                 @click.prevent="logout"
              >
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {Database} from "../data/Database.js"
import store from "../store/store.js"

export default {
  title: "Navigation",
  props: {
    date: {
      type: String,
      default: null
    }
  },
  data: () => ({
    interval: null,
    dropdown: null,
    userName: null,
    now: null
  }),
  async mounted() {
    this.userName = (await Database.getActiveUser()).name
    this.now = await Database.getNow()
    this.$refs.date.textContent = await Database.getNow()
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      closeOnClick: true,
      coverTrigger: false
    })
  },
  beforeDestroy() {
    if (this.dropdown && this.dropdown.destroy)
      this.dropdown.destroy
  },
  methods: {
    logout() {
      this.$router.push('/login?message=logout')
    }
  }
}
</script>

<style scoped>

</style>