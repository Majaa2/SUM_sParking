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
        this.$store.dispatch('parking/changeParkingState', data)
    });
  },
};
</script>
