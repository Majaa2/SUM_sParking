<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <user-info :user='user'/>
    
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
      <v-toolbar-title>SUM sParking 
      </v-toolbar-title>
      <modal-add-user :userRoles='roles'/>
      
      <v-tooltip bottom v-if="showReservations">
      <template v-slot:activator="{ on }">
       <v-btn  v-on = 'on' class="mx-2" fab dark color="transparent" elevation="0" @click="showRes">
        
        <v-icon dark>mdi-home</v-icon>
    </v-btn>
      </template>
      <span>Home</span>
    </v-tooltip>
      <v-tooltip bottom v-else>
      <template v-slot:activator="{ on }">
      <v-btn v-on = 'on' class="mx-2" fab dark color="transparent" elevation="0" @click="showRes">
        <v-icon dark>mdi-format-list-bulleted-square</v-icon>
    </v-btn>
    </template>
      <span>Pregled rezervacija</span>
    </v-tooltip>
    </v-app-bar>

      <v-container v-if="showReservations">
        <rezervations :rezervations="rezervations" :users="users" :parkingData="parkingData"/>
        </v-container>
      <v-container v-else>
      <parking-indicator :selectedParking="selectedParking"/>
      <parking-status :selectedParking='selectedParking' :users='users'/>
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
import {mapState, mapGetters} from 'vuex'
  export default {
    name : 'navbar',
    props: {
      source: String,
    },
    computed:{
      ...mapState('parking', ['user', 'roles', 'showReservations','rezervations','users','parkingData']),
    },
    data: () => ({
      drawer: null,
      selectedParking:{},
      picker: new Date().toISOString().substr(0, 10),
    }),
     methods: {
      showRes(){
        this.$store.dispatch('parking/changeView')
     }
    },
  }
</script>

<style>

</style>