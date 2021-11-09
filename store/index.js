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
    username: null,
    tasks: [],
    permissions: '',
    members: [],
    adminsAccount: [],
    usersAccount: [],
    currentTask: {},
  }
}

const state = getDefaultState()

const getters = {
  getUser(state) {
    return state.user
  },
  getUserName(state) {
    return state.username
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
  getUsers(state) {
    return state.usersAccount
  },
  getCurrentTask(state) {
    return state.currentTask
  },
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  setUserName(state, username) {
    state.username = username
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
  setUsers(state, users) {
    state.usersAccount = users
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  setCurrentTask(state, currentTask) {
    state.currentTask = currentTask
  },
  resetState(state) {
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

      this.$fire.firestore
        .collection('users')
        .doc(email)
        .get()
        .then((snapshot) => {
          if (
            typeof snapshot.data().name === 'undefined' ||
            snapshot.data().name === ''
          ) {
            const curUser = state.getters.getUser
            if (curUser) {
              state.commit('setUserName', state.getters.getUser.email)
            } else {
              state.commit('setUserName', null)
            }
          } else {
            state.commit('setUserName', snapshot.data().name)
          }
        })
        .catch((err) => {
          console.log(err)
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
  getTeamMembers({ commit }) {
    this.$fire.firestore.collection('users').onSnapshot(
      (snapshot) => {
        const members = ['Użytkownik', this.$fire.auth.currentUser.email]
        snapshot.docs.forEach((doc) => {
          if (doc.data().supervisor === this.$fire.auth.currentUser.email)
            members.push(doc.id)
        })
        commit('setMembers', members)
      },
      (error) => {
        console.log(error)
      }
    )
  },
  getAdminsAccount(state) {
    this.$fire.firestore.collection('users').onSnapshot(
      (snapshot) => {
        const adminsAccount = ['Przełożony nowego użytkownika']
        snapshot.docs.forEach((doc) => {
          if (
            doc.data().permissions === 'admin' ||
            doc.data().permissions === 'super_admin'
          )
            adminsAccount.push(doc.id)
        })
        state.commit('setAdmins', adminsAccount)
      },
      (error) => {
        console.log(error)
      }
    )
  },
  getUsersAccount(state) {
    this.$fire.firestore.collection('users').onSnapshot(
      (snapshot) => {
        const usersAccount = ['Konto użytkownia']
        snapshot.docs.forEach((doc) => {
          usersAccount.push(doc.id)
        })
        state.commit('setUsers', usersAccount)
      },
      (error) => {
        console.log(error)
      }
    )
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
