<template>
  <div class="inicio">
    <v-container class="full-height mx-3" fluid>
      
      <h3 class="mt-2">Tendencia</h3>

      <v-row align="center" justify="center">
        <v-col class="shrink">
          <v-sheet dark class="my-3 mr-5" elevation="8" >
            <v-slide-group v-model="model" class="px-3 pb-1" show-arrows>
              <v-slide-item v-for="pelicula in trending" :key="pelicula.id">            
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

      <h3 class="mt-2">Series populares</h3>

      <v-row align="center" justify="center">
        <v-col class="shrink">
          <v-sheet dark class="my-3 mr-5" elevation="8" >
            <v-slide-group v-model="model" class="px-3 pb-1" show-arrows>
              <v-slide-item v-for="serie in popularSeries" :key="serie.id">            
                <v-card class="ma-2 mt-3" max-width=140px flat>
                  <v-img v-if=serie.poster_path :src="'https://image.tmdb.org/t/p/w500/'+serie.poster_path" class="align-end" 
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height=180px> 
                    <router-link :to="{ name: 'Serie', params: { id_serie: serie.id }}">
                      <v-card-subtitle v-text="serie.name" class="white--text"></v-card-subtitle>
                    </router-link>
                  </v-img>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>

      <h3>Películas polpulares</h3>

      <v-row align="center" justify="center">
        <v-col class="shrink">
          <v-sheet dark class="my-3 mr-5" elevation="8" >
            <v-slide-group v-model="model" class="px-3 pb-1" show-arrows>
              <v-slide-item v-for="pelicula in popularMovies" :key="pelicula.id">            
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

    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'Inicio',
  data(){
    return{
      peliculas:[
        {nombre:'Mujercitas', imagen:'https://m.media-amazon.com/images/M/MV5BY2QzYTQyYzItMzAwYi00YjZlLThjNTUtNzMyMDdkYzJiNWM4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg'},
        {nombre:'1917', imagen:'https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_SY1000_CR0,0,631,1000_AL_.jpg'},
        {nombre:'Jojo Rabbit', imagen:'https://m.media-amazon.com/images/M/MV5BZjU0Yzk2MzEtMjAzYy00MzY0LTg2YmItM2RkNzdkY2ZhN2JkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SY1000_SX667_AL_.jpg'},
        {nombre:'Rocketman', imagen:'https://m.media-amazon.com/images/M/MV5BYmIzNjUxZGQtYjg0OS00MmE0LTgwZDAtMzVmODQ2MGI5MTQ5XkEyXkFqcGdeQXVyMTA3MTA4Mzgw._V1_SY1000_CR0,0,666,1000_AL_.jpg'},
        {nombre:'Origen', imagen:'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg'},
        {nombre:'Malditos bastardos', imagen:'https://m.media-amazon.com/images/M/MV5BZmExNmEwYWItYmQzOS00YjA5LTk2MjktZjEyZDE1Y2QxNjA1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'},
        {nombre:'Blade runner', imagen:'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,671,1000_AL_.jpg'},
        {nombre:'El padrino', imagen:'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg'},
        {nombre:'Cowspiracy', imagen:'https://m.media-amazon.com/images/M/MV5BMTU5NzAyMzk1MF5BMl5BanBnXkFtZTgwODE3NjQyNTE@._V1_.jpg'},
        {nombre:'Beautiful boy', imagen:'https://m.media-amazon.com/images/M/MV5BNjNhNjVjZDQtMzRhMS00YmI2LTkxZmEtMDdkMWU3OWQ2NjNmXkEyXkFqcGdeQXVyODE1MjMyNzI@._V1_SY1000_CR0,0,675,1000_AL_.jpg'},
        {nombre:'La vida de Adèle', imagen:'https://m.media-amazon.com/images/M/MV5BMTQ5NTg5ODk4OV5BMl5BanBnXkFtZTgwODc4MTMzMDE@._V1_SY1000_SX675_AL_.jpg'},
        {nombre:'La gran estafa americana', imagen:'https://m.media-amazon.com/images/M/MV5BMmM4YzJjZGMtNjQxMy00NjdlLWJjYTItZWZkYzdhOTdhNzFiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'}
      ],
      series:[
        {nombre:'The walking dead', imagen:'https://m.media-amazon.com/images/M/MV5BYTUwOTM3ZGUtMDZiNy00M2I3LWI1ZWEtYzhhNGMyZjI3MjBmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,666,1000_AL_.jpg'},
        {nombre:'Vikingos', imagen:'https://m.media-amazon.com/images/M/MV5BNjIzZjljZmQtOGNiYi00YmY2LWE1MGYtN2VlMmEyZDBlMzRmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_SX666_AL_.jpg'},
        {nombre:'Breaking bad', imagen:'https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTYtZTA3ZWFkODRkNmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,718,1000_AL_.jpg'},
        {nombre:'The office', imagen:'https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SY999_CR0,0,665,999_AL_.jpg'},
        {nombre:'Prison break', imagen:'https://m.media-amazon.com/images/M/MV5BMTg3NTkwNzAxOF5BMl5BanBnXkFtZTcwMjM1NjI5MQ@@._V1_.jpg'},
        {nombre:'Altered carbon', imagen:'https://m.media-amazon.com/images/M/MV5BNjIxMWMzMzctYmZkYy00OTkzLWFlMWUtMjc3ZDFmYzQ3YmVkXkEyXkFqcGdeQXVyNjU2ODM5MjU@._V1_SY1000_CR0,0,675,1000_AL_.jpg'},
        {nombre:'El cuento de la criada', imagen:'https://m.media-amazon.com/images/M/MV5BMTU0MTI0MDAyM15BMl5BanBnXkFtZTgwMDg5MzYyNTM@._V1_SY1000_CR0,0,684,1000_AL_.jpg'},
        {nombre:'The man in the high castle', imagen:'https://m.media-amazon.com/images/M/MV5BZWEwNzQ4NzUtMWRmYS00NDdiLTg5NDItODA5M2M4YTM0ZTE2XkEyXkFqcGdeQXVyMTAzNjU2NjM1._V1_SX675_CR0,0,675,999_AL_.jpg'},
        {nombre:'Peaky blinders', imagen:'https://m.media-amazon.com/images/M/MV5BMTkzNjEzMDEzMF5BMl5BanBnXkFtZTgwMDI0MjE4MjE@._V1_SY1000_CR0,0,674,1000_AL_.jpg'},
        {nombre:'Dark', imagen:'https://m.media-amazon.com/images/M/MV5BMmIyZjA3NGUtYjlhNS00ZDlkLWI0MDgtMDc2YWNjNGMwYWZhXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_SY1000_CR0,0,674,1000_AL_.jpg'},
        {nombre:'House of cards', imagen:'https://m.media-amazon.com/images/M/MV5BODM1MDU2NjY5NF5BMl5BanBnXkFtZTgwMDkxNTcwNjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg'},
        {nombre:'Doctor Who', imagen:'https://m.media-amazon.com/images/M/MV5BZWJhYjFmZDEtNTVlYy00NGExLWJhZWItNTAxODY5YTc3MDFmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,707,1000_AL_.jpg'}
      ],
      novedades:[
        {nombre:'Frozen II', imagen:'https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SY1000_SX675_AL_.jpg'},
        {nombre:'El hoyo', imagen:'https://m.media-amazon.com/images/M/MV5BOTMyYTIyM2MtNjQ2ZC00MWFkLThhYjQtMjhjMGZiMjgwYjM2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_SX675_AL_.jpg'},
        {nombre:'La favorita', imagen:'https://m.media-amazon.com/images/M/MV5BMTg1NzQwMDQxNV5BMl5BanBnXkFtZTgwNDg2NDYyNjM@._V1_SY1000_CR0,0,670,1000_AL_.jpg'},
        {nombre:'Érase una ve en Hollywood', imagen:'https://m.media-amazon.com/images/M/MV5BOTg4ZTNkZmUtMzNlZi00YmFjLTk1MmUtNWQwNTM0YjcyNTNkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SY1000_CR0,0,674,1000_AL_.jpg'},
        {nombre:'El irlandés', imagen:'https://m.media-amazon.com/images/M/MV5BMGUyM2ZiZmUtMWY0OC00NTQ4LThkOGUtNjY2NjkzMDJiMWMwXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_SY1000_CR0,0,682,1000_AL_.jpg'},
        {nombre:'Dolor y gloria', imagen:'https://m.media-amazon.com/images/M/MV5BNWU4MTM2YTgtYTRlZC00ZmRhLTlkYTMtZDkyYzNjZDU1NmI0XkEyXkFqcGdeQXVyOTgxNDIzMTY@._V1_SY1000_SX675_AL_.jpg'},
        {nombre:'Historia de un matrimonio', imagen:'https://m.media-amazon.com/images/M/MV5BZGVmY2RjNDgtMTc3Yy00YmY0LTgwODItYzBjNWJhNTRlYjdkXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SY1000_CR0,0,675,1000_AL_.jpg'},
        {nombre:'Star Wars: El ascenso de Skywalker', imagen:'https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SY1000_CR0,0,675,1000_AL_.jpg'},
        {nombre:'Onward', imagen:'https://m.media-amazon.com/images/M/MV5BMTZlYzk3NzQtMmViYS00YWZmLTk5ZTEtNWE0NGVjM2MzYWU1XkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SY1000_CR0,0,674,1000_AL_.jpg'},
        {nombre:'María, reina de Escocia', imagen:'https://m.media-amazon.com/images/M/MV5BNDVmOGI4MTMtYmNmNC00MTliLTlkYjQtYmU2N2EyNDk2YTAwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SY1000_SX675_AL_.jpg'},
        {nombre:'Van Gogh, a las puertas de la eternidad', imagen:'https://m.media-amazon.com/images/M/MV5BOTRmZGJiZjUtMGJjYi00MzZhLTkzYjUtODE1Yjk5ZDRiODhlXkEyXkFqcGdeQXVyODAzODU1NDQ@._V1_SY1000_SX675_AL_.jpg'},
        {nombre:'El vicio del poder', imagen:'https://m.media-amazon.com/images/M/MV5BMTY1NjM0MzgxMV5BMl5BanBnXkFtZTgwNDc4NTY0NjM@._V1_SY1000_CR0,0,640,1000_AL_.jpg'}
      ],
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
  beforeUpdate: function(){
    console.log("Se ha ejecutado before update");
    console.log(this.$store.state.popularMovies);
    
  },
  created() {
      if (localStorage) {
      //this.name = localStorage.name;
        this.setUsuario();
        console.log("e:"+this.$store.state.id);
        
      }
  }
}
</script>
