import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import loader from './components/app/Loader'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import { VueDraggableNext } from 'vue-draggable-next'

firebase.initializeApp({
  apiKey: 'AIzaSyCkCQMJXDc284S2ZCRByJ50b17lsMrETyo',
  authDomain: 'vue-app-reg-login.firebaseapp.com',
  projectId: 'vue-app-reg-login',
  storageBucket: 'vue-app-reg-login.appspot.com',
  messagingSenderId: '148281135700',
  appId: '1:148281135700:web:f9c275225e62427ae193c1',
  databaseURL: 'https://vue-app-reg-login-default-rtdb.europe-west1.firebasedatabase.app/'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .component('loader', loader)
      .component('Draggable', VueDraggableNext)
      .use(messagePlugin)
      .use(store)
      .use(router)
      .mount('#app')
  }
})
