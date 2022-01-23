<template>
  <div>
    <Loader v-if="loading" class="mt-5"/>
    <div class="main-layout" v-else>
      <Header/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '../components/app/Header'
import Loader from '../components/app/Loader'

export default {
  name: 'MainLayout',
  components: {
    Loader,
    Header
  },
  data () {
    return {
      loading: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  }
}
</script>

<style scoped>

</style>
