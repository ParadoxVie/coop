import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/se-connecter',
    name: 'seConnecter',
    component: () => import(/* webpackChunkName: "about" */ '../views/SeConnecter.vue')
  },
  {
    path: '/Creer-compte',
    name: 'CreerCompte',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreerCompte.vue')
  },
  {
    path: '/liste-membre',
    name: 'liste-membre',
    component: () => import(/* webpackChunkName: "about" */ '../views/Membre.vue')
  },
  {
    path: '/Conversations',
    name: 'Conversations',
    component: () => import(/* webpackChunkName: "about" */ '../views/Conversations.vue')
  },
  {
    path: '/Conversation/:id',
    name: 'uneConversation',
    component: () => import(/* webpackChunkName: "about" */ '../views/UneConversation.vue')
  },
  {
    path: '/FicheMembre/:id',
    name: 'fiche-membre',
    component: () => import(/* webpackChunkName: "about" */ '../views/FicheMembre.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
