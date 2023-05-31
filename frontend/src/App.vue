<template>
  <diV className="SalleBg">
    <nav v-if="$route.name == 'connecter' || $route.name == 'inscrire'">
      <router-link
        class="white sat ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
        to="/connecter"
        >Se connecter</router-link
      >
      |
      <router-link
        class="white sat b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
        to="/inscrire"
        >S’inscrire</router-link
      >
    </nav>
    <router-view />
  </diV>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
}

nav a.router-link-exact-active {
  font-weight: bold;
  border-color: black;
  background-color: white;
  color: black;
}
.SalleBg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-image: url("./assets/Salle.jpg");
  background-size: cover;
  background-position: center;
}
</style>
