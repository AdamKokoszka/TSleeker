import { shallowMount } from '@vue/test-utils'

import TaskDescription from '@/components/tasks_components/single_task/TaskDescription.vue'

describe('Task - Description', () => {
  it('Show description', async () => {
    const wrapper = shallowMount(TaskDescription)

    await wrapper.setProps({ description: 'Test description' })

    expect(wrapper.find('.description_task').exists()).toBe(true)
    expect(wrapper.find('.description_task').text()).toContain(
      'Test description'
    )
  })
})
