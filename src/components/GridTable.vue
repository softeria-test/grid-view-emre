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
import { defineComponent, PropType, ref, watchEffect } from "vue";
import stach from "../stach-sdk/stach";
type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow;
interface ExtraIRow extends stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow{
  isOpen?:boolean,
  childLength?:number
}
type IRow =
  | ExtraIRow[]
  | null
  | undefined;

type RowType = stach.factset.protobuf.stach.v2.RowOrganizedPackage.Row.RowType;
export default defineComponent({
  props:{
    table: Array as PropType<IRow>
  },

  setup(props,context){
    console.log("context",context);
    console.log("props.table", props.table)
    let collapseTable= ref<IRow>([])
    const watchVal = ref(false);

    watchEffect(() => {
      if(!collapseTable.value)
      return
      
      if(collapseTable.value.length === 0){
        collapseTable.value = [...props.table as Array<Row>]
        console.log("collapseTable",collapseTable.value)
      }
      
    })
    
  const buttonId = (rowIndex:number)=>{
    return "button_"+rowIndex
  }   
  const isHeader = (row?: Row)=>{
    return row?.rowType === ("Header" as unknown as RowType);
  }

  // colspan returns the colspan for the cell at the given row and column index
  const colspan = (row: Row, colIndex: string) =>{
   return row.headerCellDetails?.[colIndex].colspan ?? 1;
  }

  // rowspan returns the rowspan for the cell at the given row and column index
  const rowspan = (row: Row, colIndex: string) =>{
    return row.headerCellDetails?.[colIndex].rowspan ?? 1;
  }

  // groupLevel returns the group level for the cell at the given row and column index
  const groupLevel = (row: Row, colIndex: number)=> {
    return colIndex === 0 ? row.cellDetails?.[0].groupLevel ?? 0 : 0;
  }

  const alignment = (row?: Row, colIndex?: string, type?: string) =>{
    return type === "vertical" ? ("baseline" as const) : ("left" as const);
  }

  const showButton = (row: Row, colIndex: number, rowIndex: number) =>{
    return groupLevel(row,colIndex) === 0 && colIndex === 0 && [0,1,2].includes(rowIndex) === false

  }
  
  const toggle_isOpen = (row:ExtraIRow,rowIndex:number)=>{
    row.isOpen = !row.isOpen
    watchVal.value = !watchVal.value

    if(!row.childLength)
    return

    if(!collapseTable.value)
    return
    if(row.isOpen && row.childLength>0){
      

      collapseTable.value.splice(rowIndex+1,row.childLength)

    }
    else{
      collapseTable.value = [...props.table as Array<Row>] 
    }
    console.log(collapseTable)
    return row.isOpen
  }
  const filteredCells = (cells?: Array<IRow>)=> {
    return cells;
  }
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