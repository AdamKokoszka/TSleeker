import { shallowMount } from '@vue/test-utils'

import TaskInfo from '@/components/tasks_components/single_task/TaskInfoBar.vue'

describe('Task - ColorBar', () => {
  it('Add class: priority, delay', async () => {
    const wrapper = shallowMount(TaskInfo)

    await wrapper.setProps({
      priority: true,
    })
    expect(wrapper.find('.color_priority').exists()).toBe(true)
    expect(wrapper.find('.color_delay').exists()).toBe(false)

    await wrapper.setProps({
      priority: false,
      delay: true,
    })
    expect(wrapper.find('.color_priority').exists()).toBe(false)
    expect(wrapper.find('.color_delay').exists()).toBe(true)
  })
})
