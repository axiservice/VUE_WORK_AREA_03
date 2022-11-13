import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Dossier from '../views/Dossier.vue' 
import CreateDossier from '../views/CreateDossier.vue'
import EditDossier from '../views/EditDossier'
import Crud from '../views/Crud'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dossier',
    name: 'Dossier',
    component: Dossier
  },
  {
    path: '/createDossier',
    name: 'CreateDossier',
    component: CreateDossier
  },
  {
    path: '/editDossier/:id',
    name: 'EditDossier',
    component: EditDossier
  },
  {
    path: '/crud',
    name: 'Crud',
    component: Crud
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
