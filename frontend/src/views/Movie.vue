<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="4"  class="shrink">
        <div v-if="'https://image.tmdb.org/t/p/w300/'+datosPelicula.poster_path">
          <v-img  :src="'https://image.tmdb.org/t/p/w300/'+datosPelicula.poster_path" class="align-end px-3"> 
          </v-img>
        </div>
        <!-- buscar como colocarlo si no tiene imagen
        <div class="ma-2" >
          <v-icon >mdi-image-off</v-icon>
        </div>
        -->         
      </v-col>
      <v-col cols="8" class="shrink">
      {{ $route.params.id_movie }}
        <v-row align="center" justify="center">
          <h1>{{datosPelicula.title}}</h1>
        </v-row>
        <v-row align="center" justify="center">
          <h5 v-for="genero in datosPelicula.genres" :key="genero.id">{{ genero.name+ "-"}}  </h5>
          
        </v-row>
        <v-row align="center" justify="center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{datosPelicula.runtime}} minutos</span>
              </template>
              <span>Duración</span>
            </v-tooltip>
        </v-row>
        <v-row align="center" justify="center">
          
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" v-if="datosPelicula.vote_average>8">mdi-star</v-icon>
                <v-icon v-else v-on="on">mdi-star-half</v-icon>
                <h5 v-on="on">{{datosPelicula.vote_average}} </h5>
              </template>
              <span>Puntuación</span>
            </v-tooltip>
        </v-row>
        <v-row align="center" justify="center">
          <H3 v-if="datosPelicula.overview">Sinopsis</H3>
          <h5>{{ datosPelicula.overview }}</h5>
        </v-row>
        <v-row align="center" justify="center">
          <v-col>
            Fecha: {{datosPelicula.release_date}}
          </v-col>
          <v-col>
            Idioma original: {{datosPelicula.original_language}} 
          </v-col>
        </v-row>
        <v-row v-show= hidden> 
            <v-select  @change="changedValue"
               v-model="listasValores" :items="listas2"  attach chips 
               label="Listas" multiple>
                
            </v-select>
            <v-btn v-show=cambioLista class="ma-2" tile outlined color=color
              @click="agregarLista()"
            > 
              Guardar en lista
            </v-btn>

        <!--

         <v-btn v-for="(item,index) of etiquetas" :key="index" class="ma-2" tile outlined 
          color="color"
            @click="agregarEtiqueta($route.params.id_movie, item.id)"
          >

            <v-icon left>mdi-plus</v-icon> {{item.etiqueta}} 
          </v-btn>

          -->
        </v-row>

      </v-col>
    </v-row>

  </v-container>
</template>
<script>
const axios = require('axios');
import { mapActions, mapState } from 'vuex'
export default {
  data: () => ({
    datosPelicula: [
      
    ],
    color:"primary",
    etiquetas:[],
    etiquetaRegistrada:'',

    listas2:[],
    
    listasValores:[],
    model: null,
    cambioLista: false,

    



  }),
  computed: {
      ...mapState([
            'hidden','id'
        ]),
    },


  
  methods: {
      agregarLista(){


          console.log(this.listasValores);
          console.log(this.id);
          console.log(this.datosPelicula.id);
          
          this.axios.post('/lista/pelicula_lista', {'idApi' : this.datosPelicula.id, 'id':this.id, 'listas':this.listasValores })
          .then(res => {
            console.log(res);
          })
          .catch( e => {
            console.log("error despues de agregar");
            console.log(e.response);
          })
          
      },
      changedValue: function() {
        //receive the value selected (return an array if is multiple)
        this.cambioLista=true;
        


        console.log(this.cambioLista);
           
        //update en la base 
        //manda el id de la lista y de la pelicula
        


        
        
      },
      ...mapActions(['setUsuario','getListas']),
      eliminarLista(id){
            this.axios.delete('/lista', {
              params: {
                id: id,
                userId : this.id
              }
            })
          .then(res => {
          console.log(res);
          })
          .catch( e => {
            console.log("error despues de crear");
            
            console.log(e.response.data.error.errors.correo.message);

            // Alerta de mensaje
            this.showAlert();
            this.mensaje.color = 'danger';
            this.mensaje.texto = e.response.data.error.errors.correo.message;
          })
        },
      agregarEtiqueta(idApi, idEtiqueta){
          
          

          this.axios.post('/pelicula', {'idApi' : idApi, 'id':this.id, 'etiquetaId':idEtiqueta })
        .then(res => {
          console.log(res);
          
        })
        .catch( e => {
          console.log("error despues de agregar");
          
          console.log(e.response);

          // Alerta de mensaje
          this.showAlert();
          this.mensaje.color = 'danger';
          this.mensaje.texto = e.response.data.error.errors.correo.message;
        })
        this.usuarios = {}
      },
      
    },


  created() {
    if (localStorage) {
      this.setUsuario();
      console.log("e:"+this.$store.state.id);
    }

    console.log(this.$route.params.id_movie); 
    //busca la pelicula
     // Make a request for a user with a given ID
    axios.get('https://api.themoviedb.org/3/movie/'+this.$route.params.id_movie+'?api_key=d3500b9561bcc274c208215eeec7093b&language=es-MX')
      .then( (response) => {
        console.log("Datos de la pelicula");
        console.log(response.data);
        this.datosPelicula = response.data
      })
      .catch( (error) => {
        console.log(error);
      });
  },
  beforeMount: async function(){
    console.log("Se ha ejecutado before mounted");
    
    await axios.get('/etiqueta')
      .then( (res) => {
        //console.log('https://api.themoviedb.org/3/movie/'+this.$route.params.id_movie+'?api_key=d3500b9561bcc274c208215eeec7093b&language=es-MX');
        
        // handle success
        console.log(res.data);
        this.etiquetas=res.data;
        //this.datosPelicula = response.data
      })
      .catch( (error) => {
        // handle error
        console.log(error);
      });
  }, 
  


  mounted: async function(){
    
    await this.getListas();
    await console.log(this.$store.state.listas);
    
    console.log("LISTAS");
    
    this.$store.state.listas.forEach(element => {
      this.listas2.push({ value: element.id, text: element.nombre } );
    });
    console.log(this.listas2);
    
    console.log("Se ha ejecutado mounted7");
    //Consultas las etiquetas de la pelicula
    axios.get('etiqueta/movie',{
      params: {
        id: this.id,
        movie_id: this.$route.params.id_movie
      }
    })
    .then( (res) => {
      console.log("se checo movie");

      this.etiquetaRegistrada=res.data.id;
      console.log(this.etiquetaRegistrada);
    })
    .catch( (error) => {
      console.log(error);
    });
    
    //Consultas si la pelicula se encuentra en alguna lista
    console.log('Verificar  si esta en lista ');
    axios.get('lista/pelicula',{
      params: {
        id: this.id,
        movie_id: this.$route.params.id_movie
      }
    })
    .then( (res) => {
        console.log("La movie esta en las listas");

        var aux=res.data;
        console.log(aux);
        
        aux.forEach(element => {
          this.listasValores.push({ value: element.id } );
        });




        console.log(this.listasValores);
    })
    .catch( (error) => {
      console.log("Error");
      
      console.log(error);
    });
    
    
  }
};
</script>