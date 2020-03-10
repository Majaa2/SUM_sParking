<template>
  <v-card elevation="0">
    <v-container>
      <v-row>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex" @click="selectParking(card)">
          <v-card shaped elovation="4">
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
              <v-card-text style="text-color:white;">
                {{card.occupied.length}}/{{card.spaces.length}}
                <v-progress-linear color="light-blue" height="10" :value="(card.occupied.length/(card.spaces.length)*100)" striped></v-progress-linear>
              </v-card-text>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  
</template>

<script>
import {mapState, mapGetters} from 'vuex'
export default {
  props:['selectedParking'],
  computed: {
  ...mapState('parking',['parkingData']),
  ...mapGetters('parking',['returnParkingData']),
  glavni(){
    return this.returnParkingData.filter(space=> space.parkingSide=='Glavni')
  },
  igraliste(){
    return this.returnParkingData.filter(space=> space.parkingSide=='Igralište')
  },
  skripta(){
    return this.returnParkingData.filter(space=> space.parkingSide=='Skripta')
  },
  cards(){
    return [
      {
          title: "Glavni",
          src: require('@/assets/sum_glavni.jpg'),
          flex: 4,
          spaces: this.glavni,
          occupied: this.glavni.filter(s=> s.occupied)
        },
        {
          title: "Igralište",
          src: require('@/assets/sum_igraliste.jpg'),
          flex: 4,
          spaces: this.igraliste,
          occupied: this.igraliste.filter(s=> s.occupied)
        },
        {
          title: "Skripta",
          src: require('@/assets/sum_skripta.jpg'),
          flex: 4,
          spaces: this.skripta,
          occupied: this.skripta.filter(s=> s.occupied)
        }
    ]
  }
},
  data() {
    return {
    };
  },
  created() {
    // console.log(this.parkingData)
  },
  methods:{
    selectParking(data){
      this.$store.dispatch("parking/selectParking",data)
    }
  },
  watch:{
    
  }
};
</script>