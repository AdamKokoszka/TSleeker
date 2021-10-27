// const state = () => ({
//   user: null,
//   tasks: [],
//   permissions: '',
//   members: [],
//   adminsAccount: [],
// })

const getDefaultState = () => {
  return {
    user: null,
    tasks: [],
    permissions: '',
    members: [],
    adminsAccount: [],
  }
}

const state = getDefaultState()

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
  getMembers(state) {
    return state.members
  },
  getAdmins(state) {
    return state.adminsAccount
  },
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  setTasks(state, tasks) {
    state.tasks = tasks
  },
  setMembers(state, members) {
    state.members = members
  },
  setAdmins(state, admins) {
    state.adminsAccount = admins
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  resetState(state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState())
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
  deleteTask(commit, taskId) {
    this.$fire.firestore
      .collection('users')
      .doc(this.$fire.auth.currentUser.email)
      .collection('tasks')
      .get()
      .then((snapshot) => {
        const singleTask = snapshot.docs.find((doc) => doc.id === taskId)
        return singleTask
      })
      .then((serachUser) => {
        this.$fire.firestore
          .collection('users')
          .doc(this.$fire.auth.currentUser.email)
          .collection('tasks')
          .doc(serachUser.id)
          .delete()
          .then()
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getTeamMembers({ commit, getters }, taskId) {
    this.$fire.firestore
      .collection('users')
      .doc(this.$fire.auth.currentUser.email)
      .collection('team_members')
      .get()
      .then((snapshot) => {
        const members = [
          { email: 'Użytkownik' },
          { email: this.$fire.auth.currentUser.email },
        ]
        snapshot.docs.forEach((doc) => {
          members.push(doc.data())
        })
        commit('setMembers', members)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAdminsAccount(state, taskId) {
    this.$fire.firestore
      .collection('users')
      .get()
      .then((snapshot) => {
        const adminsAccount = ['Przełożony']
        snapshot.docs.forEach((doc) => {
          if (
            doc.data().permissions === 'admin' ||
            doc.data().permissions === 'super_admin'
          )
            adminsAccount.push(doc.id)
        })
        state.commit('setAdmins', adminsAccount)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
