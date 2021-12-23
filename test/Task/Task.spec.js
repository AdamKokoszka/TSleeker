import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Task from '@/components/tasks_components/single_task/Task.vue'
import TaskCheckmark from '@/components/tasks_components/single_task/TaskCheckmark.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Task component', () => {
  let getters
  let mutations
  let actions
  let store

  beforeEach(() => {
    getters = {
      getUser: () => ({
        email: 'admin@admin.pl',
      }),
    }
    mutations = {
      setCurrentTask: jest.fn(),
    }
    actions = {
      deleteTask: jest.fn(),
    }
    store = new Vuex.Store({
      getters,
      mutations,
      actions,
    })
  })

  it('canEdit', async () => {
    const wrapper = shallowMount(Task, { store, localVue })

    await wrapper.setProps({
      task: {
        creator: 'admin@administrator.pl',
      },
    })
    expect(wrapper.vm.canEdit).toBe(false)

    await wrapper.setProps({
      task: {
        id: 'id3794yhfdjkbn',
        priority: false,
        delay: true,
        header: 'Test Header',
        description: 'Test description',
        creator: 'admin@admin.pl',
      },
    })
    expect(wrapper.vm.canEdit).toBe(true)
  })

  it('CompleteTask', async () => {
    const wrapper = shallowMount(Task, { store, localVue })

    await wrapper.findComponent(TaskCheckmark).vm.$emit('clicked')
    expect(actions.deleteTask).toHaveBeenCalled()
  })

  it('changePopup', async () => {
    const wrapper = shallowMount(Task, { store, localVue })

    await wrapper.setProps({
      task: {
        id: 'id3794yhfdjkbn',
        priority: false,
        delay: true,
        header: 'Test Header',
        description: 'Test description',
        creator: 'admin@admin.pl',
      },
    })

    const taskBox = wrapper.find('.task_box')
    await taskBox.trigger('click')

    expect(mutations.setCurrentTask).toHaveBeenCalledWith(
      {},
      {
        creator: 'admin@admin.pl',
        delay: true,
        description: 'Test description',
        header: 'Test Header',
        id: 'id3794yhfdjkbn',
        priority: false,
      }
    )
  })
})
