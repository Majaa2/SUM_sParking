import Vue from "vue";
import { cloneDeep } from "lodash";

//services
import ParkingService from '../../services/parking.js'

export default {
    namespaced: true,
    state: {
        isConnected: false,
        socketMessage: '',
        weatherData: {}
    },
    getters: {

    },
    mutations: {
        SOCKET_CONNECT(state) {
            state.isConnected = true;
        },

        SOCKET_DISCONNECT(state) {
            state.isConnected = false;
        },

        SOCKET_MESSAGECHANNEL(state, message) {
            console.log(message);
            state.socketMessage = message
        },
        SET_WEATHER_DATA(state, data){
            state.weatherData = data
        }
    },
    actions: {
        async getParkingData(){
            let data = await ParkingService.getParkingSpaces();
            console.log(data)
        },
        async getWeatherData(context){
            let data = await ParkingService.getWeatherData();
            context.commit('SET_WEATHER_DATA',data)
        },
    }
}