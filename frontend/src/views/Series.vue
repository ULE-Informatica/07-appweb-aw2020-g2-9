<template>
  <div class="pa-7">
    <v-card class="d-flex flex-wrap justify-center" flat tile>
      <v-card v-for="serie in $store.state.popularSeries" :key="serie.id" outline tile
        class="ma-3" max-width=140px flat @click="$router.push('/serie/' + serie.id)">
        <v-img v-if=serie.poster_path :src="'https://image.tmdb.org/t/p/w500/'+serie.poster_path" 
          class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height=180px> 
          <v-card-subtitle v-text="serie.name" class="white--text font-weight-medium"></v-card-subtitle>                    
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

