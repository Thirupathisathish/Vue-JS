<template>
 

  <router-view/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import store from './store';

onMounted(() => {
 store.dispatch('fetchUsers')
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
header{
  text-align: center;
}
nav {
 
  top: 0;
  left: 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
  position: relative;
}

</style>

