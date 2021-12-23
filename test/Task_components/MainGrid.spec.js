import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

// import staticDate from '~/assets/staticDate.js'
import MainGrid from '@/components/tasks_components/MainGrid.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Column', () => {
  let getters
  let mutations
  let actions
  let store

  beforeEach(() => {
    getters = {
      getPrevUser: () => ({
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
  it('Check tasks exist', async () => {
    // const wrapper = shallowMount(MainGrid, { store, localVue })
    // expect(wrapper.find('.empty_task').exists()).toBe(true)
    // expect(wrapper.find('.task_con').text()).toContain('Brak zadań')
    // await wrapper.setProps({
    //   taskAsADay: [
    //     {
    //       task: {
    //         id: 'id3794yhfdjkbn',
    //         priority: false,
    //         delay: true,
    //         header: 'Test Header',
    //         description: 'Test description',
    //         creator: 'admin@admin.pl',
    //       },
    //     },
    //     {
    //       task: {
    //         id: 'hopjighpojighpjoidf',
    //         priority: true,
    //         delay: true,
    //         header: 'Test Header 2',
    //         description: 'Test description 2',
    //         creator: 'admin2@admin.pl',
    //       },
    //     },
    //   ],
    // })
    // expect(wrapper.find('.empty_task').exists()).toBe(false)
    // expect(wrapper.find('.task_con')).not.toContain('Brak zadań')
  })

  // it('isWeekend', async () => {
  //   const wrapper = shallowMount(Column)

  //   // new Date('December 17, 2021 03:24:00')
  //   const date = staticDate

  //   await wrapper.setProps({
  //     firstDayDate: date,
  //   })

  //   await wrapper.setProps({
  //     itemNum: 1,
  //   })

  //   expect(wrapper.vm.isWeekend).toBe(true)
  //   expect(wrapper.find('.color_week').exists()).toBe(true)
  // })
})
