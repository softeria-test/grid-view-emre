<template>
  <div id="app">
    <GridTable :table="table"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GridTable from "./components/GridTable.vue"; // NOSONAR
import stach from "./stach-sdk";

interface ExtraIRow extends stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow{
  isOpen?:boolean,
  childLength?:number
}
type IRow =
  | ExtraIRow[]
  | null
  | undefined;

const table = ref<IRow>([]);

// fetch data from the server
fetch("http://localhost:3000/data")
  .then((response) => response.json())
  .then((data) => {
    const pkg =
      stach.factset.protobuf.stach.v2.RowOrganizedPackage.create(data);
    table.value = pkg.tables.main.data?.rows;
    if(table.value === undefined || table.value === null){
      table.value=[];
      console.log("table is empty")
    }
  else{
    //add isOpen and childLength every element of table
    table.value?.forEach((item:ExtraIRow, index:number)=>{
      item["isOpen"] = false
      item["childLength"] = 0
      if(!item.cellDetails?.[0].groupLevel){
        if(!table.value)
        return
        for(let i = index+1;i<table.value.length ;i++){
          if(table.value[i].cellDetails?.[0].groupLevel){
            if(table.value[i].cellDetails?.[0].groupLevel === 1)
          item["childLength"] += 1
          }
          else{
            break
          }
        }
      }

    })
    
  }

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
