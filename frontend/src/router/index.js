import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Peliculas from '../views/Peliculas.vue'
import Series from '../views/Series.vue'
import Listas from '../views/Listas.vue'
import Lista from '../views/Lista.vue'
import Cuenta from '../views/Cuenta.vue'
import Movie from '../views/Movie.vue'
import Registro from '../views/Registro.vue'
import Login from '../views/Login.vue'
import Serie from '../views/Serie.vue'
import Busqueda from '../views/Busqueda.vue'
import PeliculasVistas from '../views/PeliculasVistas.vue'
import PeliculasPendientes from '../views/PeliculasPendientes.vue'
import PeliculasFavoritas from '../views/PeliculasFavoritas.vue'
import SeriesVistas from '../views/SeriesVistas.vue'
import SeriesPendientes from '../views/SeriesPendientes.vue'
import SeriesFavoritas from '../views/SeriesFavoritas.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/peliculas/',
    name: 'Peliculas',
    component: Peliculas
  },
  {
    path: '/peliculas/all',
    name: 'Peliculas',
    component: Peliculas
  },
  {
    path: '/peliculas/vistas',
    name: 'Peliculas vistas',
    component: PeliculasVistas
  },
  {
    path: '/peliculas/pendientes',
    name: 'Peliculas pendientes',
    component: PeliculasPendientes
  },
  {
    path: '/peliculas/favoritas',
    name: 'Peliculas favoritas',
    component: PeliculasFavoritas
  },
  {
    path: '/series',
    name: 'Series',
    component: Series
  },
  {
    path: '/series/all',
    name: 'Series',
    component: Series
  },
  {
    path: '/series/vistas',
    name: 'Series vistas',
    component: SeriesVistas
  },
  {
    path: '/series/pendientes',
    name: 'Series pendientes',
    component: SeriesPendientes
  },
  {
    path: '/series/favoritas',
    name: 'Series favoritas',
    component: SeriesFavoritas
  },
  
  {
    path: '/listas',
    name: 'Listas',
    component: Listas
  },
  {
    path: '/lista/:id_lista',
    name: 'Listas',
    component: Lista
  },
  {
    path: '/cuenta',
    name: 'Cuenta',
    component: Cuenta
  },
  {
    path: '/peli/:id_movie',
    name: 'Movie',
    component: Movie
  },
  {
    path: '/serie/:id_serie',
    name: 'Serie',
    component: Serie
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/busqueda',
    name: 'Busqueda',
    component: Busqueda
  }
]

const router = new VueRouter({
  routes
})

export default router
