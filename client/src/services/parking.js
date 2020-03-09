import axios from "axios";
import Vue from "vue";

export default {
    getParkingSpaces(){
        return axios.get('http://smart.sum.ba/parking?withParkingSpaces=1').then(response=>{
            if(response && response.status == 200){

                let parking = response.data[0].parkingSpaces
                let parkingSpaces = []
                parking.forEach(space => {
                    let ParkingSpace
                    if(space.id<20){
                        ParkingSpace={
                            id: space.id,
                            occupied: space.occupied,
                            lat: space.lat,
                            lng: space.lng,
                            parkingType: space.type,
                            parkingSpaceTag: 'S-'+space.id,
                            parkingSide: 'Skripta',
                            is_visible:space.is_visible
                        }
                    }else if( space.id>20 && space.id<40){
                        ParkingSpace={
                            id: space.id,
                            occupied: space.occupied,
                            lat: space.lat,
                            lng: space.lng,
                            parkingType: space.type,
                            parkingSpaceTag: 'I-'+space.id,
                            parkingSide: 'Igralište',
                            is_visible:space.is_visible
                        }
                    }else{
                        ParkingSpace={
                            id: space.id,
                            occupied: space.occupied,
                            lat: space.lat,
                            lng: space.lng,
                            parkingType: space.type,
                            parkingSpaceTag: 'G-'+space.id,
                            parkingSide: 'Glavni',
                            is_visible:space.is_visible
                        }
                    }
                    parkingSpaces.push(ParkingSpace);
                });
                return parkingSpaces;
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
        // console.log(user)
        return axios.post('/api/login', user).then(response=>{
            if(response.data.success) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                localStorage.setItem('id_token', 'Bearer ' + response.data.token);
                return response.data.data.user;
            }
        })
    },
    getRoles(){
        return axios.get('/api/roles').then(response=>{
            if(response.data.success){
                return response.data.data
            }
        })
    },
    registerUser(newUser){
        return axios.post('/api/register',newUser).then(response=>{
            if(response.data.success){
                return response.data
            }
        })
    },
}