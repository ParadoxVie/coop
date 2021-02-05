import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
require("./assets/main.scss")

window.api = axios.create({
  baseURL: 'https://tools.sopress.net/iut/coop/api/',
  headers: { Authorization: '5f115f121fd2ed7f3327af8ae65929afad0b8b94' }
});

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  beforeCreate() {
    window.api.interceptors.request.use(config => {
      if(this.$store.state.token) {
        config.url+='?token='+this.$store.state.token
      }
      return config;
    })
  },
  render: h => h(App)
}).$mount('#app')
