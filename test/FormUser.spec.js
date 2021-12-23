// import { mount } from '@vue/test-utils'
// import firebase from '@firebase/rules-unit-testing'
// import Task from '@/components/popups/FormUser.vue'
import 'firebase'
import '@firebase/auth'
import '@firebase/firestore'
// import '@nuxtjs/firebase'

// const MY_PROJECT_ID = 'test-nuxt-auth-52d70'
// const myAuth = { uid: '2VjHgUZnkrWFVvIqTlG6TanIZ4k2', email: 'admin@admin.pl' }

// describe('Testing task', () => {
//   test('Test task', async () => {
//     const wrapper = mount(Task, {
//       propsData: {
//         task: {
//           creator: 'admin@g.pl',
//           description: 'description 123',
//           end_date: 'December 14, 2021 at 1:00:00 AM UTC+1',
//           header: 'Naglowek',
//           priority: true,
//         },
//       },
//     })

//     const db = firebase
//       .initializeTestApp({ projectId: MY_PROJECT_ID, auth: myAuth })
//       .firestore()
//     const testDoc = db.collection('readonly').doc('users')
//     await firebase.assertSucceeds(testDoc.get())
//     const addTask = jest.fn()

//     wrapper.setMethods({
//       addTask,
//     })

//     wrapper.find('button').trigger('click')
//     expect(addTask).toHaveBeenCalled()
//     // expect(wrapper.isVueInstance()).toBeTruthy()
//   })
// })

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import FormUser from '@/components/popups/FormUser.vue'

// jest.mock('firestore')
// import Task from '@/components/tasks_components/single_task/Task.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Form User Methods', () => {
  let getters
  let actions
  let store

  beforeEach(() => {
    getters = {
      // getAdmins: () => ['kokos'],
    }
    actions = {
      // getAdminsAccount: jest.fn(),
      // getUsersAccount: jest.fn(),
      // getTeamMembers: jest.fn(),
    }
    store = new Vuex.Store({
      getters,
      actions,
    })
  })

  it('Add User - snackbarText', async () => {
    const wrapper = shallowMount(FormUser, { store, localVue })

    await wrapper.setData({ snackbarText: '' })
    expect(wrapper.find('.error').exists()).toBe(false)

    await wrapper.setData({ snackbarText: 'Dodano uzytkownika!' })
    await wrapper.setData({ correctUserData: true })
    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.find('.correct_user_data').exists()).toBe(true)

    await wrapper.setData({
      snackbarText: 'Podane dane zawierają błąd! Spróbuj ponownie.',
    })
    await wrapper.setData({ correctUserData: false })
    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.find('.correct_user_data').exists()).toBe(false)
  })

  it('ChangeEye', async () => {
    const wrapper = shallowMount(FormUser, { store, localVue })

    await wrapper.setData({ hideEye: true })
    await wrapper.vm.changeEye()
    expect(wrapper.vm.hideEye).toBe(false)
  })

  it('Add User - firebase', async () => {
    const wrapper = shallowMount(FormUser, {
      store,
      localVue,
    })

    const userData = {
      email: 'kokosznikowsdfsdfsdf@g.pl',
      password: 'ZAQ!2wsx',
      name: 'Kokos',
    }

    // await wrapper.setData({ snackbarText: 'not empty' })
    await wrapper.setData({ userData })
    await wrapper.setData({ select_perm: 'admin' })
    await wrapper.setData({ select_user: 'admin@admin.pl' })
    await wrapper.setData({ allAdmin: [] })
    await expect(wrapper.vm.allAdmin).toEqual([])
    await wrapper.vm.addUser()

    expect(wrapper.vm.snackbarText).toEqual('Dodano uzytkownika!')
    // expect(wrapper.vm.snackbarText).toEqual('Dodano uzytkownika!')
    // expect(wrapper.vm.correctUserData).toBe(true)
  })
})
