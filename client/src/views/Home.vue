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
<<<<<<< HEAD
  created() {
      this.$store.dispatch('parking/authenticate')
  },
=======
  created(){
    this.$store.dispatch('parking/getParkingData')
  }
>>>>>>> 0ca2a8e64427ca15345fdd225f89d140497d9ff9
};
</script>
