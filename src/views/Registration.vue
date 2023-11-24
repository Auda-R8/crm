<template>
  <form class="card auth-card"
        @submit.prevent="submitRegistration">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>

      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{
              invalid: v$.email.$errors.length > 0
            }">
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
            v-model.trim="password"
            :class="{
              invalid: v$.password.$errors.length > 0 || !isPasswordMatch()
              }"
        >
        <label for="password">Придумайте пароль</label>
        <small
            v-if="this.password.length === 0 && v$.password.$dirty"
            class="helper-text invalid">Поле не должно быть пустым</small>

        <small
            v-else-if="this.password.length < 6 && v$.password.$dirty"
            class="helper-text invalid">Пароль должен содержать минимум 6 символов, ваш пароль:
          {{ this.password.length }} символов</small>

        <small
            v-else-if="!isPasswordMatch()"
            class="helper-text invalid">Пароли не совпадают</small>

      </div>
      <div class="input-field">
        <input
            id="passwordRepeat"
            type="password"
            v-model="passwordRepeat"
            :class="{invalid: v$.passwordRepeat.$errors.length > 0 || !isPasswordMatch()}"
        >
        <label for="password">Подтвердите пароль</label>

        <small
            v-if="this.passwordRepeat.length === 0 && v$.passwordRepeat.$dirty"
            class="helper-text invalid">Поле не должно быть пустым</small>

        <small
            v-else-if="this.passwordRepeat.length < 6 && v$.passwordRepeat.$dirty"
            class="helper-text invalid">Пароль должен содержать минимум 6 символов, ваш пароль:
          {{ this.passwordRepeat.length }} символов</small>

        <small
            v-else-if="!isPasswordMatch()"
            class="helper-text invalid">Пароли не совпадают</small>


      </div>

      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model="name"
            :class="{invalid: v$.name.$errors.length > 0}"
        >
        <label for="name">Имя</label>
        <small
            v-if="name.length === 0 && v$.name.$dirty"
            class="helper-text invalid">Поле не должно быть пустым</small>
      </div>

      <p>
        <label>
          <input
              type="checkbox"
              v-model="agree"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
      <small
          v-if="!this.agree && v$.agree.$dirty"
          class="helper-text invalid">Вы <b>должны</b> согласиться <br> Иначе останетесь без аккаунта ;)</small>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {useVuelidate} from '@vuelidate/core'
import {email, required, minLength} from "@vuelidate/validators"
import {Database} from "../data/Database.js"

export default {
  name: "Registration",
  setup() {
    return {v$: useVuelidate()}
  },
  data: () => ({
    email: '',
    password: '',
    passwordRepeat: '',
    name: '',
    agree: false
  }),
  validations() {
    return {
      email: {email, required},
      password: {required, minLength: minLength(6)},
      passwordRepeat: {required, minLength: minLength(6)},
      name: {required},
      agree: {required}
    }
  },
  methods: {
    isPasswordMatch() {
      return this.password === this.passwordRepeat
    },
    async submitRegistration() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        this.$message('Вы не заполнили поля, или заполнили неправильными данными')
      } else {
        this.v$.$reset()
        await Database.addNewUser(this.email, this.password, this.name)
        this.$router.push('/')
        this.$message('Регистрация прошла успешно')
      }
    }
  }
}
</script>

<style scoped>

</style>