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
    this.$store.dispatch('parking/getWeatherData')
    this.$store.dispatch('parking/getUsers')
  }
};
</script>
