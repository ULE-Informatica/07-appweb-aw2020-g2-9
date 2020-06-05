<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <!-- POSTER -->
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
      <v-col cols="8" class="shrink px-5 pe-8">
      <!--{{ $route.params.id_movie }}-->
        <!-- TITULO -->
        <v-row align="center" justify="center" class="pb-3">
          <h1>{{datosPelicula.title}}</h1>
        </v-row>
        <!-- GÉNEROS -->
        <v-row align="center" justify="center">
          <h5 v-for="genero in datosPelicula.genres" :key="genero.id">{{ " - " + genero.name + " - "}}  </h5>          
        </v-row>
        <!-- DURACIÓN -->
        <v-row align="center" justify="center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on" class="text--secondary caption"> {{datosPelicula.runtime}} minutos</span>
              </template>
              <span>Duración</span>
            </v-tooltip>
        </v-row>
        <!-- PUNTUACIÓN -->
        <v-row align="center" justify="center">     
            <v-rating v-model="calificacion" background-color="indigo lighten-3" color="indigo" half-increments 
            hover medium @change="agregarCalificacion($route.params.id_movie, calificacion)"></v-rating>
            <h5 v-on="on">{{ "(" + datosPelicula.vote_average + ")"}} </h5>
            <!--<span v-if="calificacion">  Calificación personal: {{calificacion * 2}}</span>-->
            <!--<v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" v-if="datosPelicula.vote_average>8">mdi-star</v-icon>
                <v-icon v-else v-on="on">mdi-star-half</v-icon>
                <h5 v-on="on">{{datosPelicula.vote_average}} </h5>
              </template>
              <span>Puntuación</span>
            </v-tooltip>-->
        </v-row>
        <!-- SIPNOSIS -->
        <v-row align="center" justify="left" class="pl-3 pt-2">
          <H3 v-if="datosPelicula.overview">Sinopsis</H3>
          <h5 align="justify" class="pt-2">{{ datosPelicula.overview }}</h5>
        </v-row>
        <!-- FECHA DE ESTRENO E IDIOMA -->
        <v-row align="center" justify="center">          
          <v-col cols="4">
            <span class="text--secondary caption"> Fecha de estreno: {{datosPelicula.release_date}}</span>
          </v-col>
          <v-col>
            <span class="text--secondary caption"> Idioma original: {{datosPelicula.original_language}} </span>            
          </v-col>
        </v-row>

        <!-- PUNTUACIÓN PERSONAL -->
        <!--<v-row>
          <v-col cols="6" sm="6" md="4">
          <v-text-field
            label="Tu calificación"
            placeholder="8.0"
            outlined dense v-model="calificacion" hide-details
            type="number" min=1 max=10                        
          ></v-text-field>
        -->
          <!-- no puedo validar -->
        <!--  
          </v-col>
          <v-col cols="6" sm="6" md="4">
            <v-btn v-if="!peliculaRegistrada" class="ma-2" tile outlined  
            @click="modificarCalificacion($route.params.id_movie, calificacion)"> 
              Guardar calificación {{calificacion}}
            </v-btn>
            <v-btn v-else class="ma-2" tile outlined  
            @click="agregarCalificacion($route.params.id_movie, calificacion)"> 
              Guardar calificación {{calificacion}}
            </v-btn>
          </v-col>
        </v-row>-->

        <!-- GUARDAR EN LISTA -->
        <v-row v-show= hidden> 
          <v-col cols="4" class="shrink">
            <v-select  @change="agregarLista()"
              v-model="listasValores" :items="listas2"  attach 
              label="Agregar a listas" multiple dense outlined color="black">
            </v-select>
            <!--<v-btn v-show=cambioLista class="ma-2" tile outlined @click="agregarLista()"> 
              Guardar en lista
            </v-btn>-->
          </v-col>
        </v-row>
        <v-row v-if="!peliculaRegistrada">
          <H2>Etiqueta</h2>
          <v-btn v-for="(item,index) of etiquetas" :key="index" class="ma-2" tile outlined color="color"
            @click="agregarEtiqueta($route.params.id_movie, index)" >
            <v-icon v-if="etiquetaRegistrada==item.id" left>mdi-plus</v-icon> {{item}}    
          </v-btn>
        </v-row>
        <v-row v-else>
          <H2>Etiqueta</h2>
         <v-btn v-for="(item,index) of etiquetas" :key="index" class="ma-2" tile outlined 
          
            @click="modificarEtiqueta($route.params.id_movie, index)" 
          >
            <v-icon v-if="!find(index)" left>mdi-plus</v-icon> {{item}} 
          </v-btn>
        </v-row>


      </v-col>
    </v-row>

  </v-container>
</template>
<script>
const axios = require('axios');
import { mapActions, mapState } from 'vuex'
import {  between } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      datosPelicula: [        
      ],
      color:"primary",
      etiquetas:["Vista", "Pendiente" , "Favorita" ],
      etiquetaRegistrada:[],
      peliculaRegistrada: false,

      listas2:[],
      
      listasValores:[],
      model: null,
      cambioLista: false,
      calificacion:0
    }
  },

  validations: {      
    calificacion: {
      between: between(1, 10)
    }
  },  
    
  computed: {
    ...mapState([
          'hidden','id'
      ]),
      calificacionErrors () {
        const errors = []
        if (!this.$v.calificacion.$dirty) return errors
        !this.$v.calificacion.between && errors.push('Máximo calificacion es 10')
        return errors
      },
  },

  methods: {
    find(x){
      return (this.etiquetaRegistrada.indexOf(x) != -1);
    },
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
        /*
        // Alerta de mensaje
        this.showAlert();
        this.mensaje.color = 'danger';
        this.mensaje.texto = e.response.data.error.errors.correo.message;
        */
      })
    },

    modificarEtiqueta(idApi, idEtiqueta){
      this.axios.put('/pelicula', {'idApi' : idApi, 'id':this.id, 'etiquetaId':idEtiqueta })
      .then(res => {
        console.log("respuesta etiquetas");        
        console.log(res);        
        //Actualiza la etiqueta
        this.getEtiqueta();
        //this.etiquetaRegistrada=res.data.etiquetaId;        
      })
      .catch( e => {
        console.log("error despues de modificar");        
        console.log(e.response);
        // Alerta de mensaje
        //this.showAlert();
        //this.mensaje.color = 'danger';
        //this.mensaje.texto = e.response.data.error.errors.correo.message;
      })
      this.usuarios = {}
    },

    agregarEtiqueta(idApi, idEtiqueta){
      this.axios.post('/pelicula', {'idApi' : idApi, 'id':this.id, 'etiquetaId':idEtiqueta })
      .then(res => {
        console.log(res);
        this.$mount();
        this.peliculaRegistrada=true;
      })
      .catch( e => {
        console.log("error despues de agregar");
        
        console.log(e.response);

        // Alerta de mensaje
        //this.showAlert();
        //this.mensaje.color = 'danger';
        //this.mensaje.texto = e.response.data.error.errors.correo.message;
      })
      this.usuarios = {}
    },
    getEtiqueta(){
      //Consulta la etiqueta de la pelicula
      axios.get('etiqueta/movie',{
        params: {
          id: this.id,
          movie_id: this.$route.params.id_movie
        }
      })
      .then( (res) => {
        console.log("se checo movie");
        this.etiquetaRegistrada=[];
        //this.etiquetaRegistrada=res.data[0].id;

        if (res.data[0].isVista == 1)
        {
          this.etiquetaRegistrada.push(0);
        }
        if (res.data[0].isPendiente == 1){
          console.log("Se agrega 1");
          this.etiquetaRegistrada.push(1);
        }
        if (res.data[0].isFavorita == 1){
           this.etiquetaRegistrada.push(2);
        }  

        this.peliculaRegistrada=true;
        console.log(this.etiquetaRegistrada);
      })
      .catch( (error) => {
        console.log(error);
      });
    },

    agregarCalificacion(idApi, calificacion){
      this.axios.post('/pelicula', {'idApi' : idApi, 'id':this.id, 'calificacion':calificacion })
      .then(res => {
        console.log(res);
        this.$mount();
      })
      .catch( e => {
        console.log("error despues de agregar");      
        console.log(e.response);
      })
    },
    modificarCalificacion(idApi, calificacion){
      this.axios.put('/pelicula', {'idApi' : idApi, 'id':this.id, 'calificacion':calificacion*2 })
      .then(res => {
        console.log("respuesta");        
        console.log(res);        
        //Actualiza la etiqueta
        this.getCalificacion();
      })
      .catch( e => {
        console.log("error despues de modificar");        
        console.log(e.response);
      })
    },

    getCalificacion(){
      //Consulta la etiqueta de la pelicula
      axios.get('pelicula',{
        params: {
          id: this.id,
          movie_id: this.$route.params.id_movie
        }
      })
      .then( (res) => {
        console.log("se checo movie");
        this.peliculaRegistrada=true;
        this.calificacion=res.data[0].calificacion;
      })
      .catch( (error) => {
        console.log(error);
      });
    }
        
  },

  created() {
    if (localStorage) {
      this.setUsuario();
      console.log("e:"+this.$store.state.id);
    }
    if(this.$route.params.id_movie) {
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
    }else if (this.$route.params.id_serie) {
      axios.get('https://api.themoviedb.org/3/tv/'+this.$route.params.id_serie+'?api_key=d3500b9561bcc274c208215eeec7093b&language=es-ES')
      .then( (response) => {
        console.log("Datos de la pelicula");
        console.log(response.data);
        this.datosPelicula = response.data
      })
      .catch( (error) => {
        console.log(error);
      });
    } 
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

    //listas creadas por el usuario
    this.$store.state.listas.forEach(element => {
      this.listas2.push({ value: element.id, text: element.nombre } );
    });
    console.log(this.listas2);    
    console.log("Se ha ejecutado mounted7");
    this.getEtiqueta();


     
    this.getCalificacion();
    console.log(this.calificacion);
    
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

    
  },

  updated: async function(){
    console.log("ACtualizado:"+ this.etiquetaRegistrada);
  }

};
</script>