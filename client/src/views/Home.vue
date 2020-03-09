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
      this.$store.dispatch('parking/userRoles')
  },
};
</script>
