<template>
  <h1>Регистрация</h1>
  <form class="p-3 w-75 m-auto" @submit.prevent="submitHandler">
    <div class="mb-3">
      <label for="name" class="form-control">
        <input type="text"
               class="form-control"
               id="name"
               v-model="name"
               placeholder="Введите Имя"
               :class="{invalid: v$.name.$errors.length }"
        >
      </label>
      <small class="text-danger mt-1" v-if="v$.name.$dirty && v$.name.required.$invalid">Имя не должно быть
        пустым</small>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label form-control">
        <input type="text"
               class="form-control" id="email"
               placeholder="Введите email"
               v-model="email"
               :class="{invalid: v$.email.$errors.length }"
        >
      </label>
      <small class="text-danger mt-1" v-if="v$.email.$dirty && v$.email.required.$invalid">email не должен быть
        пустым</small>
      <small class="text-danger mt-1" v-else-if="v$.email.$dirty && v$.email.email.$invalid">Введите корректный
        email</small>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label form-control">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="пароль"
          v-model="password"
          :class="{invalid: v$.password.$errors.length }"
        >
      </label>
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
    <div class="mb-3">
      <label for="password-confirm" class="form-label form-control">
        <input
          type="password"
          class="form-control"
          id="password-confirm"
          placeholder="подтверждение пароля"
          v-model="password_confirm"
          :class="{invalid: v$.password_confirm.$errors.length }"
        >
      </label>
      <small class="text-danger mt-1" v-if="v$.password_confirm.$dirty && v$.password_confirm.required.$invalid">
        Введите подтверждение пароля
      </small>
      <small class="text-danger" v-else-if="v$.password_confirm.$dirty && password !== password_confirm">Пароли не
        совпадают</small>
    </div>
    <div class="mb-3 form-check">
      <label class="form-check-label d-flex  ms-3" for="exampleCheck1">
        <input type="checkbox"
               class="form-check-input me-2"
               id="exampleCheck1"
               v-model="agree"
               :class="{invalid: v$.agree.$errors.length }"
        >
        <router-link to="/agree">Согласен с правилами</router-link>
      </label>
    </div>
    <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
    <p class="mt-2">Есть аккаунт?
      <router-link to="/login">войти</router-link>
    </p>
  </form>
</template>

<script>
import { email, minLength, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default {
  name: 'register',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      agree: false
    }
  },
  validations () {
    return {
      name: {
        required
      },
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(6)
      },
      password_confirm: { required },
      agree: { checked: v => v }
    }
  },
  methods: {
    async submitHandler () {
      console.log(this.v$.$invalid)
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData)
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
