import { shallowMount } from '@vue/test-utils'

import TaskColorBar from '@/components/tasks_components/single_task/TaskColorBar.vue'

describe('Task - ColorBar', () => {
  it('Add class: priority, delay', async () => {
    const wrapper = shallowMount(TaskColorBar)

    await wrapper.setProps({
      priority: true,
    })
    expect(wrapper.find('.color_priority').exists()).toBe(true)
    expect(wrapper.find('.color_delay').exists()).toBe(false)

    await wrapper.setProps({
      priority: true,
      delay: true,
    })
    expect(wrapper.find('.color_priority').exists()).toBe(true)
    expect(wrapper.find('.color_delay').exists()).toBe(true)
  })
})
