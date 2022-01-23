export default {
  install: (app, options) => {
    app.config.globalProperties.$message = function (msg) {
      return msg
    }
    app.config.globalProperties.$error = function (error) {
      return `[Ошибка]: ${error}`
    }
  }
}
