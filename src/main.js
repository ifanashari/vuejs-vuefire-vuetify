import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import 'vuetify/dist/vuetify.min.css'
import './firebase'

Vue.use(Vuetify, { theme: {
  primary: '#ff7517',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){
    if(this.$store.getters.getSign !== true){
      this.$router.push('/sign')
    } else{
      this.$router.push('/')
    }

    this.$store.dispatch('loadRooms')
    this.$store.dispatch('loadBookedRooms')
    this.$store.dispatch('loadAllRooms')
  }
})
