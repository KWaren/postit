import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/DetailPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import Create from '@/views/Create.vue'
import Update from '@/views/Update.vue'
import LocalHome from '@/views/local/Home.vue'
import LocalDetail from '@/views/local/DetailPage.vue'
import LocalCreate from '@/views/local/Create.vue'
import LocalUpdate from '@/views/local/Update.vue'

const routes = [
  { path: '/', component: Home, name: "notes" },
  { path: '/notes/:_id', component: Detail, name: "notes.show" },
  { path: '/create', component: Create, name: "notes.create" },
  { path: '/up-note/:_id', component: Update, name: "notes.update" },
  { path: '/local', component: LocalHome, name: "local.notes" },
  { path: '/local/notes/:_id', component: LocalDetail, name: "local.notes.show" },
  { path: '/local/create', component: LocalCreate, name: "local.notes.create" },
  { path: '/local/up-note/:_id', component: LocalUpdate, name: "local.notes.update" },
  { path: '/:pathMatch(.*)*', component: NotFoundPage, name: "notFound" },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
