<template>
  <div class="container">
    <div class="home mb-3">
      <form class="d-flex flex-column m-3" @submit.prevent="submitHandler">
        <div class="input-group mb-2">
          <span class="input-group-text" id="basic-addon1"><i class="bi bi-plus-circle"></i></span>
          <input type="text"
                 class="form-control"
                 placeholder="Название"
                 aria-label="title"
                 aria-describedby="basic-addon1"
                 v-model.trim="title"
                 :class="{invalid: v$.title.$errors.length }"
          >
        </div>
        <small class="text-danger mt-1" v-if="v$.title.$dirty && v$.title.required.$invalid">
          Введите название
        </small>
        <div class="input-group mb-2">
          <span class="input-group-text"><i class="bi bi-pencil-square"></i></span>
          <textarea
            class="form-control"
            aria-label="With textarea"
            placeholder="Текст записи"
            v-model.trim="text"
            :class="{invalid: v$.text.$errors.length }"
          ></textarea>
        </div>
        <small class="text-danger mt-1" v-if="v$.text.$dirty && v$.text.required.$invalid">
          Введите текст
        </small>
        <div class="button d-flex justify-content-end">
          <button type="submit" class="btn btn-primary">Добавить</button>
        </div>
      </form>
      <Loader v-if="loading"/>
      <p v-else-if="!records.length">Записей пока нет</p>
      <div class="records d-flex flex-wrap" v-else>
        <table class="table table-dark table-striped mt-3">
          <tbody>
          <tr v-for="record in  records" :key="record.id">
            <td>
              <div>{{ record.title }}</div>
            </td>
            <td>
              <Editable
                class="recordText"
                :content="record.text"
                @update="record.text = $event"
                @blur="updateRecord(record.text, record.id)"
              />
            </td>
            <td>
              <small
                class="text-small"
                :class="{ 'text-danger': record.date !== currentDate}">
                {{ record.dateTime }}</small>
            </td>
            <td>
              <div class="text-nowrap"
                   :class="{ 'updated': record.status === 'обновлено',
                   'created' : record.status === 'создано',
                   }"
              >
                {{ record.status }}
              </div>
            </td>
            <td>
              <button type="button" @click="removeRecord(record.id)"><i class="bi bi-x-circle-fill"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <Toast @closeToast="closeToast" @sendMsg="message" :message="message"/>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Loader from '../components/app/Loader'
import Toast from '../components/app/Toast'
import Editable from '../components/Editable'

export default {
  name: 'home',
  components: {
    Toast,
    Loader,
    Editable
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      message: '',
      hide: false,
      title: '',
      text: '',
      records: [],
      loading: true,
      currentDate: new Date().toLocaleDateString(),
      currentValue: ''
    }
  },
  validations () {
    return {
      title: {
        required
      },
      text: {
        required
      }
    }
  },
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecords')
    console.log(this.records)
    this.loading = false
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        title: this.title,
        text: this.text
      }
      try {
        this.loading = true
        await this.$store.dispatch('addRecord', formData)
        this.records = await this.$store.dispatch('fetchRecords')
        this.title = this.text = ''
        this.v$.$reset()
        this.message = this.$message('Запись создана')
        this.hideRecord()
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    },
    async removeRecord (id) {
      // this.loading = true
      await this.$store.dispatch('removeRecord', id)
      this.records = this.records.filter(el => el.id !== id)
      this.message = this.$message(`Запись c ${id.toLocaleString()} удалена`)
      this.hideRecord()
      // this.loading = false
    },
    async updateRecord (text, id) {
      // this.loading = true
      await this.$store.dispatch('updateRecord', {
        text,
        id
      })
      this.records = await this.$store.dispatch('fetchRecords')
      this.message = this.$message('Запись обновлена')
      this.hideRecord()
      // this.loading = false
    },
    hideRecord () {
      setTimeout(() => {
        this.message = ''
      }, 3000)
    },
    closeToast () {
      this.hide = !this.hide
    }
  }
}
</script>

<style scoped>
.table {
  white-space: break-spaces;
  word-break: break-word;
}

.updated {
  color: mediumseagreen;
}

.created {
  color: dodgerblue;
}

.recordText {
  min-width: 1rem;
}

.recordText:focus {
  border: 1px solid white;
}

</style>
