import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios'
import alert from './alert'
import dialog from './dialog'
import auth from './auth'
import router from '../router/index'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'sanbercode',
  Storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  modules: {
    alert,
    dialog,
    auth
  },
  state: {
    detailBlog: {},
    createBlog: {},
  },
  mutations: {
    SET_DETAILBLOG(state, payload) {
      state.detailBlog = payload
    },
    SET_CREATEBLOG(state, payload) {
      state.createBlog = payload
    }
  },
  actions: {
    getDetailBlog(context, payload) {
      axios({
        url: `/blog/${+payload}`,
        method: 'GET'
      })
        .then(response => {
          context.commit('SET_DETAILBLOG', response.data.blog)
        })
        .catch(err => {
          console.log(err)
        })
    },
    createBlog(context, payload) {
      let formData = new FormData()
      formData.append('photo', payload.fileInput)

      axios({
        url: `/blog`,
        method: 'POST',
        headers: {
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZGVtby1hcGktdnVlLnNhbmJlcmNsb3VkLmNvbS9hcGkvdjIvYXV0aC9sb2dpbiIsImlhdCI6MTYzMjQ2MTk0NiwiZXhwIjoxNjMyODYxOTA2LCJuYmYiOjE2MzI0NjE5NDYsImp0aSI6Im5jNWZ1MzdOQkY3dElHMzIiLCJzdWIiOjIxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.LJsREtkna8Ggf_36UHfx6uOa65n7QMBV5WGCZJ80_JQ'
        },
        data: {
          title: payload.message,
          description: payload.descriptionCreate,
        }
      })
        .then(response => {
          axios({
            url: `/blog/${response.data.blog.id}/upload-photo`,
            method: 'POST',
            headers: {
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZGVtby1hcGktdnVlLnNhbmJlcmNsb3VkLmNvbS9hcGkvdjIvYXV0aC9sb2dpbiIsImlhdCI6MTYzMjQ2MTk0NiwiZXhwIjoxNjMyODYxOTA2LCJuYmYiOjE2MzI0NjE5NDYsImp0aSI6Im5jNWZ1MzdOQkY3dElHMzIiLCJzdWIiOjIxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.LJsREtkna8Ggf_36UHfx6uOa65n7QMBV5WGCZJ80_JQ'
            },
            data: formData
          })
            .then(response => {
              router.push('/our-blogs')
              console.log(response)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
})
