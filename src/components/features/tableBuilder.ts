import stach from "../../stach-sdk/stach";
type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow;
interface ExtraIRow extends stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow{
  isOpen?:boolean,
  childLength?:number
}
type RowType = stach.factset.protobuf.stach.v2.RowOrganizedPackage.Row.RowType;
type IRow =
  | ExtraIRow[]
  | null
  | undefined;

 export const buttonId = (rowIndex:number)=>{
    return "button_"+rowIndex
  }   
 export const isHeader = (row?: Row)=>{
    return row?.rowType === ("Header" as unknown as RowType);
  }

  // colspan returns the colspan for the cell at the given row and column index
 export const colspan = (row: Row, colIndex: string) =>{
   return row.headerCellDetails?.[colIndex].colspan ?? 1;
  }

  // rowspan returns the rowspan for the cell at the given row and column index
 export const rowspan = (row: Row, colIndex: string) =>{
    return row.headerCellDetails?.[colIndex].rowspan ?? 1;
  }

  // groupLevel returns the group level for the cell at the given row and column index
 export const groupLevel = (row: Row, colIndex: number)=> {
    return colIndex === 0 ? row.cellDetails?.[0].groupLevel ?? 0 : 0;
  }

 export const alignment = (row?: Row, colIndex?: string, type?: string) =>{
    return type === "vertical" ? ("baseline" as const) : ("left" as const);
  }

 export const showButton = (row: Row, colIndex: number, rowIndex: number) =>{
    return groupLevel(row,colIndex) === 0 && colIndex === 0 && [0,1,2].includes(rowIndex) === false

  }

 export const filteredCells = (cells?: Array<IRow>)=> {
    return cells;
  }