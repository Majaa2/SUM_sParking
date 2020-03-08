<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <user-info/>
    
    <weather-widget/>
    <v-divider></v-divider>
     <v-date-picker class ="pa-3" width="100%" elevation='0' no-title v-model="picker"></v-date-picker>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#3E3891"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>SUM sParking</v-toolbar-title>
    </v-app-bar>


      <v-container
      >
      <parking-indicator/>
      <parking-status/>
      </v-container>

    <v-footer
      color="#3E3891"
      app
    >
      <span class="white--text">SUM&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name : 'navbar',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      picker: new Date().toISOString().substr(0, 10)
    }),
  }
</script>

<style>

</style>