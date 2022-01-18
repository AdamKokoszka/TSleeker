import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

// import staticDate from '~/assets/staticDate.js'
import MainPopups from '@/components/tasks_components/MainPopups.vue'
import Popup from '@/components/global_layouts/Popup.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('MainPopups', () => {
  let getters
  let mutations
  let actions
  let store

  beforeEach(() => {
    getters = {
      getCurrentTask: () => ({
        task: {
          id: 'id3794yhfdjkbn',
          priority: false,
          delay: true,
          header: 'Test Header',
          description: 'Test description',
          creator: 'admin@admin.pl',
        },
      }),
      getCurrentEditTask: () => ({
        task: {
          id: 'id3794yhfdjkbn',
          priority: false,
          delay: true,
          header: 'Test Header',
          description: 'Test description',
          creator: 'admin@admin.pl',
        },
      }),
    }
    mutations = {
      setCurrentTask: jest.fn(),
      setCurrentEditTask: jest.fn(),
    }
    actions = {}
    store = new Vuex.Store({
      getters,
      mutations,
      actions,
    })
  })
  const task = {
    task: {
      id: 'id3794yhfdjkbn',
      priority: false,
      delay: true,
      header: 'Test Header',
      description: 'Test description',
      creator: 'admin@admin.pl',
    },
  }
  it('changePopupGetterTask', async () => {
    const wrapper = shallowMount(MainPopups, { store, localVue })

    await wrapper.findComponent(Popup).vm.$emit('clicked')
    expect(mutations.setCurrentTask).toHaveBeenCalled()
  })

  it('getterTask & getterEditTask', () => {
    const wrapper = shallowMount(MainPopups, { store, localVue })

    expect(wrapper.vm.getterTask).toStrictEqual(task)
    expect(wrapper.vm.getterEditTask).toStrictEqual(task)
  })

  it('showPopupTask & showPopupEditTask', () => {
    const wrapper = shallowMount(MainPopups, { store, localVue })

    expect(wrapper.vm.showPopupTask).toBe(true)
    expect(wrapper.vm.showPopupEditTask).toBe(true)
  })
})
