<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  mounted(){
<<<<<<< HEAD
    this.$store.dispatch('parking/getParkingData')
    this.$store.dispatch('parking/getWeatherData')
  }
=======
    
    this.$store.dispatch('parking/getWeatherData')
    this.$store.dispatch('parking/authenticate')
    
  },
  
>>>>>>> 0ca2a8e64427ca15345fdd225f89d140497d9ff9
};
</script>
