<template>
  <h2>Вход</h2>
  <form class="p-3 w-75 m-auto" @submit.prevent="submitHandler">
    <div class="mb-3 d-flex flex-column">
      <label for="email-login" class="form-label">Email</label>
      <input type="email"
             class="form-control"
             id="email-login"
             aria-describedby="emailHelp"
             v-model.trim="email"
             placeholder="Введите email"
             :class="{invalid: v$.email.$errors.length }"
      >
      <small class="text-danger mt-1" v-if="v$.email.$dirty && v$.email.required.$invalid">email не должен быть
        пустым</small>
      <small class="text-danger mt-1" v-else-if="v$.email.$dirty && v$.email.email.$invalid">Введите корректный
        email</small>
    </div>
    <div class="mb-3">
      <label for="password-login" class="form-label">Пароль</label>
      <input type="password"
             class="form-control"
             id="password-login"
             placeholder="Введите пароль"
             v-model.trim="password"
             :class="{invalid: v$.password.$errors.length }"
      >
      <small class="text-danger mt-1" v-if="v$.password.$dirty && v$.password.required.$invalid">
        Введите пароль
      </small>
      <small class="text-danger mt-1" v-else-if="v$.password.$dirty && v$.password.minLength.$invalid">
        Пароль должен быть минимум <span class="text-secondary">{{ v$.password.minLength.$params.min }}</span> символов.
        Сейчас он:
        <span class="text-secondary">{{ password.length }}&nbsp;</span>
        <span v-if="password.length === 1">символ</span>
        <span v-else-if="password.length > 1 && password.length < 5">символа</span>
        <span v-else-if="password.length >= 5">символов</span>
      </small>
    </div>
    <button type="submit" class="btn btn-primary">Войти</button>
    <p class="mt-2">Нет аккаунта?
      <router-link to="/register">регистрация</router-link>
    </p>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
  name: 'login',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations () {
    return {
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  mounted () {},
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        await this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
