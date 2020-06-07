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

        <v-list-item v-show="!id" link to="/peliculas">
          <v-list-item-action>
            <v-icon>mdi-movie-filter</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Películas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group v-show="id" prepend-icon="mdi-movie-filter">
          <template v-slot:activator>
            <v-list-item-title>Películas</v-list-item-title>
          </template>
          <v-list-item link to="/peliculas/vistas">
            <v-list-item-action>
              <v-icon>mdi-eye-off-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Vistas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/peliculas/pendientes">
            <v-list-item-action>
              <v-icon>mdi-clock-time-three-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Pendientes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/peliculas/favoritas">
            <v-list-item-action>
              <v-icon>mdi-heart-multiple-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Favoritas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/peliculas/all">
            <v-list-item-action>
              <v-icon>mdi-deathly-hallows</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Ver todo</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-group>

        <v-list-item v-show="!id" link to="/series">
          <v-list-item-action>
            <v-icon>mdi-television</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Series</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group v-show="id" prepend-icon="mdi-television">
          <template v-slot:activator>
            <v-list-item-title>Series</v-list-item-title>
          </template>
          <v-list-item link to="/series/vistas">
            <v-list-item-action>
              <v-icon>mdi-eye-off-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Vistas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/series/pendientes">
            <v-list-item-action>
              <v-icon>mdi-clock-time-three-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Pendientes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/series/favoritas">
            <v-list-item-action>
              <v-icon>mdi-heart-multiple-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Favoritas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/series/all">
            <v-list-item-action>
              <v-icon>mdi-death-star-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Ver todo</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-group>

        <v-list-item v-show="id" link to="/listas">
          <v-list-item-action>
            <v-icon>mdi-playlist-star</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Listas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

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

        <v-list-item v-show="id" @click="cerrarSession()">        
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark clipped-left hide-on-scroll>
      <v-icon x-large left>mdi-drama-masks</v-icon>
      <v-spacer></v-spacer><v-spacer></v-spacer>
      <v-toolbar-title @click="$router.push('/')" class="display-1 font-italic font-weight-bold" role="button">Eye Movies</v-toolbar-title>
      <v-spacer></v-spacer><v-spacer></v-spacer>      
      <v-text-field v-model="titulo" @keyup.enter="getResultados(titulo); getResultadosSeries(titulo); $router.push('/busqueda'); titulo=''" 
        placeholder="Búsqueda" append-icon="mdi-magnify" class="pt-5"></v-text-field>      
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
      ...mapActions(['getResultados','getResultadosSeries','cerrarSession']),
      created(){
        this.cerrarSession();
      }
    },
    
};
</script>
