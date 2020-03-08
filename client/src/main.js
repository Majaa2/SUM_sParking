import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

Vue.use(require('vue-moment'));

// export const SocketInstance = socketio('http://smart.sum.ba?withParkingSpaces=1s');
// Vue.use(VueSocketIO, SocketInstance, store)

// socketio.on('connection', function(socket){
//   console.log('hi')
// });

// socketio.on('parking-lot-state-change', function(data){
//     $scope.parkingSpaces.find(x => x.id === data.id_parking_space).occupied = data.occupied;
//     console.log(data)
//   })
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
import SelectedParkingSpace from './components/SelectedParkingSpace.vue'
Vue.component('selected-parking-space', SelectedParkingSpace)

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
    Vm.$router.push('/auth/login');
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
