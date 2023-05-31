import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import MyAgenda from "../components/MyAgenda.vue";
import ChooseRoom from "../views/ChooseRoom";
const routes = [
  {
    path: "/connecter",
    name: "connecter",
    component: HomeView,
  },
  {
    path: "/inscrire",
    name: "inscrire",
    component: AboutView,
  },
  {
    path: "/agenda",
    name: "agenda",
    component: MyAgenda,
  },
  {
    path: "/room",
    name: "room",
    component: ChooseRoom,
  },
  {
    path: "/",
    redirect: "/connecter",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
