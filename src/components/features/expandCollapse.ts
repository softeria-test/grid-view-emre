import { ref } from "vue";
import stach from "../../stach-sdk/stach";
type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow;
interface ExtraIRow extends stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow{
  isOpen?:boolean,
  childLength?:number
}

type IRow =
  | ExtraIRow[]
  | null
  | undefined;


export default function expandCollapse(props:any) {
    const collapseTable= ref<IRow>([])
    const watchVal = ref(false);
   // Toggle the isOpen property of the row and change the collapseTable
    const toggle_isOpen =  (row:ExtraIRow,rowIndex:number)=>{
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
        return row.isOpen
      }
      

      return {collapseTable, watchVal, toggle_isOpen}
}