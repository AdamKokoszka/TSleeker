import 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import FormUser from '@/components/popups/FormUser.vue'

// jest.mock('firestore')
// import Task from '@/components/tasks_components/single_task/Task.vue'

require('dotenv').config()
const localVue = createLocalVue()

localVue.use(Vuex)

describe('Form User Methods', () => {
  let getters
  let actions
  let store

  const OLD_ENV = process.env

  beforeEach(() => {
    getters = {}
    actions = {}
    store = new Vuex.Store({
      getters,
      actions,
    })
    process.env = { ...OLD_ENV } // Make a copy
  })

  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
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
      email: 'jest@test.com',
      password: 'ZAQ!2wsx',
      name: 'Testowanie aplikacji',
    }
    const secondConfig = {
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      databaseURL: process.env.DATABASEURL,
    }
    await wrapper.setData({ secondConfig })

    await wrapper.setData({ userData })
    await wrapper.setData({ select_perm: 'admin' })
    await wrapper.setData({ select_user: 'admin@admin.pl' })
    await wrapper.setData({ allAdmin: [] })
    await expect(wrapper.vm.allAdmin).toEqual([])
    await wrapper.vm.addUser()

    expect(wrapper.vm.snackbarText).toEqual(
      'Użytkownik o podanym emailu już istnieje.'
    )
  })
})
