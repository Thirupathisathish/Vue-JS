<template>
  <header>
    <div class="logo">
      <img src="../assets/logo.png" alt="Logo" />
    </div>
    <nav :class="{ 'show-nav': showNav }">
      <div class="hamburger" @click="toggleNav">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="nav-links">
        <router-link to="/"
        >Home</router-link>
        <router-link to="/reservation" 
        >Reservation</router-link>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showNav = ref(false);

const toggleNav = () => {
  showNav.value = !showNav.value;
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
}

.logo {
  flex-shrink: 0;
}

.logo img {
  height: 60px;
  max-width: 100%;
}

nav {
  display: flex;
  gap: 15px;
  color: green;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #F0FFFF ;
  font-size: 25px;
  margin-left: 20px;
  
}

nav .router-link-exact-active {
  background: linear-gradient(45deg, cyan,rgb(79, 79, 138));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
 }


@media (max-width: 576px) {
  header {
    flex-direction: column;
    padding: 15px;
  }

  .logo img {
    height: 40px;
  }

  nav {
    flex-direction: column;
    align-items: center;
  }

  .hamburger {
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    z-index: 1;
  }

  .hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: aqua;
    transition: transform 0.3s ease;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  nav.show-nav .nav-links {
    max-height: 200px;
  }

  nav a {
    margin-bottom: 10px;
  }
}

@media (min-width: 576px) and (max-width: 992px) {
  .logo img {
    height: 50px;
  }

  nav a {
    font-size: 22px;
  }
}

</style>
