import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import Movie from "./components/Movie.vue";
import Comoanyinfo from "./components/Comoanyinfo.vue";
import Registerdusers from "./components/Registerdusers.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Movie",
    component: Movie,
    path: "/",
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/sign-up",
  },
  {
    name: "Login",
    component: Login,
    path: "/login",
  },
  {
    name: "Companyinfo",
    component: Comoanyinfo,
    path: "/company-info",
  },
  {
    name: "RegisteredUsers",
    component: Registerdusers,
    path: "/registered-users",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
