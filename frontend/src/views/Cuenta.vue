<template>
  <div class="container">
    <h1>Ver y modificar cuenta</h1>
    <v-container>
      <v-alert v-if="message" type="error" v-model="message">
        
      </v-alert>
      <v-alert v-if="success" type="success" v-model="success">
        
      </v-alert>
  </v-container>

    <form @submit.prevent="modUsuario(usuario)"> 
      
       <v-text-field
        v-model="usuario.nombre"
        label="Nombre"
        required
        @change="changedPassword=true"
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
      

      <v-btn class="mr-4" type="submit">actualizar datos</v-btn>
      <v-btn @click="clear">clear</v-btn>


    </form>



    <router-link :to="{ name: 'Registro'}">
        <p>Registro</p>
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
        changedPassword: false,
        email: '',
        password:'********',
        nombre:'',
        apellido: '',
        id: null
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
      modUsuario(usuario){
            // TODO crear post para actualizar valores
            this.axios.post('/modificacion', usuario)
        .then(res => {
          console.log(res);      
          router.push({name: 'Login'});
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
      clear () {
        this.$v.$reset()
        this.setUsuario()
        
      },
      fillFields(){
        // TODO averiguar por qué no se obtienen los datos
        this.usuario.email = localStorage.email
        console.log("f",localStorage.email)
        this.usuario.nombre = localStorage.nombre
        console.log("f",localStorage.nombre)
        this.usuario.apellido = localStorage.apellido
        console.log("f",localStorage.email)                
      }
    },
    created() {
      if (localStorage) {
      //this.name = localStorage.name;
      //  this.setUsuario();
        console.log("e:"+this.$store.state.id);
        this.fillFields()

      }
      
  }
  }
</script>
