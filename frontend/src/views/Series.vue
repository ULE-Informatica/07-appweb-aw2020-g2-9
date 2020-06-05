<template>

  <v-container class="fill-height mx-3 mr-5" fluid>
    <v-row align="center" justify="center">
      <v-col class="shrink">
        <v-sheet dark class="my-3 mr-5" elevation="8" >
          <v-slide-group v-model="model" class="px-3 pb-1" show-arrows>
            <v-slide-item v-for="serie in $store.state.popularSeries" :key="serie.id">            
              <v-card class="ma-2 mt-3" max-width=140px flat>
                <v-img v-if=serie.poster_path :src="'https://image.tmdb.org/t/p/w500/'+serie.poster_path" class="align-end" 
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height=180px> 
                  <router-link :to="{ name: 'Serie', params: { id_serie: serie.id }}">
                    <v-card-subtitle v-text="serie.original_title" class="white--text"></v-card-subtitle>
                  </router-link>
                </v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>  
</template>


<script>
//const axios = require('axios');
export default {
  
  data: () => ({
    model: null
  }),
  mounted: function(){
    console.log("Se ha ejecutado mounted");
    console.log(this.$store.state.username);
    console.log(this.$store.state.resultadosSeries);
    console.log(this.$store.state.id);
    console.log(this.$store.state)
    
  },
  computed: {
        resultadosSeries() {
            return this.$store.state.resultadosSeries
        },
    },

  beforeUpdate: function(){
    console.log("Se ha ejecutado before update");
    console.log(this.$store.state.resultadosSeries);
    
  }
};
</script>

