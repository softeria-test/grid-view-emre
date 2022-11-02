<template>
  <div>
    <h2>Grid View</h2>
    <!-- Table -->
    <div>
    <table id="mytable" cellspacing="0" cellpadding="0">
      <!-- Grid -->
      <tbody>
      <tr class=" title">
        <th>ID</th>
        <th>Name</th>
        <th>Country</th>
        <th>Entity Type</th>
        <th>Content Flags</th>
      </tr>
      <tr data-depth="0">
        <td>0123456789</td>
        <td><span class="toggle collapse"></span>Apple, Inc.</td>
        <td>United States</td>
        <td>Public Company</td>
        <td>⚠</td>
      </tr>

        <tr v-for="(row, rowIndex) in table" :key="rowIndex">
          <td>{{row.cells[0]}}</td>
          <td>{{row.cells[1]}}</td>
          <td><span class="toggle"></span>{{row.cells[2]}}</td>
          <td>{{row?.cells[3] || ""}}</td>
          <td>{{row?.cells[4] || ""}}</td>
           <!-- <td>⚠</td> -->
        </tr>
    </tbody>
    </table>
  </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps,onMounted, ref } from "vue";
import GridViewItem from "./GridViewItem.vue";

const props = defineProps({
  data: String,
});

const isHeader = (row:object):boolean => true;
const isHidden = (row:object, colIndex:object):boolean => true;
const colspan = (row:object):boolean => true;
let table = ref(null);
  fetch('http://localhost:3000/data')
  .then((response) => response.json()).then(data => {
    table.value = data.tables.main.data.rows;
    console.log(data.tables.main.data.rows);
    console.log(table);
  })
</script>

<style scoped lang="scss">
    table{
        margin: auto;
        width: 700px;
        border: none;
        color: black;
    }
    .title{
      background-color: rgb(183, 181, 181);
    }
    tr{
      background-color:lightgrey ;
      align-self: center;
    }
    table th{
      width: 140px;
    }
    table tr:nth-child(even) {
    background-color:white;
    }

</style>