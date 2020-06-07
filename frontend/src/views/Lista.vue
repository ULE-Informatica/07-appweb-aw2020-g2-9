<template>
  <div class="pa-7">    
    <v-card class="d-flex flex-wrap justify-center" flat tile>
      <v-card v-for="pelicula in listaPeliculas" :key="pelicula.peliculaId" outline tile
        class="ma-3" max-width=140px flat>
          <v-img  @click="$router.push('/peli/' + pelicula.id)" v-if="pelicula.isPelicula == 1" v-show=pelicula.poster_path :src="'https://image.tmdb.org/t/p/w500/'+pelicula.poster_path" 
            class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height=180px> 
            <v-card-subtitle v-text="pelicula.title" class="white--text font-weight-medium"></v-card-subtitle>                    
          </v-img>
          <v-img  @click="$router.push('/serie/' + pelicula.id)" v-else v-show=pelicula.poster_path :src="'https://image.tmdb.org/t/p/w500/'+pelicula.poster_path" 
            class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height=180px> 
            <v-card-subtitle v-text="pelicula.title" class="white--text font-weight-medium"></v-card-subtitle>                    
          </v-img>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import axios from "axios"   
import { mapActions,mapState,mapMutations } from 'vuex'

export default {
  data(){
    return{
      nombre:'',
      message: '',
      success : '',
      
      indexNota:'',
      idLista: '',
      listaPeliculas:[],
      listaPeliculas2:[]
    }
  },

  computed: {
    ...mapState([
      'hidden','id'
    ]),
    ...mapMutations([
      'llenarListas','llenarListasPeliculas'
    ]),
    listas() {            
      return this.$store.state.listas
    },
    listasPeliculas() {
      return this.$store.state.listaPeliculas
    },
  },

  methods: {
    ...mapActions(['setUsuario','getListas','getPeliculasLista']),
    
    verLista(id_lis){
      console.log("lista");
      axios.get('lista/verLista',{
        params: {
          id: this.id,
          idLista: id_lis
        }
      }).then( (res) => {
        console.log("se checo lista");
        console.log(res);
        this.listaPeliculas2 = res.data
        console.log(this.listaPeliculas2);
        this.listaPeliculas2.forEach(element => {
        //Pelicula
        if (element.isPelicula) {
          axios.get('https://api.themoviedb.org/3/movie/'+element.peliculaId+'?api_key=d3500b9561bcc274c208215eeec7093b&language=es-ES')
          .then( (response) => {
            this.listaPeliculas.push({ id: element.peliculaId, title: response.data.title, poster_path: response.data.poster_path, isPelicula: true } );
          })
          .catch( (error) => {
            console.log(error);
          });
        } else{
          //Serie
          axios.get('https://api.themoviedb.org/3/tv/'+element.peliculaId+'?api_key=d3500b9561bcc274c208215eeec7093b&language=es-ES')
          .then( (response) => {
            this.listaPeliculas.push({ id: element.peliculaId, title: response.data.name, poster_path: response.data.poster_path,isPelicula:false } );
          })
          .catch( (error) => {
            console.log(error);
          });
        }
      });
      console.log(this.listaPeliculas);
    }).catch( (error) => {
        console.log(error);
    });   
    }      
  },

  created() {
      if (localStorage) {
      //this.name = localStorage.name;
        this.setUsuario();
        console.log("e:"+this.$store.state.id);
        
      }
  },

  mounted() {  
    console.log(this.$route.params.id_lista); 
    this.verLista(this.$route.params.id_lista);
  }

  
}
</script>


