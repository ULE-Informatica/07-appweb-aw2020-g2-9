<template>
  <div class="pa-7">
    <h2>Series vistas</h2>
    <v-card v-if="seriesVistas" class="d-flex flex-wrap justify-center" flat tile>
      <v-card v-for="serie in seriesVistas" :key="serie.id" outline tile
        class="ma-3" max-width=140px flat @click="$router.push('/peli/' + serie.id)">
        <v-img v-if=serie.poster_path :src="'https://image.tmdb.org/t/p/w500/'+serie.poster_path" 
          class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height=180px> 
          <v-card-subtitle v-text="serie.title" class="white--text font-weight-medium"></v-card-subtitle>                    
        </v-img>
      </v-card>
    </v-card>
    <v-alert v-else type="info">No tienes ninguna serie marcada como vista.</v-alert>
  </div>
</template>

<script>
import axios from "axios"
import {mapState, mapActions} from "vuex"

export default {
  data(){
    return{
      seriesVistas: [],
      seriesAux: []
    }
  },

  computed: {
    ...mapState(['id']),
  },

  methods: {
    ...mapActions(['setUsuario']),

    getSeriesVistas(){
      console.log("cargando series vistas.");
      axios.get('etiqueta/vistas',{
        params:{
          userId: this.id,
          peliculaOserie: 1
        }
      }).then((res)=>{
        console.log("series vistas obtenidas.");
        this.seriesAux = res.data;
        this.seriesAux.forEach(serie => {
          axios.get('https://api.themoviedb.org/3/tv/' + serie.peliculaId + '?api_key=d3500b9561bcc274c208215eeec7093b&language=es-ES'
          ).then((resp)=>{
            this.seriesVistas.push({id:serie.peliculaId, title:resp.data.title, poster_path: resp.data.poster_path});
          }).catch((error)=>{
            console.log("error al obtener una serie vista: " + error);
          })
        });
      }).catch((error)=>{
        console.log("error al cargar series vistas: " + error);
      })
    }  
  },

  created(){
    console.log("página series vistas creada.");
  },

  mounted(){
    console.log("mounted página series vistas.");
    this.setUsuario();
    this.getSeriesVistas();
  }

}
</script>