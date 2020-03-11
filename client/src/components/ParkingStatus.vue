<template>
  <v-row dense>
    <v-col cols="8">
      <v-card class="mx-auto" color="#385F73" height="400" dark>
        <!-- {{selectedParking.title}} -->
        <gmap-map
          ref="mymap"
          :center="startLocation"
          :zoom="17.5"
          style="width: 100%; height: 400px"
        >
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
    <v-col>
      <v-card height="400" width="100%" class="pa-8">
        <v-avatar
          :color="selectedSpace.occupied?'red':'green'"
          size="72"
          style="border-radius: 50%; left: 40%"
        >
          <span class="white--text headline">{{selectedSpace.parkingSpaceTag}}</span>
        </v-avatar>
        <v-card-title>Parking position: {{selectedSpace.parkingSide}}</v-card-title>
        <v-card-subtitle>
          Parking is:
          <i v-if="selectedSpace.occupied">occupied</i>
          <i v-else>free</i>
        </v-card-subtitle>
        <v-card-text v-if="!selectedSpace.occupied">
          <v-form>
            <v-text-field v-model="name" label="Korisničko ime" required></v-text-field>
            <v-row no-gutters>
              <v-col cols="6" class="pr-3"> 
                <v-menu
                  ref="menu"
                  v-model="modal"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="date" label="Datum" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title @change="$refs.menu.save(date)" scrollable></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6" class="pl-3"> 
                <v-menu
                  ref="men"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Vrijeme"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    format="24"
                    full-width
                    @click:minute="$refs.men.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-btn color="success" class="mr-4" @click="save(selectedSpace.id)">Dodaj rezervaciju</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: [],
  computed: {
    ...mapState("parking", ["selectedParking", "users"])
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      time: null,
      menu2: false,
      startLocation: {
        lat: 43.346279,
        lng: 17.797821
      },
      name: "",
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
      },
      newRes: {
        userId: null,
        parkingId: null,
        rezervationTime: null
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
    },
    save(id) {
      // console.log(this.date+' '+this.time);
      let selectedTime = this.$moment(this.date+' '+this.time).format('YYYY-MM-DD HH:mm:ss')
      selectedTime = selectedTime + '+01'
      // console.log(selectedTime)
      this.newRes.rezervationTime= selectedTime
      this.newRes.parkingId = id;
      let user= this.users.find(user => {
        if (user.username == this.name) {
          return user.id;
        }
      });
      this.newRes.userId = user.id
      this.$store.dispatch("parking/addRezervation", this.newRes);
      this.$toaster.success("Rezervacija kreirana");
      this.name=""
      this.time= null
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