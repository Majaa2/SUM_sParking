<template>
    <v-row justify="center">
      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="(message, i) in messages"
          :key="i"
          hide-actions
        >
          <v-expansion-panel-header>
            <v-row
              align="center"
              no-gutters
            >
              <v-col
                cols="4"
                sm="2"
                md="1"
              >
                <v-avatar
                  size="36px"
                  color="blue"
                >
                  {{user.username.substring(0,1).toUpperCase()}}
                </v-avatar>
                </v-col>
                <v-col cols="8" class="pl-7">
                  <span> {{user.username}} </span>
                </v-col>
              
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-card-text>
                <v-btn block color="error" dark outlined @click="logout">ODJAVA</v-btn>
            </v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name : 'user-info',
    computed:{
      ...mapState('parking',['user'])
    },
    data(){
        return{
            messages: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          
        }
      ],
        }
    },
    methods:{
      logout() {
        localStorage.clear();
        this.$store.dispatch('logout')
        this.$router.push("/login")
      }
    }
}
</script>