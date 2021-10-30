<template>
  <div class="nav_bg">
    <div class="nav">
      <div class="nav_item">
        <transition name="fade_in_out">
          <p v-if="$store.getters.getUser">
            Jestes zalogowany jako: {{ userName }}
          </p>
        </transition>
      </div>
      <div class="nav_item">
        <img src="~/assets/logo.png" alt="Slicker Logo" class="logo_slicker" />
        <h2>T-sleeker</h2>
      </div>
      <div class="nav_item">
        <EditUser
          v-if="$store.getters.getPermissions === 'super_admin'"
        ></EditUser>
        <AddUser
          v-if="$store.getters.getPermissions === 'super_admin'"
        ></AddUser>
        <AddTask
          v-if="
            $store.getters.getPermissions === 'admin' ||
            $store.getters.getPermissions === 'super_admin'
          "
        ></AddTask>
        <button
          v-if="$store.getters.getUser"
          class="button_green button_green_small"
          @click="$router.push('/auth/signout')"
        >
          Wyloguj
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // userName: '',
    }
  },
  computed: {
    userName() {
      const curUser = this.$store.getters.getUserName
      if (curUser) return this.$store.getters.getUserName
      return null
    },
  },
  mounted() {
    // const curUser = this.$store.getters.getUser
    // if (curUser) {
    //   this.userName = this.$store.getters.getUser.email
    //   this.$fire.firestore
    //     .collection('users')
    //     .doc(this.$fire.auth.currentUser.email)
    //     .get()
    //     .then((snapshot) => {
    //       if (snapshot.data().name) {
    //         this.userName = snapshot.data().name
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // } else {
    //   this.userName = null
    // }
  },
  methods: {
    // checkUserName() {
    //   if (this.$store.getters.getUser) {
    //     this.$fire.firestore
    //       .collection('users')
    //       .doc(this.$fire.auth.currentUser.email)
    //       .get()
    //       .then((snapshot) => {
    //         console.log('user: ', snapshot.data().name)
    //         if (snapshot.data().name) {
    //           return snapshot.data().name
    //         } else {
    //           const curUser = this.$store.getters.getUser
    //           if (curUser) {
    //             return this.$store.getters.getUser.email
    //           } else {
    //             return null
    //           }
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    //   }
    // },
  },
}
</script>

<style scoped>
.nav_bg {
  background-color: var(--color-gray-light);
  padding: 15px 0;
}
.nav {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.nav_item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav_item:first-of-type {
  justify-content: flex-start;
}
.nav_item:last-of-type {
  justify-content: flex-end;
}
.nav_item h2 {
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
