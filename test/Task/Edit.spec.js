import { shallowMount } from '@vue/test-utils'

import TaskEdit from '@/components/tasks_components/single_task/TaskEdit.vue'

describe('Task - Checkmark', () => {
  it('CompleteTask', async () => {
    const wrapper = shallowMount(TaskEdit)

    const mark = wrapper.find('.mark')
    await mark.trigger('click')

    expect(wrapper.emitted().clicked.length).toBe(1)
  })
})
