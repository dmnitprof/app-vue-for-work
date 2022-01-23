<template>
  <div contenteditable="true" @input="update" @keypress="sortValue"></div>
</template>

<script>
export default {
  name: 'editable',
  props: ['content'],
  mounted () {
    this.$el.innerText = this.content
  },
  methods: {
    update (event) {
      this.$emit('update', event.target.innerText.trim())
    },
    sortValue (event) {
      if (event.key.match(/[\d]/g)) {
        this.$emit('sortValue', event.target.innerText.trim())
        // replace(/[^\d]/g, '')
      } else {
        event.preventDefault()
      }
    }
  },
  watch: {
    content () {
      this.$el.innerText = this.content
    }
  }
}
</script>

<style scoped>

</style>
