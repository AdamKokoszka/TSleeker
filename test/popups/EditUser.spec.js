import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

// import staticDate from '~/assets/staticDate.js'
import EditUser from '@/components/popups/EditUser.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Popup - EditUser', () => {
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
  it('showUserButton', () => {
    const wrapper = shallowMount(EditUser, { store, localVue })
    expect(wrapper.vm.showUserButton).toBe(true)

    expect(wrapper.find('.button_nav').exists()).toBe(true)
  })

  it('changePopup', async () => {
    const wrapper = shallowMount(EditUser, { store, localVue })

    expect(wrapper.vm.showPopup).toBe(false)
    await wrapper.setData({ showPopup: true })
    expect(wrapper.vm.showPopup).toBe(true)
  })
})
