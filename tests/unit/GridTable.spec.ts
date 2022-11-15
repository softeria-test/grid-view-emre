import { shallowMount } from '@vue/test-utils'
import GridTable from '@/components/GridTable.vue'


describe('GridTable.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = shallowMount(GridTable, {
        });
    });

  it('renders Grid Table', () => {
    expect(wrapper.text()).toContain("GridTable")
  })

  it('isHeader exist', () => {
    expect(wrapper.find('.isHeader').exists()).toBe(false)
  })

  it('colspan exist', () => {
    expect(wrapper.find('.colspan').exists()).toBe(false)
  })
  
})