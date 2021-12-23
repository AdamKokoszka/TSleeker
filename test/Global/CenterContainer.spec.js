import { shallowMount } from '@vue/test-utils'

import CenterContainer from '@/components/global_layouts/CenterContainer.vue'

describe('CenterContainer', () => {
  it('Add class: previewBox, addTask', async () => {
    const wrapper = shallowMount(CenterContainer)

    await wrapper.setProps({
      previewBox: true,
    })
    expect(wrapper.find('.preview_box').exists()).toBe(true)
    expect(wrapper.find('.add_task').exists()).toBe(false)

    await wrapper.setProps({
      previewBox: true,
      addTask: true,
    })
    expect(wrapper.find('.preview_box').exists()).toBe(true)
    expect(wrapper.find('.add_task').exists()).toBe(true)
  })
})
