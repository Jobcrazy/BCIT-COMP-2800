import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import User_Main from '@/components/user/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/main',
      name: 'User_Main',
      component: User_Main
    }
  ]
})
