import { alignment, groupLevel, isHeader,buttonId,showButton } from "@/components/features/tableBuilder";
import stach from "@/stach-sdk/stach";
import db from "@/data/db.json"
import { ref } from "vue";

describe('features test', () => {
    interface ExtraIRow extends stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow{
        isOpen?:boolean,
        childLength?:number
      }
      type IRow =
        | ExtraIRow[]
        | null
        | undefined;
    
      const table = ref<IRow>();
    
      beforeEach(() => {
        const pkg =
          stach.factset.protobuf.stach.v2.RowOrganizedPackage.create(db.data as unknown as stach.factset.protobuf.stach.v2.RowOrganizedPackage);
        table.value = pkg.tables.main.data?.rows;
        if(table.value === undefined || table.value === null){
            table.value=[];
            console.log("table is empty")
          }
        if(!table.value) return
       
      });
      it('show +/- button conditions are met.', () => {
        if(!table.value) return
        expect(showButton(table.value[0],0,3)).toEqual(true)
      })

      it('show +/- button if ', () => {
        if(!table.value) return
        expect(showButton(table.value[0],1,3)).toEqual(false)
      })
      it('buttonId function returns id', () => {

        expect(buttonId(5)).toEqual('button_5')
      })
      it('alignment function', () => {
        if(!table.value) return
        expect(alignment(table.value[4], '0', 'horizontal')).toEqual('left')
      })
    
      it('alignment equal to baseline at 0', () => {
        if(!table.value) return
        expect(alignment(table.value[0], '0', 'vertical')).toEqual('baseline')
      })
      
      it('isHeader', () => {
        if(!table.value) return
        expect(isHeader(table.value[0])).toBeTruthy()
      })
    
      it('groupLevel function', () => {
        if(!table.value) return
        expect(groupLevel(table.value[0], 1)).toEqual(0)
      })


})
  