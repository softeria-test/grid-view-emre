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
          v-bind:style="{ 'padding-left': groupLevel(row) + 'em' }"
        >
          {{ value }}
        </div>
      </td>
    </tr>
  </table>
</template>
<script setup lang="ts">
import { ref } from "vue";
import stach from "../stach-sdk/stach"

// type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow
type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.Row
let table = ref<stach.factset.protobuf.stach.v2.RowOrganizedPackage.ITableData| null | undefined>();

// fetch data from the server
fetch("http://localhost:3000/data")
  .then((response) => response.json())
  .then((data) => {
    // table = data.tables.main.data.rows;
    const pkg = stach.factset.protobuf.stach.v2.RowOrganizedPackage.create(data);
    table.value = pkg.tables.main.data;
  });

const isHeader = (row: Row): boolean => {
  return row.rowType === stach.factset.protobuf.stach.v2.RowOrganizedPackage.Row.RowType.Header;
};
const isHidden = (): boolean => {
  return false;
};

const colspan = (row: Row, colIndex: number): number => {
  return row.headerCellDetails?.[colIndex].colspan ?? 1;
};

const rowspan = (row: Row, colIndex: number): number => {
  return row.headerCellDetails?.[colIndex].rowspan ?? 1;
};

const groupLevel = (row: stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow | { [k: string]: stach.factset.protobuf.stach.v2.table.IMetadataItem; } | { [k: string]: stach.factset.protobuf.stach.v2.RowOrganizedPackage.IMapOfMetadata; } | null | undefined): number => {
  // return row.cellDetails?.[0].groupLevel ?? 0;
  return row?.cellDetails?.[0].groupLevel ?? 0;
  
};

const alignment = (row?: stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow[] | { [k: string]: stach.factset.protobuf.stach.v2.table.IMetadataItem; } | { [k: string]: stach.factset.protobuf.stach.v2.RowOrganizedPackage.IMapOfMetadata; } | null | undefined, colIndex?: number, type?: string): string => {
  return type === "vertical" ? "baseline" as const : "left" as const;
};
//get data from stach
const filteredCells = (cells: string[]): string[] => {
  return cells.filter(() => !isHidden());
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