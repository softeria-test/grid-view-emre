<template>
    <table v-if="table" class="stach-table" v-bind:style="style">
    <tr v-for="(row, rowIndex) in table" :key="rowIndex"
        v-bind:class="{ header : isHeader(row) }">
        <td v-for="(value, colIndex) in row.cells"
          v-if="!isHidden(row, colIndex)"
          v-bind:rowspan="rowspan(row, colIndex)"
          v-bind:colspan="colspan(row, colIndex)"
          v-bind:style="{
              textAlign:'start',
              verticalAlign: 'baseline'
          }">
              <div v-bind:style="{ 'padding-left': groupLevel(row, colIndex) + 'em' }">{{value}}<div>
        </td>
    </tr>
</table>
</template>
<script setup lang="ts">
import {ref} from 'vue'
const isHeader = (row:object):boolean => {
    return row.rowType === "Header";
}
;
const isHidden = (row:object, colIndex:object):boolean => true;
const colspan = (row:object):boolean => true;
const table= ref({})
fetch('http://localhost:3000/data')
.then((response) =>{
    table.value = response.json();
})


</script>