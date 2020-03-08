<template>
    <div>
      <navbar/>
    </div>
</template>

<script>

export default {
  name: 'Home',
  
  data: () => ({
    //
  }),
  created(){
    this.$store.dispatch('parking/getWeatherData')
     this.$store.dispatch('parking/getParkingData')
  }
};
</script>
