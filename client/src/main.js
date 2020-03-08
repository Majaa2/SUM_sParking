import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
