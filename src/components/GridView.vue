<template>
  <div>
    <h2>Grid View</h2>
    <!-- Table -->
    <div>
      <table id="mytable">
        <caption></caption>
        <!-- Grid -->
        <tbody>
          <tr class="title">
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
            <td>{{ row }}</td>
            <td>{{ row }}</td>
            <td><span class="toggle"></span>{{ row }}</td>
            <td>{{ row }}</td>
            <td>{{ row }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

let table = ref(null);
</script>

<style scoped lang="scss">
table {
  margin: auto;
  width: 700px;
  border: none;
  color: black;
}
.title {
  background-color: rgb(183, 181, 181);
}
tr {
  background-color: lightgrey;
  align-self: center;
}
table th {
  width: 140px;
}
table tr:nth-child(even) {
  background-color: white;
}
</style>
