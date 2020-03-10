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
        selectedParking: {},
        roles: [],
        showReservations: false
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
        },
        SET_USER_ROLES(state,roles){
            state.roles = roles
        },
        CHANGE_PARKING_STATE(state, data){
            // console.log(data)
            state.parkingData.filter(p=>{
                if(p.id == data.id_parking_space){
                    p.occupied = data.occupied
                }
            })
        },
        SET_SHOW_RESERVATIONS(state){
            state.showReservations = !state.showReservations 
        }
    },
    actions: {
        async getParkingData(context) {
            let data = await ParkingService.getParkingSpaces();
            context.commit('SET_PARKING_DATA',data)
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
        async userRoles(context){
            let roles = await ParkingService.getRoles()
            // console.log(roles, 'action')
            context.commit('SET_USER_ROLES',roles)
        },
        async userLogin(context, user) {

            let loggedUser = await ParkingService.userLogin(user)

            context.commit("AUTHENTICATE")
            context.commit("LOGIN");
            if (loggedUser.role_name === 'admin') {
                router.push('/');
            }
        },
        async createNewUser(context, newUser){
            let response = await ParkingService.registerUser(newUser)
            // console.log(response)
        },
        changeParkingState(context, data){
            context.commit('CHANGE_PARKING_STATE', data)
        },
         changeView(context){
             context.commit('SET_SHOW_RESERVATIONS')
         }
         
     
    },
    plugins: [createPersistedState()]
}