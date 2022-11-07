<template>
  <table>
    <caption>
      GridTable
    </caption>
    <th></th>

    <tr
      v-for="(row, rowIndex) in table"
      :key="rowIndex"
      v-bind:class="{ header: isHeader(row) }"
    >
      <td
        v-for="(value, colIndex) in filteredCells(row.cells, rowIndex)"
        :key="colIndex"
        v-bind:rowspan="rowspan(row, colIndex)"
        v-bind:colspan="colspan(row, colIndex)"
        v-bind:style="{
          textAlign: 'left',
          verticalAlign: alignment(row, colIndex, 'vertical'),
        }"
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


const isHeader = (row: any): boolean => {
  return row.rowType === "Header";
};
const isHidden = (value?: any, rowIndex?: number): boolean => {
  return false;
};

const colspan = (row: any, colIndex: number): number => {
  return row.headerCellDetails?.[colIndex].colspan ?? 1;
};

const rowspan = (row: any, colIndex: number): number => {
  return row.headerCellDetails?.[colIndex].rowspan ?? 1;
};

const groupLevel = (row: any, colIndex: number): string => {
  return row.cellDetails?.[0].groupLevel ?? 0;
};

let table = ref(null) as any;

fetch("http://localhost:3000/data")
  .then((response) => response.json())
  .then((data) => {
    table.value = data.tables.main.data.rows;
  });


const alignment = (row: any, colIndex: number, type: string): string => {
  return type === "vertical" ? "baseline" as const : "left" as const;
};

const filteredCells = (cells: any, rowIndex: number) => {
  return cells.filter((item: any) => !isHidden(item, rowIndex));
};
</script>

<style lang="scss">
.header {
  background-color: rgb(213, 165, 165) !important;
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