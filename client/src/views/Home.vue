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
  created() {
      this.$store.dispatch('parking/authenticate')
      this.$store.dispatch('parking/getParkingData')
      
       this.sockets.subscribe('parking-lot-state-change', (data) => {
         if(data.occupied){
           this.$toaster.success('Parkirno mjesto '+data.id_parking_space+' je zauzeto')
         }
         else{
           this.$toaster.success('Parkirno mjesto '+data.id_parking_space+' je oslobođeno')
         }
        //this.$store.dispatch('parking/changeParkingState', data)
    });
      this.$store.dispatch('parking/userRoles')
  },
};
</script>
