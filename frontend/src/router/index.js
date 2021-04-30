import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import User_Main from '@/components/user/Main'
import User_Main_Bikes from '@/components/user/main/Bikes'
import User_Main_Orders from '@/components/user/main/Orders'
import User_Main_Me from '@/components/user/Main/me'

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
      component: User_Main,
      redirect: { name: 'User_Main_Bikes' },
      children: [
        {
          name: 'User_Main_Bikes',
          path: 'bikes',
          component: User_Main_Bikes
        },
        {
          name: 'User_Main_Orders',
          path: 'orders',
          component: User_Main_Orders
        },
        {
          name: 'User_Main_Me',
          path: 'me',
          component: User_Main_Me
        }
      ]
    }
  ]
})
