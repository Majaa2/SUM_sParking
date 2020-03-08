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
        return axios.get('https://api.openweathermap.org/data/2.5/weather?q=Mostar&appid=d89ef06d2bccbb7f7fa14fa0bff0eb9e').then(response=>{
            if(response && response.status == 200){    
                let temp =response.data.main.temp - 273.15
                let weatherData={
                    city: response.data.name,
                    weather: response.data.weather[0].description,
                    temperature: Math.round(temp),
                    humidity: response.data.main.humidity,
                    wind: Math.round(response.data.wind.speed* 1.61), 
                    icon: 'http://openweathermap.org/img/wn/'+response.data.weather[0].icon+'@2x.png'
                }
                return weatherData
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