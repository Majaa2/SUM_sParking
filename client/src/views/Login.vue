<template>
    <v-container fluid :style="{'background-image': `url(${require('@/assets/login_sum_parking.jpg')})`}" class="cont pa-0">  
        <div style="height: 100vh">
            <v-row no-gutters>
        <v-col cols="6">
      <v-container
        fluid
        fill-height
        class="pa-0"
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card elevation="12" min-width="500px" shaped color="rgba(255,255,255,0.75)" style="align:center;top:170px">
              <v-card-text>
                <v-form>
                    <img :src="require('@/assets/logo.png')" style="height:50px; width:90px;">
                    <v-divider></v-divider>
                  <v-text-field
                    label="Login"
                    name="login"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  ></v-text-field>
                  
                <v-btn color="primary" >Login</v-btn>
              
                </v-form>
              </v-card-text>
              
               
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
          </v-col>
        </v-row>
        </div>
    </v-container>
</template>

<style>
.cont{
    background-size: 100%;
}

</style>