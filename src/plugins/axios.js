import Vue from 'vue'   // in Vue 2
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const instance = axios.create({
  baseURL: 'https://demo-api-vue.sanbercloud.com/api/v2'
})

export default instance
