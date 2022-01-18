import { shallowMount } from '@vue/test-utils'

import staticDate from '~/assets/staticDate.js'
import ColumnDate from '@/components/tasks_components/ColumnDate.vue'

describe('Date', () => {
  it('currentDate & numDayText', async () => {
    const wrapper = shallowMount(ColumnDate)

    // new Date('December 18, 2021 03:24:00')
    const date = staticDate

    await wrapper.setProps({
      firstDayDate: date,
    })

    await wrapper.setProps({
      itemNum: 1,
    })

    expect(wrapper.vm.currentDate.getDate()).toBe(19)

    await wrapper.setProps({
      itemNum: 3,
    })

    expect(wrapper.vm.currentDate.getDate()).toBe(21)
    expect(wrapper.vm.numDayText).toBe(21)
  })

  it('dayOfWeekText & monthOfWeekText', () => {
    const wrapper = shallowMount(ColumnDate, {
      computed: {
        currentDate() {
          // new Date('December 18, 2021 03:24:00')
          return staticDate
        },
      },
    })

    expect(wrapper.vm.dayOfWeekText).toBe('Sobota')
    expect(wrapper.vm.monthOfWeekText).toBe('Grudzień')
  })
})
