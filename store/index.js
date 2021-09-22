const state = () => ({
  user: null,
  tasks: [],
  permissions: '',
})

const getters = {
  getUser(state) {
    return state.user
  },
  getPermissions(state) {
    return state.permissions
  },
  getTasks(state) {
    return state.tasks
  },
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  setTasks(state, tasks) {
    state.tasks = tasks
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
}

const actions = {
  // eslint-disable-next-line require-await
  async onAuthStateChangedAction(state, { authUser, claims }) {
    if (!authUser) {
      // remove state
      state.commit('SET_USER', null)

      // redirect from here
      this.$router.push({
        path: '/auth/signin',
      })
    } else {
      const { uid, email } = authUser
      state.commit('SET_USER', {
        uid,
        email,
      })
    }
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
