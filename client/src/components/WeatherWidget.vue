<template>
    <v-card
      class="pb-5"
      max-width="400"
      elevation='0'
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">Mostar</v-list-item-title>
          <v-list-item-subtitle>Pon, 12:30 , Sunčano</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
  
      <v-card-text>
        <v-row align="center">
          <v-col class="display-1" cols="6">
            23&deg;C
          </v-col>
          <v-col cols="6">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sun.png"
              alt="Sunny image"
              width="30"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>
        <v-row no-gutters class="pl-5">
            <v-col cols="6">
                <v-icon size="14">mdi-send</v-icon> 23 km
            </v-col>
            <v-col cols="6">
                <v-icon>mdi-cloud-download</v-icon> 48%
            </v-col>
        </v-row> 
    </v-card>

</template>

<script>
export default {
    name : 'weather-widget'
}
</script>