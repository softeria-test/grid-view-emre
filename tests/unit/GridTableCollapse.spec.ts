import { shallowMount, Wrapper } from "@vue/test-utils";
import GridTable from "@/components/GridTable.vue";
import db from "@/data/db.json";
import { ref } from "vue";
import stach from "@/stach-sdk/stach";

describe("GridTable Expand/Collapse functionality", () => {
    interface ExtraIRow
        extends stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow {
        isOpen?: boolean;
        childLength?: number;
    }
    type IRow = ExtraIRow[] | null | undefined;

    const table = ref<IRow>();
    let wrapper: Wrapper<Vue>;

    beforeEach(() => {
        const pkg = stach.factset.protobuf.stach.v2.RowOrganizedPackage.create(
            db.data as unknown as stach.factset.protobuf.stach.v2.RowOrganizedPackage
        );
        table.value = pkg.tables.main.data?.rows;

        //add isOpen and childLength every element of table    
        table.value?.forEach((item: ExtraIRow, index: number) => {
            item["isOpen"] = false
            item["childLength"] = 0
            if (!item.cellDetails?.[0].groupLevel) {
                if (!table.value)
                    return
                for (let i = index + 1; i < table.value.length; i++) {
                    if (table.value[i].cellDetails?.[0].groupLevel) {
                        if (table.value[i].cellDetails?.[0].groupLevel === 1)
                            item["childLength"] += 1
                    }
                    else {
                        break
                    }
                }
            }

        })

        wrapper = shallowMount(GridTable as any, {
            propsData: {
                table: table,
            },
        });
    });
    it("check table has property isOpen", () => {
        expect(wrapper.props().table[0].isOpen).toBe(false);
    });

    it("check table has property childLength", () => {
        expect(wrapper.props().table[0].childLength).toBe(0);
    });
    it("check collapse buttons are created", () => {
        expect(wrapper.findAll("button").length).toEqual(7);
    });

    it("check all tr tags if isOpen is true", async () => {
        await wrapper.find("#button_10").trigger("click");
        expect(wrapper.findAll("tr").length).toEqual(14);
    });
    it("check all tr tags if all isOpen is true", async () => {
        await wrapper.find("#button_10").trigger("click");
        await wrapper.find("#button_5").trigger("click");
        expect(wrapper.findAll("tr").length).toEqual(10);
    });
    it("check button text before click", async () => {
        const button = wrapper.find("#button_10");
        expect(button.text()).toBe("+");
    });
    it("check button text after click", async () => {
        const button = wrapper.find("#button_10");
        await button.trigger("click")
        //after click event, table data changed 
        const nbutton = wrapper.find("#button_10")
        expect(nbutton.text()).toBe("-");
    });

});
