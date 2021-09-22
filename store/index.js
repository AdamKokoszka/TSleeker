const state = () => ({
  user: null,
  tasks: [],
})

const getters = {
  getUser(state) {
    return state.user
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

// import Vuex from 'vuex'

// const createStore = () => {
//   return new Vuex.Store({
//     state: {
//       user: null,
//       tasks: [],
//     },

//     getters: {
//       getUser(state) {
//         return state.user
//       },
//       getTasks(state) {
//         return state.tasks
//       },
//     },

//     mutations: {
//       SET_USER(state, user) {
//         state.user = user
//       },
//       setTasks(state, tasks) {
//         state.tasks = tasks
//       },
//     },

//     actions: {
//       async onAuthStateChangedAction(state, { authUser, claims }) {
//         if (!authUser) {
//           // remove state
//           state.commit('SET_USER', null)

//           //redirect from here
//           this.$router.push({
//             path: '/auth/signin',
//           })
//         } else {
//           const { uid, email } = authUser
//           state.commit('SET_USER', {
//             uid,
//             email,
//           })
//         }
//       },
//     },
//   })
// }

// export default createStore
