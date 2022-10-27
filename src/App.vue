<template>
  <div id="app">
    <GridView :data="data"/>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import GridView from './components/GridView.vue';

export default Vue.extend({
  data(){
    return{
      data:{
        name: "Apple" as string
      }
    }
  },
  name: 'App',
  components: {
    HelloWorld,
    GridView
  }
},
);
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
