<template>
<div>
  <table v-if="collapseTable">
    <caption>
      GridTable
    </caption>
    <th></th>

    <tr
      v-for="(row, rowIndex) in collapseTable"
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
        ><button :id="buttonId(rowIndex)" v-if="showButton(row,parseInt(colIndex), rowIndex)" @click="toggle_isOpen(row,rowIndex)">{{ row.isOpen ? '-' : '+' }}</button>
          {{ value }}
        </div>
      </td>
    </tr>
  </table>
  <p v-if="false">
  {{watchVal}} 
  </p>
</div>
</template>
<script lang="ts">
import { defineComponent, PropType, watchEffect } from "vue";
import stach from "../stach-sdk/stach";
import expandCollapse from "./features/expandCollapse"
import {buttonId, isHeader, colspan, rowspan, groupLevel, alignment, showButton, filteredCells} from "./features/tableBuilder"
type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow;
interface ExtraIRow extends stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow{
  isOpen?:boolean,
  childLength?:number
}
type IRow =
  | ExtraIRow[]
  | null
  | undefined;

export default defineComponent({
  props:{
    table: Array as PropType<IRow>
  },

  setup(props){
    const { collapseTable,watchVal, toggle_isOpen} = expandCollapse(props)
    watchEffect(() => {
        if(!collapseTable.value)
        return
        
        if(collapseTable.value.length === 0){
          collapseTable.value = [...props.table as Array<Row>]
        }
        
      })
      

  return {
    collapseTable,
    watchVal,
    isHeader,
    colspan,
    rowspan,
    groupLevel,
    alignment,
    showButton,
    toggle_isOpen,
    filteredCells,
    buttonId
    
  }

  // end of setup
  }
})
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