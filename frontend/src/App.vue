<template>
  <v-app id="inspire">    
    <v-navigation-drawer v-model="drawer" app dark clipped expand-on-hover permanent>
      <v-list dense>

        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home-heart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/peliculas">
          <v-list-item-action>
            <v-icon>mdi-movie-filter</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Películas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/series">
          <v-list-item-action>
            <v-icon>mdi-television</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Series</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/listas">
          <v-list-item-action>
            <v-icon>mdi-playlist-star</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Listas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!--<v-list-item link to="/amigos">
          <v-list-item-action>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Amigos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->

        <v-list-item v-if="hidden" link to="/cuenta">        
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cuenta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else link to="/Login">        
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cuenta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="cerrarSession()">        
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!--<v-list-item link to="/ajustes">
          <v-list-item-action>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Ajustes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark clipped-left hide-on-scroll>
      <v-icon x-large left>mdi-drama-masks</v-icon>
      <v-spacer></v-spacer><v-spacer></v-spacer>
      <v-toolbar-title @click="$router.push('/')" class="display-1 font-italic font-weight-bold">Eye Movies</v-toolbar-title>
      <v-spacer></v-spacer><v-spacer></v-spacer>      
      <v-text-field v-model="titulo" @keyup.enter="getResultados(titulo); $router.push('/peliculas')" 
        placeholder="Búsqueda" append-icon="mdi-magnify" class="pt-5"></v-text-field>      
      <!--<v-btn v-show= hidden  icon>
        <v-icon v-on:click="cerrarSession()">mdi-logout</v-icon>
      </v-btn>-->
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  data(){
    return{
      drawer: false,
      titulo: '',
      //hidden: false,
      }
    },   
    
    computed:{
        ...mapState([
            'resultados','isLogueado','hidden','id'
        ]),
        ...mapMutations([
                'llenarResultados',
                'llenarResultadosSeries'
            ])
    },
    methods:{
      ...mapActions(['getResultados','getResultadosSeries','cerrarSession'])
    },
    
};
</script>
