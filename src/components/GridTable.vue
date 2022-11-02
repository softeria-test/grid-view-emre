<template>
  <table>
    <tr
      v-for="(row, rowIndex) in table"
      :key="rowIndex"
      v-bind:class="{ header: isHeader(row) }"
    >
      <td
        v-for="(value, colIndex) in row.cells"
        v-bind:colspan="colspan(row, colIndex)"
        v-bind:key="colIndex"
      >
        <div
          v-bind:style="{ 'padding-left': groupLevel(row, colIndex) + 'em' }"
        >
          {{ value }}
        </div>
      </td>
    </tr>
  </table>
</template>
<script setup lang="ts">
import { ref } from "vue";
const isHeader = (row: object): boolean => {
  return row.rowType === "Header";
};
/* const isHidden = (row:object, colIndex:object):boolean => true; */
const colspan = (row: object, colIndex: number): number => {
  return row?.headerCellDetails?.[0].colspan ?? 0;
};
const rowspan = (row: object, colIndex: number): number => {
  return row?.headerCellDetails?.[0].rowspan ?? 0;
};
const groupLevel = (row: object, colIndex: number): string => "0";
let table = ref(null);
fetch("http://localhost:3000/data")
  .then((response) => response.json())
  .then((data) => {
    table.value = data.tables.main.data.rows;
    console.log(data.tables.main.data.rows);
    console.log(table);
  });
</script>

<style lang="scss">
.header {
  background-color: rgb(183, 181, 181);
}
table {
  margin: auto;
  width: 700px;
  border: none;
  color: black;
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
