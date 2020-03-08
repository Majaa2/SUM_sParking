<template>
  <v-card elevation="0">
    <v-container>
      <v-row>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card shaped elovation="4">
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
              <v-card-text class="text--primary">
                <v-progress-linear color="light-blue" height="10" value="10" striped></v-progress-linear>
              </v-card-text>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: "Glavni",
          src: require('@/assets/sum_glavni.jpg'),
          flex: 4
        },
        {
          title: "Igralište",
          src: require('@/assets/sum_igraliste.jpg'),
          flex: 4
        },
        {
          title: "Skripta",
          src: require('@/assets/sum_skripta.jpg'),
          flex: 4
        }
      ]
    };
  }
};
</script>