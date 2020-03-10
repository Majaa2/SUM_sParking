<template>
  <v-row dense>
    <v-col cols="8">
      <v-card class="mx-auto" color="#385F73" height="400" dark>
        <!-- {{selectedParking.title}} -->
        <gmap-map ref="mymap" :center="startLocation" :zoom="20" style="width: 100%; height: 400px">
          <gmap-info-window
            :options="infoOptions"
            :position="infoPosition"
            :opened="infoOpened"
            @closeclick="infoOpened=false"
          >{{infoContent}}</gmap-info-window>

          <gmap-marker
            v-for="(item, key) in coordinates"
            :key="key"
            :position="getPosition(item)"
            :clickable="true"
            @click="toggleInfo(item, key)"
            :icon="item.occupied===1?'http://maps.google.com/mapfiles/ms/icons/red-dot.png': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'"
          />
        </gmap-map>
      </v-card>
    </v-col>
    <v-col >
      <v-card height="400" width="100%" class="pa-8">
        <v-avatar :color="selectedSpace.occupied?'red':'green'" size="72" style="border-radius: 50%; left: 40%">
          <span class="white--text headline">{{selectedSpace.parkingSpaceTag}}</span>
        </v-avatar>
        <v-card-title>
          Parking position: {{selectedSpace.parkingSide}}
        </v-card-title>
        <v-card-subtitle>
          Parking is: <i v-if="selectedSpace.occupied">occupied</i><i v-else>free</i>
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: [],
  computed: {
    ...mapState("parking", ["selectedParking"])
  },
  data() {
    return {
      startLocation: {
        lat: 43.346279,
        lng: 17.797821
      },
      coordinates: [],
      selectedSpace: {},
      infoPosition: null,
      infoContent: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  methods: {
    // receives a place object via the autocomplete component
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      };
    },
    toggleInfo: function(marker, key) {
      this.selectedSpace = marker;
      this.infoPosition = this.getPosition(marker);
      this.infoContent = marker.parking_space_id;
      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened;
      } else {
        this.infoOpened = false;
        this.infoCurrentKey = key;
      }
    }
  },
  created() {
    // console.log(this.selectedParking)
  },
  watch: {
    selectedParking(newData, oldData) {
      if (newData.spaces != oldData.spaces) {
        // newData.forEach(ele => {
        this.coordinates = newData.spaces;
        // });
      }
    }
  }
};
</script>