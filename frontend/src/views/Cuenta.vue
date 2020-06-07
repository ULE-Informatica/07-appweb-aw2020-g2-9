<template>
  <div class="container">
    <h1>Cuenta personal</h1>
    <!--<v-container>
      <v-alert v-if="message" type="error" v-model="message">        
      </v-alert>
      <v-alert v-if="success" type="success" v-model="success">        
      </v-alert>
    </v-container>-->
    <form @submit.prevent="modUsuario(usuario)" class="mt-3">       
      <v-text-field
        v-model="usuario.nombre"
        label="Nombre"
        required
        @change="changedPassword=true"
        @input="$v.usuario.nombre.$touch()"
        @blur="$v.usuario.nombre.$touch()"
      ></v-text-field>      
      <v-text-field
        v-model="usuario.apellidos"
        label="Apellidos"
        required
        @input="$v.usuario.apellidos.$touch()"
        @blur="$v.usuario.apellidos.$touch()"
      ></v-text-field>
      <v-text-field
        disabled
        v-model="usuario.email"
        :error-messages="emailErrors"
        label="Email"
        @input="$v.usuario.email.$touch()"
        @blur="$v.usuario.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="usuario.password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :error-messages="passwordErrors"
        :counter="10"
        :type="show1 ? 'text' : 'password'"
        label="Contraseña"        
        @click:append="show1 = !show1"
        @input="$v.usuario.password.$touch()"
        @blur="$v.usuario.password.$touch()"
      ></v-text-field>      
      <v-btn class="mr-4" type="submit" color="pink lighten-4">actualizar datos</v-btn>
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex' 
  import axios from "axios"    
  import router from "../router" 
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  //import Mensaje from '@/components/mensaje.vue'
  export default {
    mixins: [validationMixin],
    /*
    components: {
      Mensaje
    },
    */
    validations: {
      usuario:{
        password: { required, maxLength: maxLength(10) },
        email: { required, email },
        nombre: { required },
        apellidos: { required }
      }
    },

    data: () => ({
      show1: false,
      usuario:{
        changedPassword: false,
        email: '',
        password:'',
        nombre:'Pedro',
        apellidos: ''
      },
      message: '',
      success : '' 
      
      
    }),

    computed: {
      
      passwordErrors () {
        const errors = []
        if (!this.$v.usuario.password.$dirty) return errors
        !this.$v.usuario.password.maxLength && errors.push('Contraseña debe ser de máximo 10 caracteres')
        //!this.$v.usuario.password.required && errors.push('Contraseña es requerida.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.usuario.email.$dirty) return errors
        !this.$v.usuario.email.email && errors.push('Debe ser un e-mail valido')
        !this.$v.usuario.email.required && errors.push('E-mail es requerido')
        return errors
      },
      
      mensaje: function(){
        var m=this.message;
        
        return m;
      },
      exito: function(){
        var e=this.success;
        
        return e;
      }
    },

    methods: {
      ...mapActions(['setUsuario']),
        getUserData: function(usuario) {  
          console.log("wntrw");
          
          let self = this    
          axios.get("/usuario/log/"+usuario)    
            .then((response) => {    
                console.log(response)    
                console.log(response.data.Nombre)   
                console.log(this.usuario.nombre);
                
                self.$set(this.usuario, "nombre", response.data.Nombre)  
                self.$set(this.usuario, "apellidos", response.data.Apellido)
                console.log(response.data.User.email); 
                self.$set(this.usuario, "email", response.data.User.email)

                //Se tendria que pedir la contraseña anterior y verificar solo si tenemos tiempo (opcional)

                //self.$set(this.usuario, "password", response.data.User.password)

                /*
                self.$set(this.usuario, "apellidos", response.data.apellidos)  
                self.$set(this.usuario, "apellidos", response.data.apellidos)  
                self.$set(this.usuario, "apellidos", response.data.apellidos)  
                */
            })    
            .catch((errors) => {    
                console.log(errors)    
                router.push("/login")    
            })  
                  
        },

      modUsuario(usuario){
            // TODO crear put para actualizar valores
            
        this.axios.put('/usuario',
          {
            'email' : usuario.email, 'id':this.$store.state.id, 'password':usuario.password,
            'nombre': usuario.nombre, 'apellidos': usuario.apellidos
          })
        .then(res => {
          console.log(res);      
        })
        .catch( e => {
          console.log("error modificando la cuenta");          
          console.log(e.response.data.error.errors.correo.message);

          this.showAlert();
          this.mensaje.color = 'danger';
          this.mensaje.texto = e.response.data.error.errors.correo.message;
        })
        this.usuarios = {}
      },
      submit () {
        this.$v.$touch()
      },
      
      fillFields(){
        // TODO averiguar por qué no se obtienen los datos
        /*
        this.usuario.email = localStorage.email
        console.log("f",localStorage.vuex.email)
        this.usuario.nombre = localStorage.nombre
        console.log("f",localStorage.nombre)
        this.usuario.apellidos = localStorage.apellidos
        console.log("f",localStorage.email)    
        */
        //Creo que es mejor consultar pedir los datos al servidor porque como lo tenemos, en el frontend lo pueden editar

      }
    },
    created() {
      if (localStorage) {
      //this.name = localStorage.name;
        this.setUsuario();
        console.log("e:"+this.$store.state.id);
        this.fillFields()

      }
    },
    mounted(){
      this.getUserData(this.$store.state.id);
    }
  }
</script>
