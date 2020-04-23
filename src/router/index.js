import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Peliculas from '../views/Peliculas.vue'
import Series from '../views/Series.vue'
import Listas from '../views/Listas.vue'
import Amigos from '../views/Amigos.vue'
import Cuenta from '../views/Cuenta.vue'
import Ajustes from '../views/Ajustes.vue'

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
    path: '/amigos',
    name: 'Amigos',
    component: Amigos
  },
  {
    path: '/cuenta',
    name: 'Cuenta',
    component: Cuenta
  },
  {
    path: '/ajustes',
    name: 'Ajustes',
    component: Ajustes
  }
]

const router = new VueRouter({
  routes
})

export default router
