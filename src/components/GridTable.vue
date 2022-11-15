<template>
  <table>
    <caption>
      GridTable
    </caption>
    <th></th>

    <tr
      v-for="(row, rowIndex) in table"
      :key="rowIndex"
      :class="{ header: isHeader(row) }"
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
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import stach from "../stach-sdk/stach";
type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow;
type IRow =
  | stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow[]
  | null
  | undefined;
type RowType = stach.factset.protobuf.stach.v2.RowOrganizedPackage.Row.RowType;

@Component
export default class GridTable extends Vue {
  @Prop() private table!: IRow;

  isHeader(row?: Row) {
    return row?.rowType === ("Header" as unknown as RowType);
  }

  // colspan returns the colspan for the cell at the given row and column index
  colspan(row: Row, colIndex: string) {
   return row.headerCellDetails?.[colIndex].colspan ?? 1;
  }

  // rowspan returns the rowspan for the cell at the given row and column index
  rowspan(row: Row, colIndex: string) {
    return row.headerCellDetails?.[colIndex].rowspan ?? 1;
  }

  // groupLevel returns the group level for the cell at the given row and column index
  groupLevel(row: Row, colIndex: number) {
    return colIndex === 0 ? row.cellDetails?.[0].groupLevel ?? 0 : 0;
  }

  // alignment returns the alignment for the cell at the given row and column index and the given alignment type
  alignment(row?: Row, colIndex?: string, type?: string) {
    return type === "vertical" ? ("baseline" as const) : ("left" as const);
  }

  filteredCells(cells?: Array<any>) {
    return cells?.filter(_ => true);
  }
}
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