import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

// import staticDate from '~/assets/staticDate.js'
import UserTasks from '@/components/popups/UserTasks.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Popup - UserTasks', () => {
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
  it('showUserButton', () => {
    const wrapper = shallowMount(UserTasks, { store, localVue })

    expect(wrapper.vm.showUserButton).toBe(true)
  })
  it('changePopup', async () => {
    const wrapper = shallowMount(UserTasks, { store, localVue })

    expect(wrapper.vm.showPopup).toBe(false)
    await wrapper.setData({ showPopup: true })
    expect(wrapper.vm.showPopup).toBe(true)
  })
})
