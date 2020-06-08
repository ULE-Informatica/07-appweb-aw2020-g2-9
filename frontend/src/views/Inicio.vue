<template>
  <div class="inicio">
    <v-container class="full-height mx-3" fluid>
      
      <h3 class="mt-2">Películas polpulares</h3>
      <v-row align="center" justify="center">
        <v-col class="shrink">
          <v-sheet dark class="mb-3 mr-5" elevation="8" >
            <v-slide-group v-model="model" class="px-3 pb-1" show-arrows>
              <v-slide-item v-for="pelicula in popularMovies" :key="pelicula.id">            
                <v-card class="ma-2 mt-3" max-width=140px flat @click="$router.push('/peli/' + pelicula.id)">
                  <v-img v-if=pelicula.poster_path :src="'https://image.tmdb.org/t/p/w500/'+pelicula.poster_path" class="align-end" 
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height=180px> 
                    <v-card-subtitle v-text="pelicula.title" class="white--text font-weight-medium"></v-card-subtitle>                    
                  </v-img>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
      
      <h3 class="mt-2">Series populares</h3>
      <v-row align="center" justify="center">
        <v-col class="shrink">
          <v-sheet dark class="mb-3 mr-5" elevation="8" >
            <v-slide-group v-model="model" class="px-3 pb-1" show-arrows>
              <v-slide-item v-for="serie in popularSeries" :key="serie.id">            
                <v-card class="ma-2 mt-3" max-width=140px flat @click="$router.push('/serie/' + serie.id)">
                  <v-img v-if=serie.poster_path :src="'https://image.tmdb.org/t/p/w500/'+serie.poster_path" class="align-end" 
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height=180px> 
                    <v-card-subtitle v-text="serie.name" class="white--text font-weight-medium"></v-card-subtitle>
                  </v-img>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>

      <h3 class="mt-2">Tendencia</h3>
      <v-row align="center" justify="center">
        <v-col class="shrink">
          <v-sheet dark class="mb-3 mr-5" elevation="8" >
            <v-slide-group v-model="model" class="px-3 pb-1" show-arrows>
              <v-slide-item v-for="pelicula in trending" :key="pelicula.id">  
                <v-card class="ma-2 mt-3" max-width=140px flat @click="$router.push('/peli/' + pelicula.id)">
                  <v-img v-if=pelicula.poster_path :src="'https://image.tmdb.org/t/p/w500/'+pelicula.poster_path" class="align-end" 
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height=180px> 
                    <v-card-subtitle v-text="pelicula.title" class="white--text font-weight-medium"></v-card-subtitle>                    
                  </v-img>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'Inicio',
  data(){
    return{
      model: null,
    }
  },
  computed: {
    ...mapState([
      'hidden','id','resultados','popularMovies','popularSeries','trending'
    ]),
  ...mapMutations([
      'llenarPopularMovies','llenarPopularSeries','llenarTrending'      
    ]),

  },
  methods: {
    ...mapActions(['setUsuario','getListas','getPopularMovies',
      'getPopularSeries', 'getTrending']),
  },
  mounted:  function(){
    this.getPopularMovies();
    this.getPopularSeries();
    this.getTrending();


    
  },
  
  created() {
      if (localStorage) {
      //this.name = localStorage.name;
        this.setUsuario();
        
      }
  }
}
</script>
