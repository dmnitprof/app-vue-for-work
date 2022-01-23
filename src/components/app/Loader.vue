<template>
  <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status" :class="color">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loader',
  computed: {
    color () {
      const colors = ['text-primary', ' text-danger', 'text-success']
      return colors[Math.floor(Math.random() * 3)]
    }
  }
}
</script>

<style scoped>

</style>
