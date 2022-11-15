<template>
  <div id="app">
    <GridTable :table="table"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GridTable from "./components/GridTable.vue"; // NOSONAR
import stach from "./stach-sdk";
type IRow =
  | stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow[]
  | null
  | undefined;
const table = ref<IRow>();
// fetch data from the server
fetch("http://localhost:3000/data")
  .then((response) => response.json())
  .then((data) => {
    const pkg =
      stach.factset.protobuf.stach.v2.RowOrganizedPackage.create(data);
    table.value = pkg.tables.main.data?.rows;
  });

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
