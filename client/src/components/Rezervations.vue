<template>
  <v-simple-table fixed-header light>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Parkirno mjesto</th>
          <th class="text-left">Osoba</th>
          <th class="text-left">Vrijeme rezervacije</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rezervation in rezervations" :key="rezervation.name">
          <td>{{ getParking(rezervation.parking_space_id)[0].parkingSpaceTag}}</td>
          <td>{{ getUser(rezervation.user_id)[0].username }}</td>
          <td>{{ rezervation.rezervation_time | moment('DD. MMMM YYYY HH:mm')}}</td>
          <td>
            <v-icon small @click="deleteItem(rezervation)">mdi-delete</v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: ["rezervations", "users", "parkingData"],
  data() {
    return {
      selectedUser: ""
    };
  },
  computed: {},
  methods: {
    getUser(user_id) {
      return this.users.filter(user => {
        if (user.id == user_id) {
          return user;
        }
      });
    },
    getParking(parking_id) {
      return this.parkingData.filter(parking => {
        if (parking.id == parking_id) {
          return parking;
        }
      });
    },
    deleteItem(rezervation) {
      this.$store.dispatch("parking/deleteRezervation", rezervation);
      // this.$store.dispatch('parking/getRezervations')
    }
  }
};
</script>