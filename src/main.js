import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
require("./assets/main.scss")

window.api = axios.create({
  baseURL: 'https://allweb.fun/coop/api/',
  headers: { Authorization: '378d495614cba0f6da29ecc3c551b7070c21a008' }
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
