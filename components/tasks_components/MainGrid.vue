<template>
  <transition name="view" appear>
    <div v-if="isLoaded && !isError" class="board_con">
      <div v-for="(item, index) in colmunCount" :key="index" class="col_for">
        <Column
          :first-day-date="currentDate"
          :item-num="item - 1"
          :task-as-a-day="taskGroup[index]"
        />
      </div>
    </div>
    <div v-else-if="isError" class="board_con">
      <div class="loading_con">
        <img src="~/assets/loading.svg" />
        <h3>Problem z pobrawniem danych...</h3>
      </div>
    </div>
    <div v-else class="board_con">
      <div class="loading_con">
        <img src="~/assets/loading.svg" />
        <h3>Ładowanie...</h3>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      colmunCount: 7,
      isLoaded: false,
      isError: false,
      tasks: [],
      taskGroup: [],
      retrivealTasks: [],
      entered_name: '',
      permissions: '',
      newUser: {
        name: '',
        email: '',
        password: '',
      },
      pomDate: '',
    }
  },
  mounted() {
    this.$fire.firestore
      .collection('users')
      .doc(this.$fire.auth.currentUser.email)
      .get()
      .then((info) => {
        if (info.data()) this.permissions = info.data().permissions
        this.$store.commit('setPermissions', this.permissions)
        this.permAdmin(this.permissions)
      })

    this.$fire.firestore
      .collection('users')
      .doc(this.$fire.auth.currentUser.email)
      .collection('tasks')
      .orderBy('end_date', 'asc')
      .onSnapshot(
        (snapshot) => {
          const tasks = []
          snapshot.docs.forEach((doc) => {
            const docObject = doc.data()
            docObject.id = doc.id
            tasks.push(docObject)
          })
          this.$store.commit('setTasks', tasks)
          this.tasks = this.$store.getters.getTasks
          // console.log('taski: ', this.tasks)
          this.isLoaded = true
          this.taskGroup = []
          this.segregationTasks()
        },
        (error) => {
          console.log(error)
        }
      )
  },
  methods: {
    segregationTasks() {
      for (let i = 0; i < this.colmunCount; i++) {
        const findTasks = this.tasks.filter((task) => {
          const taskDateSlice = new Date(task.end_date.seconds * 1000)
            .toString()
            .slice(0, 10)
          const dayCount = 86400000 * i // One day * count day after today
          const currentDate = new Date(this.currentDate.getTime() + dayCount)
            .toString()
            .slice(0, 10)
          if (taskDateSlice === currentDate) return true
          return false
        })

        // Push Array of task to data()
        this.taskGroup.push(findTasks)
      }
      this.retrievalDelayedTasks()
    },
    retrievalDelayedTasks() {
      const retrivealTasks = this.tasks.filter((task) => {
        const taskDateSlice = new Date(task.end_date.seconds * 1000)
          .toString()
          .slice(8, 10)
        const currentDate = new Date(this.currentDate.getTime())
          .toString()
          .slice(8, 10)
        console.log('taskDateSlice: ', taskDateSlice)
        console.log('currentDate: ', currentDate)
        if (taskDateSlice < currentDate) return true
        return false
      })
      retrivealTasks.forEach((singleRetriveal) => {
        singleRetriveal.delay = true
        this.taskGroup[0].unshift(singleRetriveal)
      })
    },
    permAdmin(perm) {
      if (perm === 'admin' || perm === 'super_admin') {
        this.$store.dispatch('getTeamMembers')
      }
      if (perm === 'super_admin') {
        this.$store.dispatch('getAdminsAccount')
        this.$store.dispatch('getUsersAccount')
      }
    },
  },
}
</script>
<style scoped>
.board_con {
  display: flex;
  flex: 1;
  width: 100%;
}
.col_for {
  width: 300px;
}
.loading_con {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.loading_con h3 {
  position: relative;
  top: -30px;
}

/* Old code to get data  
this.$fire.firestore
      .collection('users')
      .doc(this.$fire.auth.currentUser.email)
      .collection('tasks')
      .orderBy('end_date', 'asc')
      .get()
      .then((snapshot) => {
        const tasks = []
        snapshot.docs.forEach((doc) => {
          tasks.push(doc.data())
        })
        this.$store.commit('setTasks', tasks)
        this.$store.commit('setPermissions', this.permissions)
        console.log(this.permissions)
        this.tasks = this.$store.getters.getTasks

        this.isLoaded = true
        this.segregationTasks()
        // console.log(this.tasks)
      })
      .catch((err) => {
        this.isError = true
        console.log(err)
      }) */
</style>
