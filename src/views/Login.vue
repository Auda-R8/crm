<template>
  <form
      class="card auth-card"
      @submit.prevent="submitLogin">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>

      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{
              invalid: v$.email.$errors.length > 0,
              validate: v$.email.$errors.length === 0
            }"/>

        <label for="email">Email</label>

        <small
            v-if="this.email.length === 0 && v$.email.$dirty"
            class="helper-text invalid"
        >Поле не должно быть пустым</small>

        <small
            v-else-if="v$.email.$error"
            class="helper-text invalid"
        >Введите корректный E-Mail</small>

      </div>

      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model="password"
            :class="{
              invalid: v$.password.$errors.length > 0,
              validate: v$.password.$errors.length === 0
            }"
        />

        <label for="password">Пароль</label>

        <small
            v-if="this.password.length === 0 && v$.password.$dirty"
            class="helper-text invalid">
          Поле не должно быть пустым</small>

        <small
            v-else-if="this.password.length < 6 && v$.password.$dirty"
            class="helper-text invalid">Пароль должен содержать минимум 6 символов, ваш пароль:
          {{ this.password.length }} символов</small>
      </div>

    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/registration">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {useVuelidate} from '@vuelidate/core'
import {required, email, minLength} from '@vuelidate/validators'
import {Database} from "../data/Database.js"
import store from "../store/store.js";

export default {
  name: "Login",
  setup() {
    return {v$: useVuelidate()}
  },
  data: () => ({
    email: '',
    password: ''
  }),
  validations() {
    return {
      email: {email, required},
      password: {required, minLength: minLength(6)}
    }
  },
  mounted() {
    if (this.$route.query['message'] === 'logout')
      this.$message('Вы вышли из системы')
  },
  methods: {
    async submitLogin() {
      if (this.v$.$invalid) this.v$.$touch()
      else {
        this.v$.$reset()
        if (await Database.loginUser(this.email, this.password)) {
          await Database.setActiveUser(this.email)
          this.$router.push('/')
          this.$message('Вы успешно авторизовались')
        } else this.printUserNotFound()
      }
    },
    printUserNotFound() {

    }
  }
}
</script>

<style scoped>

</style>