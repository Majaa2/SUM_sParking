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
        authenticated: false,
        user: {}
    },
    getters: {
        isAuth: state => {
            return state.authenticated;
        },
        currentUser(state) {
            return state.user;
        },
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
        }
    },
    actions: {
        async getParkingData() {
            let data = await ParkingService.getParkingSpaces();
            // console.log(data)
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