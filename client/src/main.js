import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import * as VueGoogleMaps from "vue2-google-maps";
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

Vue.use(Toaster,{
  timeout: 7000
})
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBTXC_FeumA9GLn-blssEZx9dZBy63gi6Y",
    libraries: "places" // necessary for places input
  }
});


Vue.use(require('vue-moment'));

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://smart.sum.ba/parking-events',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))


//components
import UserInfo from './components/UserInfo.vue'
Vue.component('user-info', UserInfo)
import NavBar from './components/NavBar.vue'
Vue.component('navbar', NavBar)
import WeatherWidget from './components/WeatherWidget.vue'
Vue.component('weather-widget', WeatherWidget)
import ParkingIndicator from './components/ParkingIndicator.vue'
Vue.component('parking-indicator', ParkingIndicator)
import ParkingStatus from './components/ParkingStatus.vue'
Vue.component('parking-status', ParkingStatus)
import GoogleMap from './components/GoogleMap.vue'
Vue.component('google-map', GoogleMap)
import ModalAddUser from './components/ModalAddUser.vue'
Vue.component('modal-add-user', ModalAddUser)
import Rezervations from './components/Rezervations.vue'
Vue.component('rezervations', Rezervations)

import axios from "axios";
Vue.prototype.$axios = axios.create({
  baseURL: "/api"
});

Vue.prototype.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token');
Vue.prototype.$axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    Vm.$store.dispatch('logout');
    Vm.$router.push('/login');
    localStorage.clear();
 
  }
  else if (error.response.status === 403){
    Vm.$router.push('/403');
  }
  else if(error.response.status === 500){
    Vm.$toasted.global.err({
      message : i18n.t('conn.err')
    });
  }
  return Promise.reject(error.response);
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
