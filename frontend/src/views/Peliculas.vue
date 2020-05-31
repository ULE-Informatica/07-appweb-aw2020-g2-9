<template>

  <v-container class="fill-height mx-3 mr-5" fluid>
    <v-row align="center" justify="center">
      <v-col class="shrink">
        <v-sheet dark class="my-3 mr-5" elevation="8" >
          <v-slide-group v-model="model" class="px-3 pb-1" show-arrows>
            <v-slide-item v-for="pelicula in resultados" :key="pelicula.id">            
              <v-card class="ma-2 mt-3" max-width=140px flat>
                <v-img v-if=pelicula.poster_path :src="'https://image.tmdb.org/t/p/w500/'+pelicula.poster_path" class="align-end" 
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height=180px> 
                  <router-link :to="{ name: 'Movie', params: { id_movie: pelicula.id }}">
                    <v-card-subtitle v-text="pelicula.original_title" class="white--text"></v-card-subtitle>
                  </router-link>
                </v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
    </v-row>
  <!--
    <v-row align="center" justify="center">
      <v-col class="shrink">
        <h1>peliculas</h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        
            <v-data-table
              :headers="headers"
              :items="peliculas"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
        
      </v-col>
    </v-row>
--> 

      
     

  </v-container>

  
</template>


<script>
//const axios = require('axios');
export default {
  //name: "HelloWorld",
  
  data: () => ({
    model: null
  }),
  mounted: function(){
    console.log("Se ha ejecutado mounted");
    console.log(this.$store.state.username);
    console.log(this.$store.state.resultados);
    console.log(this.$store.state.id);
    
  },
  computed: {
        resultados() {
            return this.$store.state.resultados
        },
    },

  beforeUpdate: function(){
    console.log("Se ha ejecutado before update");
    console.log(this.$store.state.resultados);
    
  }
};
</script>

