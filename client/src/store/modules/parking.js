import Vue from "vue";
import { cloneDeep } from "lodash";
import User from "@/models/User";
import createPersistedState from "vuex-persistedstate";
import router from '@/router/index'


//services
import ParkingService from '../../services/parking.js'

export default {
    namespaced: true,
    state: {
        isConnected: false,
        socketMessage: '',
        weatherData: {},
        parkingData: [],
        authenticated: false,
        user: {},
        selectedParking: {}
    },
    getters: {
        isAuth: state => {
            return state.authenticated;
        },
        currentUser(state) {
            return state.user;
        },
        returnParkingData(state){
            return state.parkingData;
        }
    },
    mutations: {
        AUTHENTICATE(state) {
            state.authenticated = true;
        },
        LOGIN(state) {
            state.user = User.from(localStorage.id_token.replace("Bearer ", ""));
        },
        LOGOUT(state) {
            state.authenticated = false;
            state.user = null;
        },
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
        },
        SET_PARKING_DATA(state,data){
            state.parkingData = data
        },
        SET_SELECTED_PARKING(state,data){
            state.selectedParking = data
        }
    },
    actions: {
        async getParkingData(context) {
            let data = await ParkingService.getParkingSpaces();
<<<<<<< HEAD
            console.log(data)
=======
            context.commit('SET_PARKING_DATA',data)
>>>>>>> 0ca2a8e64427ca15345fdd225f89d140497d9ff9
        },
        async getWeatherData(context) {
            let data = await ParkingService.getWeatherData();
            context.commit('SET_WEATHER_DATA',data)
        },
        logout(context) {
            context.commit("LOGOUT");
        },
        authenticate(context) {
            context.commit("LOGIN");
        },
        selectParking(context,data){
            context.commit("SET_SELECTED_PARKING",data)
        },
        async userLogin(context, user) {

            let loggedUser = await ParkingService.userLogin(user)

            context.commit("AUTHENTICATE")
            context.commit("LOGIN");
            if (loggedUser.role_name === 'admin') {
                router.push('/');
            }
        }
    },
    plugins: [createPersistedState()]
}