<template>
    <div class="container">
      <h1>Registro</h1>
    <form @submit.prevent="agregarUsuario(usuario)">
        
        <v-text-field
        v-model="usuario.nombre"
        label="Nombre"
        required
        @input="$v.usuario.nombre.$touch()"
        @blur="$v.usuario.nombre.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="usuario.apellido"
        label="Apellido"
        required
        @input="$v.usuario.apellido.$touch()"
        @blur="$v.usuario.apellido.$touch()"
      ></v-text-field>

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
    <router-link :to="{ name: 'Login'}">
        <p>Login</p>
    </router-link>
    </div>
</template>
<script>
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
        apellido: { required }
      }
    },

    data: () => ({
      show1: false,
      usuario:{
        email: '',
        password:'',
        nombre:'',
        apellido: ''
      },
      message: '',
      success : '' 
      
      
    }),

    computed: {
      
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
      agregarUsuario(usuario){
            this.axios.post('/registro', usuario)
        .then(res => {
          console.log(res);
          
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
          
          console.log(e.response.data.error.errors.correo.message);

          // Alerta de mensaje
          this.showAlert();
          this.mensaje.color = 'danger';
          this.mensaje.texto = e.response.data.error.errors.correo.message;
        })
        this.usuarios = {}
      },
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.usuario.nombre = ''
        this.usuario.email = ''
        this.usuario.apellido=''
        this.usuario.password=''
        
      },
    },
    mounted() {    
       
    }  
  }
</script>
