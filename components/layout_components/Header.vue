<template>
  <div class="nav_bg">
    <div class="nav con_main">
      <img src="~/assets/logo.png" alt="Slicker Logo" class="logo_slicker" />
      <h2>T-sleeker</h2>
      <button
        v-if="$store.getters.getUser"
        class="button_green button_green_small"
        @click="$router.push('/auth/signout')"
      >
        Wyloguj
      </button>
      <AddTask></AddTask>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showLogoutButton: false,
      showPopup: false,
      taskData: {
        header: '',
        description: '',
        end_date: '',
        id: 0,
      },
    }
  },
  methods: {
    addTask() {
      console.log('add', this.taskData)
      // const tesing_data = {
      //   name: 'kokoszniakow',
      //   description: 'lalallala',
      // }
      // const tesing_tasks = {
      //   header: 'header 1',
      //   description: 'kdasfhg sjkhgdfsf',
      // }
      // this.$fire.firestore
      //   .collection('users')
      //   .doc(this.entered_name)
      //   .set(tesing_data)
      const getDate = new Date(this.taskData.end_date)
      this.taskData.end_date = getDate
      // console.log(getDate)
      // console.log(this.taskData.end_date, typeof this.taskData.end_date)
      const tasksHandler = this.$fire.firestore
        .collection('users')
        .doc(this.$fire.auth.currentUser.email)
        .collection('tasks')
        .doc()
      tasksHandler.set(this.taskData)
    },
  },
}
</script>

<style scoped>
.nav_bg {
  background-color: var(--color-gray-light);
  padding: 15px 0;
}
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav h2 {
  font-size: 40px;
  color: var(--color-grey-dark);
}
.logo_slicker {
  width: 50px;
  opacity: 0;
  animation: 1s ease-in-out 0.5s 1 slideInFromLeft forwards;
}
.add_task_con {
  position: absolute;
  z-index: 100;
  top: 140px;
}
.add_task_con .button_green {
  display: block;
  width: 100%;
}
@keyframes slideInFromLeft {
  0% {
    transform: rotate(0deg) scale(0%);
    opacity: 0;
  }
  100% {
    transform: rotate(90deg) scale(100%);
    opacity: 1;
  }
}
</style>
