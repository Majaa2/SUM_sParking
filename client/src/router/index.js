import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import store from "../store/modules/parking.js";

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ]
});

router.beforeEach((to, from, next) => {
  let user = store.state.authenticated;
  console.log(user)
  if (user === false && to.path !== '/login') { 
  	next('/login')
  } else {
  	next()
  }
});

export default router;
