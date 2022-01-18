import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

// import staticDate from '~/assets/staticDate.js'
import AddUser from '@/components/popups/AddUser.vue'
import Popup from '@/components/global_layouts/Popup.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Popup - Add User', () => {
  let getters
  let mutations
  let actions
  let store

  beforeEach(() => {
    getters = {
      getPermissions: () => 'super_admin',
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
    const wrapper = shallowMount(AddUser, { store, localVue })

    expect(wrapper.vm.showPopup).toBe(false)

    await wrapper.findComponent(Popup).vm.$emit('clicked')
    expect(wrapper.vm.showPopup).toBe(true)
  })
  it('showUserButton', () => {
    const wrapper = shallowMount(AddUser, { store, localVue })

    expect(wrapper.vm.showUserButton).toBe(true)
  })
  it('changePopup', async () => {
    const wrapper = shallowMount(AddUser, { store, localVue })

    expect(wrapper.vm.showPopup).toBe(false)
    await wrapper.setData({ showPopup: true })
    expect(wrapper.vm.showPopup).toBe(true)
  })
})
