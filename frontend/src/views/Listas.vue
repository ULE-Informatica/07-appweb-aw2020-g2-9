<template>
  <div class="listas">
    <v-container class="fill-height" fluid>

      <!-- CREAR NUEVA LISTA -->
      <v-card>
        <v-toolbar dense flat dark>
          <v-text-field v-model="nombre" label="Nombre" single-line hide-details required class="pl-3"></v-text-field>
          <v-divider class="ml-5" vertical></v-divider>
          <v-btn icon v-if="agregar" @click="nuevaLista(nombre)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>        
          <v-btn icon v-if="modificar" @click="modificarLista()">
            <v-icon>mdi-check</v-icon>
          </v-btn>    
        </v-toolbar>
      </v-card>

      <!-- LISTAS -->
      <v-row>
        <v-col cols=100%>            
            <v-card class="mb-3 mt-2" v-for="(item,index) of listas" :key="index">
                <v-card-text>
                    <v-chip class="ml-0 mb-2" color="pink" label text-color="white">
                    <v-icon left>mdi-label</v-icon>
                        {{item.nombre}}
                    </v-chip>
                </v-card-text>  
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="warning" class="ml-1" @click="editar(index,item.id)">Editar</v-btn>
                    <v-btn color="error" @click="eliminarLista(item.id)"  >Eliminar</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
      </v-row>

      <!--<v-form v-if="formAgregar " @submit.prevent="nuevaLista(nombre)">
        <v-row>
          <v-col>
            <v-text-field
              v-model="nombre"
              :counter="10"
              label="Nombre"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn v-show= hidden class="mr-4" type="submit">Enviar</v-btn>
      </v-form>-->

      <v-form v-if="!formAgregar " @submit.prevent="modificarLista()">
        <v-row>
          <v-col>
            <v-text-field
              v-model="nombre"
              :counter="10"
              label="Nombre"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn  class="mr-4" type="submit">Modificar</v-btn>
        <v-btn @click="formAgregar = !formAgregar" class="mr-4" type="submit">Nuevo</v-btn>
      </v-form>

      <!--<v-row align="center" justify="center">
        <v-col class="shrink">
          {{formAgregar}}
          <h1>listassas</h1>.
          <p>HEY:</p>
        </v-col>
      </v-row>-->

    </v-container>
  </div>  
</template>

<script>
//import axios from "axios"   
import { mapActions,mapState,mapMutations } from 'vuex'

  import router from "../router" 
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  //import Mensaje from '@/components/mensaje.vue'

  export default {

    mixins: [validationMixin],
    /*
    components: {
      Mensaje
    },
    */

    validations: {
      nombre: { required },
      
    },

    data(){
      return{
        nombre:'',
        message: '',
        success : '',
        agregar: true,
        modificar: false,
        formAgregar: true,
        indexNota:'',
        idLista: '',
        listaPeliculas:[]
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

      eliminarLista(id){
        this.axios.delete('/lista', {
          params: {
            id: id,
            userId : this.$store.state.id
          }
        })
        .then(res => {
          //Desaparezca sin tener que actualizar 
          this.$store.state.listas=this.$store.state.listas.filter( e => e.id != id)
        console.log(res);
        })
        .catch( e => {
          console.log("error despues de eliminar");
          
          console.log(e.response.data.error.errors.correo.message);

          // Alerta de mensaje
          this.showAlert();
          this.mensaje.color = 'danger';
          this.mensaje.texto = e.response.data.error.errors.correo.message;
        })
        window.location.reload(true);
      },

      nuevaLista(nombre){
          this.axios.post('/lista/nuevo_lista', {'nombre' : nombre, 'id':this.$store.state.id})
        .then(res => {
          console.log(res);
          this.$store.state.listas.push({
                    titulo: nombre,
                })
          
          /*
          // Agrega al inicio al array usuario
          this.contrasenia="";
          this.correo="";
          // Alerta de mensaje
          this.showAlert();
          this.mensaje.texto = 'Usuario registrado!'
          this.mensaje.color = 'success';
          */
          router.push({name: 'Login'});
        })
        .catch( e => {
          console.log("error despues de crear");
          
          console.log(e.response);

          // Alerta de mensaje
          this.showAlert();
          this.mensaje.color = 'danger';
          this.mensaje.texto = e.response.data.error.errors.correo.message;
        })
        this.usuarios = {}

        window.location.reload(true);
      },

      modificarLista(){
        this.modificar = false;
        this.agregar = true;

        this.axios.put('/lista/', {            
                nombre : this.nombre, 
                id: this.idLista,
                userId: this.$store.state.id                
          })
        .then(res => {
          console.log(res);
          this.$store.state.listas[this.indexNota].nombre= this.nombre
          /*
          this.$store.state.listas.push({
                    titulo: this.nombre,
          })
          */
        })
        .catch( e => {
          console.log("error despues de crear");
          
          console.log(e.response.data.error.errors.correo.message);

          // Alerta de mensaje
          this.showAlert();
          this.mensaje.color = 'danger';
          this.mensaje.texto = e.response.data.error.errors.correo.message;
        })
        this.usuarios = {}

        window.location.reload(true);
      },

      editar(index,id){
        this.modificar = true;
        this.agregar = false;
        this.formAgregar=false
        this.nombre= this.$store.state.listas[index].nombre
        this.indexNota=index
        this.idLista=id
        console.log(id);        
      },

      submit () {
        this.$v.$touch()
      },
      
    },

    created() {
        if (localStorage) {
        //this.name = localStorage.name;
          this.setUsuario();
          console.log("e:"+this.$store.state.id);
          
        }
    },

    mounted() {  
        console.log("mounted");
          
      //  this.getUserData(this.$store.state.id);
         this.getListas();
         this.getPeliculasLista();

         //dividir dependiendo de la lista a la que pertenece
         console.log(this.$store.state.listaPeliculas);
         
         console.log("lista:");
         
         console.log(this.$store.state.listas);
    }  
  }
</script>

