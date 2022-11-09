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
        v-for="(value, colIndex) in filteredCells(row.cells)"
        :key="colIndex"
        v-bind:rowspan="rowspan(row, colIndex)"
        v-bind:colspan="colspan(row, colIndex)"
        v-bind:style="{
          textAlign: 'left',
          verticalAlign: alignment(row, colIndex, 'vertical'),
        }"
      >
        <div
          v-bind:style="{
            'padding-left': groupLevel(row, parseInt(colIndex)) + 'em',
          }"
        >
          {{ value }}
        </div>
      </td>
    </tr>
  </table>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import stach from "../stach-sdk/stach";

type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow;
type IListValue = stach.google.protobuf.IListValue | null
type IRow = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow[] | null | undefined
let table = ref<IRow>();

// fetch data from the server
fetch("http://localhost:3000/data")
  .then((response) => response.json())
  .then((data) => {
    const pkg =
      stach.factset.protobuf.stach.v2.RowOrganizedPackage.create(data);
    table.value = pkg.tables.main.data?.rows;

  });

// isHeader checks if the row is a header row
const isHeader = (row?: Row): boolean => {
  return row?.rowType === ("Header" as Row);
};

// colspan returns the colspan for the cell at the given row and column index
const colspan = (row: Row, colIndex: string): number => {
  return row.headerCellDetails?.[colIndex].colspan ?? 1;
};

// rowspan returns the rowspan for the cell at the given row and column index
const rowspan = (row: Row, colIndex: string): number => {
  return row.headerCellDetails?.[colIndex].rowspan ?? 1;
};

// groupLevel returns the group level for the cell at the given row and column index
function groupLevel(row: Row, colIndex: number): number {
  console.log(colIndex, row.cellDetails?.[0].groupLevel);
  return colIndex === 0 ? row.cellDetails?.[0].groupLevel ?? 0 : 0;
}

// alignment returns the alignment for the cell at the given row and column index and the given alignment type
const alignment = (row?: Row, colIndex?: string, type?: string): string => {
  return type === "vertical" ? ("baseline" as const) : ("left" as const);
};

const filteredCells = (
  cells?: IListValue
): IListValue | undefined => {
  return cells;
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
