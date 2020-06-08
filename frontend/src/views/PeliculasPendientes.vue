<template>
  <div class="pa-7">
    <h2>Películas pendientes</h2>
    <v-card v-if="peliculasPendientes.length>0" class="d-flex flex-wrap justify-center" flat tile>
      <v-card v-for="pelicula in peliculasPendientes" :key="pelicula.id" outline tile
        class="ma-3" max-width=140px flat @click="$router.push('/peli/' + pelicula.id)">
        <v-img v-if=pelicula.poster_path :src="'https://image.tmdb.org/t/p/w500/'+pelicula.poster_path" 
          class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height=180px> 
          <v-card-subtitle v-text="pelicula.title" class="white--text font-weight-medium"></v-card-subtitle>                    
        </v-img>
      </v-card>
    </v-card>
    <v-alert v-else type="info">No tienes ninguna película marcada como pendiente.</v-alert>
  </div>
</template>

<script>
import axios from "axios"
import {mapState, mapActions} from "vuex"

export default {
  data(){
    return{
      peliculasPendientes: [],
      peliculasAux: []
    }
  },

  computed: {
    ...mapState(['id']),
  },

  methods: {
    ...mapActions(['setUsuario']),

    getPeliculasPendientes(){
      console.log("cargando películas pendientes.");
      axios.get('etiqueta/pendientes',{
        params:{
          userId: this.id,
          peliculaOserie: 0
        }
      }).then((res)=>{
        console.log("películas pendientes obtenidas.");
        this.peliculasAux = res.data;
        this.peliculasAux.forEach(pelicula => {
          axios.get('https://api.themoviedb.org/3/movie/' + pelicula.peliculaId + '?api_key=d3500b9561bcc274c208215eeec7093b&language=es-ES'
          ).then((resp)=>{
            this.peliculasPendientes.push({id:pelicula.peliculaId, title:resp.data.title, poster_path: resp.data.poster_path});
          }).catch((error)=>{
            console.log("error al obtener una película vista: " + error);
          })
        });
      }).catch((error)=>{
        console.log("error al cargar películas pendientes: " + error);
      })
    }  
  },

  created(){
    console.log("página películas pendientes creada.");
  },

  mounted(){
    console.log("mounted página películas pendientes.");
    this.setUsuario();
    this.getPeliculasPendientes();
  }

}
</script>