<template>
  <div class="container">
    <v-row class="pa-5">
      <!-- INICIAR SESIÓN -->
      <v-col cols=50%>
        <h1>Iniciar sesión</h1>
        <!--<v-container>
          <v-alert v-if="message" type="error" v-model="message">        
          </v-alert>
          <v-alert v-if="success" type="success" v-model="success">        
          </v-alert>
        </v-container>-->
        <form @submit.prevent="getUsuario(usuario)" class="mt-3">      
          <v-text-field
            v-model="usuario.email"
            :error-messages="emailErrors"
            label="Email"
            required
            @input="$v.usuario.email.$touch()"
            @blur="$v.usuario.email.$touch()"
            @keydown.enter="submit"
          ></v-text-field>
          <v-text-field
            v-model="usuario.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="passwordErrors"
            :counter="10"
            :type="show1 ? 'text' : 'password'"
            label="Contraseña"
            required
            @click:append="show1 = !show1"
            @input="$v.usuario.password.$touch()"
            @blur="$v.usuario.password.$touch()"
            @keydown.enter="submit"
          ></v-text-field>  
          <v-row class="pt-7 justify-center">
            <v-btn class="mr-4" type="submit" color="pink lighten-4">Iniciar sesión</v-btn>
            <v-btn @click="clear" color="pink lighten-4">Borrar</v-btn>
          </v-row>
        </form>
      </v-col>

      <!-- REGISTRO -->
      <v-col class="pl-5">
        <h2 align="center" class="pt-3">¿Todavía no tienes una cuenta?</h2>
        <v-row class="pt-12 justify-center">
          <v-btn @click="$router.push('/registro')" class="mt-7" color="pink lighten-4">Regístrate aquí</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  //import router from "../router"  
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import { mapActions } from 'vuex'
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
      }
    },

    data: () => ({
      show1: false,
      usuario:{
        email: '',
        password:''
      },
      message: '',
      success : '' 
    }),

    computed: {
      logueado(){
        return this.$store.state.id;
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.usuario.password.$dirty) return errors
        !this.$v.usuario.password.maxLength && errors.push('La contraseña no puede tener más de 10 caracteres')
        !this.$v.usuario.password.required && errors.push('La contraseña es obligatoria')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.usuario.email.$dirty) return errors
        !this.$v.usuario.email.email && errors.push('El email debe ser válido')
        !this.$v.usuario.email.required && errors.push('El email es obligatorio')
        return errors
      },
      //TRATAR DE QUE APAREZCAN LOS MENSAJES
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
      ...mapActions(['getUsuario']),
    
      
      submit () {
        this.$v.$touch()
      },

      clear () {
        this.$v.$reset()
        this.usuario.password = ''
        this.usuario.email = ''
      }      
    },

    mounted() {    
       
    }  
  }
</script>