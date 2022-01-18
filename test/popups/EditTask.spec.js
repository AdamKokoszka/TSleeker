import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

// import staticDate from '~/assets/staticDate.js'
import EditTask from '@/components/popups/EditTask.vue'
import TaskEdit from '@/components/tasks_components/single_task/TaskEdit.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Popup - EditTask', () => {
  let getters
  let mutations
  let actions
  let store

  beforeEach(() => {
    getters = {}
    mutations = {
      setCurrentEditTask: jest.fn(),
    }
    actions = {}
    store = new Vuex.Store({
      getters,
      mutations,
      actions,
    })
  })
  it('Props: canEdit & task', async () => {
    const wrapper = shallowMount(EditTask, { store, localVue })
    expect(wrapper.vm.canEdit).toBe(false)

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
    await wrapper.setProps({ canEdit: true, task })
    expect(wrapper.vm.canEdit).toBe(true)
    expect(wrapper.vm.task).toBe(task)
  })
  it('EditTask', async () => {
    const wrapper = shallowMount(EditTask, { store, localVue })

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
    await wrapper.setProps({ canEdit: true, task })
    await wrapper.findComponent(TaskEdit).vm.$emit('clicked')
    expect(mutations.setCurrentEditTask).toHaveBeenCalled()
  })
})
