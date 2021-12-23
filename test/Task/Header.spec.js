import { shallowMount } from '@vue/test-utils'

import TaskHeader from '@/components/tasks_components/single_task/TaskHeader.vue'

describe('Task - Header', () => {
  it('Show header', async () => {
    const wrapper = shallowMount(TaskHeader)

    await wrapper.setProps({ header: 'Test header' })

    expect(wrapper.find('h5').exists()).toBe(true)
    expect(wrapper.find('h5').text()).toContain('Test header')
  })
})
