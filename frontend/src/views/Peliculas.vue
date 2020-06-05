<template>
  <div class="pa-7">
    <v-card class="d-flex flex-wrap justify-center" flat tile>
      <v-card v-for="pelicula in $store.state.trending" :key="pelicula.id" outline tile
        class="ma-3" max-width=140px flat @click="$router.push('/peli/' + pelicula.id)">
        <v-img v-if=pelicula.poster_path :src="'https://image.tmdb.org/t/p/w500/'+pelicula.poster_path" 
          class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height=180px> 
          <v-card-subtitle v-text="pelicula.title" class="white--text font-weight-medium"></v-card-subtitle>                    
        </v-img>
      </v-card>
    </v-card>
  </div>
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

