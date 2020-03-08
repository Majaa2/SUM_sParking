import axios from "axios";
import Vue from "vue";

export default {
    getParkingSpaces(){
        return axios.get('http://smart.sum.ba/parking?withParkingSpaces=1').then(response=>{
            if(response && response.status == 200){
                return response.data
            }
        })
    }
}