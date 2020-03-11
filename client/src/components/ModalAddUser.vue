<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="mx-2" fab dark color="transparent" v-on="on" elevation="0">
          <v-icon dark>mdi-account-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Korisničko ime" v-model="newUser.username" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email" v-model="newUser.email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Lozinka" type="password" v-model="newUser.password" required></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6">
                <v-select :items='userRoles' item-text="name" return-object v-model="selectedRole" label="Uloga"></v-select>
              </v-col>
            </v-row>
          </v-container>
           
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="save()">Spremi</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Zatvori</v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapGetters} from "vuex";
export default {
  data() {
    return {
      dialog: false,
      selectedRole: {},
      newUser: {
        username: "",
        password: "",
        email: "",
        role_id: null
      }
    };
  },
  props: ['userRoles'],
  methods:{
      save(){
          this.newUser.role_id = this.selectedRole.id
          if(this.newUser.username=="" || this.newUser.password=="" || this.newUser.email==""){
            this.$toaster.error('Popunite sva polja!')
          }
          else{
            this.$store.dispatch('parking/createNewUser',this.newUser)          
            this.$toaster.success('Korisnik kreiran')
            this.newUser.username=''
            this.newUser.password=''
            this.newUser.email=''
            this.dialog = false
          }
      }
  }
};
</script>