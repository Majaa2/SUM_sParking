<template>
    <v-card
      class="pb-5"
      max-width="400"
      elevation='0'
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">{{weatherData.city}}</v-list-item-title>
          <v-list-item-subtitle><span>{{ new Date() | moment("dddd, MMMM Do YYYY HH:mm") }},</span> <br> {{weatherData.weather}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
  
      <v-card-text style="background-color:lightblue">
        <v-row align="center">
          <v-col class="display-1" cols="6">
            {{weatherData.temperature}}&deg;C
          </v-col>
          <v-col cols="6">
            <v-img
              :src= weatherData.icon
              alt="Sunny image" 
              width="100%"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>
        <v-row no-gutters class="pl-5">
            <v-col cols="6">
                <v-icon size="14">mdi-send</v-icon> {{weatherData.wind}}kmh
            </v-col>
            <v-col cols="6">
                <v-icon>mdi-cloud-download</v-icon> {{weatherData.humidity}}%
            </v-col>
        </v-row> 
    </v-card>

</template>

<script>
import {mapState, mapGetters} from 'vuex'
export default {
    name : 'weather-widget',
    computed: {
    ...mapState('parking',['weatherData'])
    }
}
</script>