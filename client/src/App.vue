<template>
  <v-app>
    <v-content>
      <navBar/>
      
    </v-content>
  </v-app>
</template>

<script>
import navBar from './components/NavBar';

export default {
  name: 'App',

  components: {
     navBar,
  },

  data: () => ({
    //
  }),
};
</script>
