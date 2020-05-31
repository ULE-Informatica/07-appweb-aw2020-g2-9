<template>
  <div class="container">
    <h1>Login</h1>
    <v-container>
      <v-alert v-if="message" type="error" v-model="message">
        
      </v-alert>
      <v-alert v-if="success" type="success" v-model="success">
        
      </v-alert>
  </v-container>



    <form @submit.prevent="getUsuario(usuario)">
      
      <v-text-field
        v-model="usuario.email"
        :error-messages="emailErrors"
        label="E-mail"
        required
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
        required
        @click:append="show1 = !show1"
        @input="$v.usuario.password.$touch()"
        @blur="$v.usuario.password.$touch()"
      ></v-text-field>
      

      <v-btn class="mr-4" type="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
    <router-link :to="{ name: 'Registro'}">
        <p>Registro</p>
    </router-link>
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
        console.log("muestra algo");
        
        return this.$store.state.id;
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.usuario.password.$dirty) return errors
        !this.$v.usuario.password.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.usuario.password.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.usuario.email.$dirty) return errors
        !this.$v.usuario.email.email && errors.push('Must be valid e-mail')
        !this.$v.usuario.email.required && errors.push('E-mail is required')
        return errors
      },
      //TRATAR DE QuE APAREZCAN LOS MENSAJES
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
    
      /*
      verUsuario(usuario){
            this.axios.post('/login', usuario)
        .then(res => {

          localStorage.setItem('userToken',res.data );



          console.log("www");
          
          console.log(res.data);
          // Alerta de mensaje
            //router.push('/dashboard',usuario);
            router.push({name: 'Cuenta'});
          //this.showAlert();
          //this.mensaje.texto = 'Usuario logeado!'
          //this.mensaje.color = 'success';
        })
        .catch( e => {
          
          console.log(e.response);
          
        })
        
        
        this.usuario = {}
            
        },
        */
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