<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <!-- POSTER -->
      <v-col cols="4"  class="shrink">
        <div v-if="'https://image.tmdb.org/t/p/w300/'+datosPelicula.poster_path">
          <v-img  :src="'https://image.tmdb.org/t/p/w300/'+datosPelicula.poster_path" class="align-end px-3"> 
          </v-img>
        </div>      
      </v-col>

      <v-col cols="8" class="shrink px-5 pe-8">
        <!-- TITULO -->
        <v-row align="center" justify="center" class="pb-3">
          <h1>{{datosPelicula.name}} </h1>
        </v-row>

        <!-- GÉNEROS -->
        <v-row align="center" justify="center">
          <h5 v-for="genero in datosPelicula.genres" :key="genero.id">{{ " - " + genero.name + " - "}}  </h5>          
        </v-row>
        
        <!-- PUNTUACIÓN -->
        <v-row align="center" justify="center" v-if="!id">     
            <v-rating value=5 background-color="indigo lighten-3" color="indigo" half-increments readonly hover medium></v-rating>
            <h5 v-on="on">{{ "(" + datosPelicula.vote_average + ")"}} </h5>
        </v-row> 
        <v-row align="center" justify="center" v-else-if="!serieRegistrada">     
            <v-rating v-if="this.$store.state.id!=0" v-model="calificacionEstrellas" background-color="indigo lighten-3" color="indigo" half-increments 
            hover medium @input="agregarCalificacion($route.params.id_serie, calificacionEstrellas)"></v-rating>
            <h5 v-on="on">{{ "(" + datosPelicula.vote_average + ")"}} </h5>
        </v-row>

        <v-row align="center" justify="center" v-else-if="serieRegistrada">     
            <v-rating v-if="this.$store.state.id != 0 " v-model="calificacionEstrellas" background-color="indigo lighten-3" color="indigo" half-increments 
            hover medium @input="modificarCalificacion($route.params.id_movie, calificacionEstrellas)"></v-rating>
            <h5 v-on="on">{{ "(" + datosPelicula.vote_average + ")"}} </h5>
            <h5 v-if="calificacion>0" class="pl-2 font-weight-medium font-italic caption">Tu puntuación:{{calificacion}}</h5>
        </v-row>

        <!-- SIPNOSIS -->
        <v-row align="center" justify="left" class="pl-3 pt-2">
          <H3 v-if="datosPelicula.overview">Sinopsis</H3>
          <h5 align="justify" class="pt-2">{{ datosPelicula.overview }}</h5>
        </v-row>

        <!-- FECHA DE ESTRENO E IDIOMA -->
        <v-row align="center" justify="center">          
          <v-col cols="3">
            <span class="text--secondary caption"> Fecha de estreno: {{datosPelicula.first_air_date}}</span>
          </v-col>
          <v-col>
            <span class="text--secondary caption"> Idioma original: {{datosPelicula.original_language}} </span>            
          </v-col>
        </v-row>
        
        <v-row v-show= id> 
          <!-- GUARDAR EN LISTA -->
          <v-col cols="4" class="shrink">
            <v-select  @change="agregarLista()"
              v-model="listasValores" :items="listas2"  attach 
              label="Agregar a lista" multiple dense outlined color="black">
            </v-select>
          </v-col>

          <!-- ETIQUETAS -->
          <v-col class="pt-4">
            <v-row v-if="!serieRegistrada" v-show=id justify="center">
              <v-btn v-for="(item,index) of etiquetas" :key="index" class="mx-3" tile color="indigo lighten-1" dark depressed
                @click="agregarEtiqueta($route.params.id_serie, index)" small>
                <v-icon left>mdi-plus</v-icon> {{item}}  
              </v-btn>
            </v-row>
            <v-row v-else v-show=id justify="center">
              <v-btn v-for="(item,index) of etiquetas" :key="index" class="mx-3" tile color="indigo lighten-1" dark depressed           
                @click="modificarEtiqueta($route.params.id_serie, index)" small>
                <v-icon v-if="!find(index)" left>mdi-plus</v-icon> {{item}} 
              </v-btn>
            </v-row>
          </v-col>
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
      etiquetaRegistrada:'',
      serieRegistrada: false,
      listas2:[],      
      listasValores:[],
      model: null,
      cambioLista: false,
      calificacion:0,
      calificacionEstrellas:0
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
      }
    },

  methods: {
    
    find(x){
      return (this.etiquetaRegistrada.indexOf(x) != -1);
    },

    agregarLista(){
      console.log(this.listasValores);
      console.log(this.id);
      console.log(this.datosPelicula.id);
      
      this.axios.post('/lista/pelicula_lista', {'idApi' : this.datosPelicula.id, 'id':this.id, 'listas':this.listasValores,'isPelicula':0 })
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
        console.log("respuesta");      
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
      this.axios.post('/pelicula', {'idApi' : idApi, 'id':this.id, 'etiquetaId':idEtiqueta, 'peliculaOserie':1})
      .then(res => {
        console.log(res);
        this.$mount();
        this.serieRegistrada=true;
        this.getEtiqueta();
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
          movie_id: this.$route.params.id_serie
        }
      })
      .then( (res) => {
        console.log("se checo serie");
        if (res.data.length > 0 && (res.data[0].isVista == 1 || res.data[0].isPendiente == 1 || res.data[0].isFavorita == 1  ))
        {
          console.log("se checo movie y esta registrada por etiqueta");
          this.etiquetaRegistrada=[];
          //this.etiquetaRegistrada=res.data[0].id;

          if (res.data[0].isVista == 1)
          {
            this.etiquetaRegistrada.push(0);
            this.serieRegistrada=true;
          }
          if (res.data[0].isPendiente == 1){
            console.log("Se agrega 1");
            this.etiquetaRegistrada.push(1);
            this.serieRegistrada=true;
          }
          if (res.data[0].isFavorita == 1){
            this.etiquetaRegistrada.push(2);
            this.serieRegistrada=true;
          }
        } 
        
      })
      .catch( (error) => {
        console.log(error);
      });
    },

    agregarCalificacion(idApi, calificacion){
      console.log("agregar");      
      this.axios.post('/pelicula', {'idApi' : idApi, 'id':this.id, 'calificacion':calificacion*2, 'peliculaOserie':1 })
      .then(res => {
        console.log(res);
        this.$mount();
      })
      .catch( e => {
        console.log("error despues de agregar");      
        console.log(e.response);
      })
      this.getCalificacion();
    },
    
    modificarCalificacion(idApi, calificacion){
      this.axios.put('/pelicula', {'idApi' : this.$route.params.id_serie, 'id':this.id, 'calificacion':calificacion*2 })
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
          movie_id: this.$route.params.id_serie
        }
      })
      .then( (res) => {
        console.log("se checo serie");        
        if (res.data.length > 0 && res.data[0].calificacion)
        {
          this.serieRegistrada=true;
          this.calificacion=res.data[0].calificacion;
          console.log(this.calificacion);
          this.calificacionEstrellas = this.calificacion/2;
        }

      })
      .catch( (error) => {
        console.log(error);
      });
    }        
  },

  created() {    
    if(this.$route.params.id_serie) {
      axios.get('https://api.themoviedb.org/3/tv/'+this.$route.params.id_serie+'?api_key=d3500b9561bcc274c208215eeec7093b&language=es-ES')
      .then( (response) => {
        console.log("Datos de la serie");
        console.log(response.data);
        this.datosPelicula = response.data
      })
      .catch( (error) => {
        console.log(error);
      });
    }
    if (localStorage) {
      this.setUsuario();
      console.log("e:"+this.$store.state.id);
    }    
  },

  mounted: async function(){
    
    await this.getListas();
    if (this.$store.state.listas.length > 0) {

      await console.log(this.$store.state.listas);
      console.log("LISTAS");
      //listas creadas por el usuario
      this.$store.state.listas.forEach(element => {
        this.listas2.push({ value: element.id, text: element.nombre } );
      });
      console.log(this.listas2);
      //Consultas si la pelicula se encuentra en alguna lista
      console.log('Verificar  si esta en lista ');
      axios.get('lista/pelicula',{
        params: {
          id: this.id,
          movie_id: this.$route.params.id_serie
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
    console.log("Se ha ejecutado mounted7");
    this.getEtiqueta();
    this.getCalificacion();
    console.log(this.calificacion);    
  }
};
</script>