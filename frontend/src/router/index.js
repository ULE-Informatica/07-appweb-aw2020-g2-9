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



Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/peliculas',
    name: 'Peliculas',
    component: Peliculas
  },
  {
    path: '/series',
    name: 'Series',
    component: Series
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
  }
]

const router = new VueRouter({
  routes
})

export default router
