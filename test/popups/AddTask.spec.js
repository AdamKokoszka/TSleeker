import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

// import staticDate from '~/assets/staticDate.js'
import AddTask from '@/components/popups/AddTask.vue'
import Popup from '@/components/global_layouts/Popup.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Popup - AddTask', () => {
  let getters
  let mutations
  let actions
  let store

  beforeEach(() => {
    getters = {
      getPermissions: () => 'admin',
    }
    mutations = {}
    actions = {}
    store = new Vuex.Store({
      getters,
      mutations,
      actions,
    })
  })
  it('showPopup', async () => {
    const wrapper = shallowMount(AddTask, { store, localVue })

    expect(wrapper.vm.showPopup).toBe(false)

    await wrapper.findComponent(Popup).vm.$emit('clicked')
    expect(wrapper.vm.showPopup).toBe(true)
  })
  it('showTaskButton', () => {
    const wrapper = shallowMount(AddTask, { store, localVue })

    expect(wrapper.vm.showTaskButton).toBe(true)
  })
  it('changePopup', async () => {
    const wrapper = shallowMount(AddTask, { store, localVue })

    expect(wrapper.vm.showPopup).toBe(false)
    await wrapper.setData({ showPopup: true })
    expect(wrapper.vm.showPopup).toBe(true)
  })
})
