<template>
  <div class="app">
    <div class="container-fluid">
      <component :is="layout">
        <router-view/>
      </component>
      <div class="position-fixed bottom-0 end-0 p-2 m-2 bg-secondary bg-opacity-75" style="z-index: 11"
           v-if="message"
      >
        <div class=" d-flex">
          <span class="text-break">{{ message }}&nbsp;</span>
          <button type="button" class="btn-close" aria-label="Close" @click="message = null"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout'
import MainLayout from './layouts/MainLayout'
import messages from './utils/messages'

export default {
  name: 'App',
  components: {
    EmptyLayout,
    MainLayout
  },
  data () {
    return {
      message: ''
    }
  },
  mounted () {
  },
  methods: {},
  computed: {
    error () {
      return this.$store.getters.error
    },
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    showMessage () {
      return messages[this.$route.query.message]
    }
  },
  watch: {
    error (fbError) {
      this.message = messages[fbError.code] || 'Что-то пошло не так!'
      setTimeout(() => {
        this.message = ''
      }, 3000)
    },
    showMessage (msg) {
      if (msg) {
        this.message = this.$message(msg)
        setTimeout(() => {
          this.message = ''
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss">
.app {
  text-align: center;
}
.invalid {
  box-shadow: 0 4px 4px brown, 0 4px 8px brown !important;
  border: 2px solid brown !important;
}
.updated {
  color: mediumseagreen!important;
}
.recordText:focus {
  white-space: nowrap;
  outline-color: brown;
  transition: .3s;
}

.recordText:hover {
  box-shadow: 0 1px 2px mediumseagreen, 0 2px 2px mediumseagreen;
  cursor: pointer;
}

.text-small {
  font-size: 0.7rem;
}
</style>
