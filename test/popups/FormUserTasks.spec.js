import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

// import staticDate from '~/assets/staticDate.js'
import FormUserTasks from '@/components/popups/FormUserTasks.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Popup - FormUserTasks', () => {
  let getters
  let mutations
  let actions
  let store

  const members = ['Użytkownik', 'admin@admin.pl', 'adam.kokoszka.it@gmail.com']

  beforeEach(() => {
    getters = {
      getMembers: () => members,
    }
    mutations = {
      setPrevUser: jest.fn(),
    }
    actions = {}
    store = new Vuex.Store({
      getters,
      mutations,
      actions,
    })
  })
  it('selectChange', async () => {
    const wrapper = shallowMount(FormUserTasks, { store, localVue })
    expect(wrapper.vm.allMembers).toBe(members)

    const options = wrapper.find('select').findAll('option')
    await options.at(1).setSelected()
    expect(mutations.setPrevUser).toHaveBeenCalled()
  })
})
