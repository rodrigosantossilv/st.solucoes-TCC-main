import { createRouter, createWebHistory } from 'vue-router';
import Telaum from './components/Telaum.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import KanbanBoard from './components/KanbanBoard.vue';
import OpenTicketPage from './components/OpenTicketPage.vue';

const routes = [
  { path: '/', component: Telaum },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/kanbanboard', component: KanbanBoard },
  { path: '/openticketpage', component: OpenTicketPage}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
