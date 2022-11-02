<template>
  <div id="app">
    <GridTable/>
    <!-- <GridView :data="data"/> -->
    <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App With Composition Api"/> -->
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import GridView from './components/GridView.vue';
import GridTable from './components/GridTable.vue';
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
