<template>
  <div>
    <gmap-map ref="mymap" :center="startLocation" :zoom="14" style="width: 100%; height: 300px">

      <gmap-info-window :options="infoOptions" :position="infoPosition" :opened="infoOpened" @closeclick="infoOpened=false">
        {{infoContent}}
      </gmap-info-window>

      <gmap-marker v-for="(item, key) in coordinates" :key="key" :position="getPosition(item)" :clickable="true" @click="toggleInfo(item, key)" />

    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
        startLocation: {
      lat: 43.346279,
      lng: 17.797821
    },
    coordinates: {
          0:{fullName: 'Mladen Raguž', lat: 43.34658412876357, lng: 17.79782064601684},
          1:{fullName: 'Mladen Raguž', lat: 43.34655412876357, lng: 17.79781564601684},
          2:{fullName: 'Mladen Raguž', lat: 43.34652412876357, lng: 17.79781064601684},
          3:{fullName: 'Mladen Raguž', lat: 43.34649412876357, lng: 17.79780564601684}

      },
    infoPosition: null,
    infoContent: null,
    infoOpened: false,
    infoCurrentKey: null,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35
      }
    },
      
    };
  },

  mounted() {
  },

  methods: {
    // receives a place object via the autocomplete component
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
    },
    toggleInfo: function(marker, key) {
      this.infoPosition = this.getPosition(marker);
      this.infoContent = marker.fullName;
      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened;
      } else {
        this.infoOpened = true;
        this.infoCurrentKey = key;
      }
  }
  }
};
</script>