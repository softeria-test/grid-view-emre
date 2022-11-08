import { shallowMount, Wrapper } from '@vue/test-utils'
import GridTable from '@/components/GridTable.vue'
import db from "@/data/db.json"
import { ref } from 'vue'
import stach from '@/stach-sdk/stach'



describe('GridTable.vue', () => {
  type IRow =
    | stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow[]
    | null
    | undefined;
  const table = ref<IRow>();
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    const pkg =
      stach.factset.protobuf.stach.v2.RowOrganizedPackage.create(db.data as unknown as stach.factset.protobuf.stach.v2.RowOrganizedPackage);
    table.value = pkg.tables.main.data?.rows;

    wrapper = shallowMount(GridTable, {
      propsData: { table }
    });
  });

  it('renders Grid Table', () => {
    expect(wrapper.text()).toContain("GridTable")
  })
  it('check all tr tags', () => {
    expect(wrapper.findAll('tr').length).toEqual(18)
  })
  it('check all td tags', () => {
    expect(wrapper.findAll('td').length).toEqual(133)
  })
  it('check class header ', () => {
    expect(wrapper.find('.header').exists()).toBe(true)
  })
  it('check table exist ', () => {
    expect(wrapper.find('table').exists()).toBe(true)
  })
  it('check td has rowspan attribute 3 ', () => {
    expect(wrapper.find('td').attributes('rowspan')).toBe("3")
  })
  it('check table exist ', () => {
    expect(wrapper.find('table').exists()).toBe(true)
  })
  it('check td is td ', () => {
    expect(wrapper.findAll('td').at(2).exists()).toBe(true)
  })




})