const state = () => ({
  user: null,
  tasks: [],
  permissions: '',
  members: [],
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
  getMembers(state) {
    return state.members
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
  getTeamMembers(state, taskId) {
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
        state.commit('setMembers', members)
        const singleTask = snapshot.docs.find((doc) => doc.id === taskId)
        return singleTask
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
