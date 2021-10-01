import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/our-blogs',
    name: 'OurBlogs',
    component: () => import(/* webpackChunkName: "blogs" */ '../views/OurBlog.vue')
  },
  {
    path: '/detail-blog/:blogId',
    name: 'DetailBlog',
    component: () => import(/* webpackChunkName: "DetailBlog" */ '../views/DetailBlog.vue')
  },
  {
    path: '/create-blog',
    name: 'CreateBlog',
    component: () => import(/* webpackChunkName: "CreateBlog" */ '../views/CreateBlog.vue')
  },
  {
    path: '/edit-blog/:blogId',
    name: 'EditBlog',
    component: () => import(/* webpackChunkName: "EditBlog" */ '../views/EditBlog.vue') 
  },
  {
    path: '/*',
    redirects: '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
