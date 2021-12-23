import { shallowMount } from '@vue/test-utils'

import TaskCheckmark from '@/components/tasks_components/single_task/TaskCheckmark.vue'

describe('Task - Checkmark', () => {
  it('Emit function', async () => {
    const wrapper = shallowMount(TaskCheckmark)

    const mark = wrapper.find('.mark')
    await mark.trigger('click')

    expect(wrapper.emitted().clicked.length).toBe(1)
  })
})
