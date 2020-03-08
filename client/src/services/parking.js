import axios from "axios";
import Vue from "vue";

export default {
    getParkingSpaces(){
        return axios.get('http://smart.sum.ba/parking?withParkingSpaces=1').then(response=>{
            if(response && response.status == 200){
                return response.data
            }
        })
    },
    getWeatherData(){
        return axios.get('http://api.openweathermap.org/data/2.5/weather?q=Mostar&appid=d89ef06d2bccbb7f7fa14fa0bff0eb9e').then(response=>{
            if(response && response.status == 200){    
                console.log(response.data)
            }
        })
    },
    userLogin(user){
        console.log(user)
        return axios.post('http://localhost:3000/api/login', user).then(response=>{
            if(response.data.success) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                localStorage.setItem('id_token', 'Bearer ' + response.data.token);
                return response.data.data.user;
            }
        })
    }
}