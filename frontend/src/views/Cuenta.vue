<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="shrink">
        <h1>cuenta {{ this.$store.state.id }}</h1>
        <h2>{{nombre}}</h2>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
    import { mapActions } from 'vuex' 
    import axios from "axios"    
    import router from "../router"    
    //import jwtDecode from  'jwt-decode'

    export default {    
        name: "Login",
         
        data() {    
            
            
            return {    
                    //id: this.$store.state.id,
                    nombre: "" ,
                    apellido : "" 
                   
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
                        self.$set(this, "nombre", response.data.Nombre)    
                        self.$set(this, "apellido", response.data.Apellido)  
                    })    
                    .catch((errors) => {    
                        console.log(errors)    
                        router.push("/login")    
                    })  
                     
            },
             
             
        },    
        created() {
            if (localStorage) {
            //this.name = localStorage.name;
              this.setUsuario();
              console.log("e:"+this.$store.state.id);
              
            }
        },
        mounted(){
          this.getUserData(this.$store.state.id);
        }    
    }
</script>
