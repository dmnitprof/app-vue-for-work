<template>
  <header class="p-3 bg-dark text-white d-flex">
    <div class="container">
      <span class="date mb-2 d-flex">{{ date.current }}</span>
      <div class="d-flex justify-content-between align-items-center">
        <ul class="nav  mb-2 justify-content-center">
          <li>
            <router-link class="nav-link px-2 text-white" to="/">Главная</router-link>
          </li>
          <li>
            <router-link class="nav-link px-2 text-white" to="/about">Инфо</router-link>
          </li>
          <li>
            <router-link class="nav-link px-2 text-white" to="/leftovers">Остатки</router-link>
          </li>
        </ul>
        <div class="dropdown mt-2 d-flex">
          <button class="btn btn-secondary dropdown-toggle small" type="button" id="dropdownMenu2" data-bs-toggle="dropdown"
                  aria-expanded="false">
            {{ name }}&nbsp;(<small class="text-info">{{role}}</small>)&nbsp;
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li>
              <button class="dropdown-item" type="button">Профиль</button>
            </li>
            <li>
              <button class="dropdown-item" type="button" @click.prevent="logout">Выйти</button>
            </li>
          </ul>
        </div>
      </div>
      <hr/>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      date: {
        current: new Date().toLocaleString(),
        options: {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }
      },
      interval: null
    }
  },
  computed: {
    name () {
      return this.$store.getters.info.name
    },
    role () {
      return this.$store.getters.info.role
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      await this.$router.push('/login?message=logout')
    },
    dateFilter (value, format = 'date') {
      const options = {}
      if (format.includes('date')) {
        options.year = this.date.options.year
        options.month = this.date.options.month
        options.day = this.date.options.day
      }
      if (format.includes('time')) {
        options.hour = this.date.options.hour
        options.minute = this.date.options.minute
        options.second = this.date.options.second
      }
      return new Intl.DateTimeFormat('ru-Ru', options).format()
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.date.current = this.dateFilter(this.date.current, 'datetime')
    }, 1000)
  },
  beforeUnmount () {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.router-link-active {
  color: brown !important;
}
</style>
