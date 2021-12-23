import { shallowMount } from '@vue/test-utils'

import Popup from '@/components/global_layouts/Popup.vue'

describe('CenterContainer', () => {
  it('Add class: previewBox, addTask', async () => {
    const wrapper = shallowMount(Popup)

    expect(wrapper.find('.popup_bg').exists()).toBe(false)

    await wrapper.setProps({
      showPopup: true,
    })
    expect(wrapper.find('.popup_bg').exists()).toBe(true)
  })

  it('changePopup', async () => {
    const wrapper = shallowMount(Popup)

    await wrapper.setProps({
      showPopup: true,
    })

    await wrapper.find('.popup_bg').trigger('click')

    expect(wrapper.emitted().clicked.length).toBe(1)
  })
})
