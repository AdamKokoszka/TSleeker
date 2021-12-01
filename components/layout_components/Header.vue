<template>
  <div class="nav_bg">
    <div class="nav">
      <div class="nav_item">
        <transition name="fade_in_out">
          <p v-if="$store.getters.getUser" class="user_info">
            Jestes zalogowany jako: {{ userName }}
          </p>
        </transition>
        <transition name="fade_in_out">
          <p
            v-if="
              $store.getters.getPrevUser &&
              $store.getters.getPrevUser !== $fire.auth.currentUser.email
            "
            class="user_info"
          >
            Podgląd zadań użytkownika: {{ $store.getters.getPrevUser }}
          </p>
        </transition>
      </div>
      <div class="nav_item">
        <img src="~/assets/logo.png" alt="Slicker Logo" class="logo_slicker" />
        <h2>T-sleeker</h2>
      </div>
      <div class="nav_item">
        <div class="desktop_nav">
          <EditUser
            v-if="$store.getters.getPermissions === 'super_admin'"
          ></EditUser>
          <AddUser
            v-if="$store.getters.getPermissions === 'super_admin'"
          ></AddUser>
          <UserTasks
            v-if="
              $store.getters.getPermissions === 'super_admin' ||
              $store.getters.getPermissions === 'admin'
            "
          ></UserTasks>
          <AddTask
            v-if="
              $store.getters.getPermissions === 'super_admin' ||
              $store.getters.getPermissions === 'admin' ||
              $store.getters.getPermissions === 'user'
            "
          ></AddTask>
          <button
            v-if="$store.getters.getUser"
            class="button_nav"
            @click="changePopupAndLogout"
          >
            Wyloguj
          </button>
        </div>
        <Popup
          v-if="
            $store.getters.getPermissions === 'super_admin' ||
            $store.getters.getPermissions === 'admin' ||
            $store.getters.getPermissions === 'user'
          "
          :show-popup="showPopup"
          @clicked="changePopup"
        >
          <CenterContainer>
            <div class="mobile_nav">
              <EditUser
                v-if="$store.getters.getPermissions === 'super_admin'"
              ></EditUser>
              <AddUser
                v-if="$store.getters.getPermissions === 'super_admin'"
              ></AddUser>
              <UserTasks
                v-if="
                  $store.getters.getPermissions === 'super_admin' ||
                  $store.getters.getPermissions === 'admin'
                "
              ></UserTasks>
              <AddTask
                v-if="
                  $store.getters.getPermissions === 'super_admin' ||
                  $store.getters.getPermissions === 'admin' ||
                  $store.getters.getPermissions === 'user'
                "
              ></AddTask>
              <button
                v-if="$store.getters.getUser"
                class="button_nav"
                @click="changePopupAndLogout"
              >
                Wyloguj
              </button>
            </div>
          </CenterContainer>
        </Popup>
        <div
          v-if="
            $store.getters.getPermissions === 'super_admin' ||
            $store.getters.getPermissions === 'admin' ||
            $store.getters.getPermissions === 'user'
          "
          class="mobile_menu"
          @click="changePopup"
        >
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // userName: '',
      showPopup: false,
    }
  },
  computed: {
    userName() {
      const curUser = this.$store.getters.getUserName
      // console.log('curUser:', curUser)
      if (curUser) return this.$store.getters.getUserName
      return null
    },
  },
  methods: {
    changePopup() {
      this.showPopup = !this.showPopup
    },
    changePopupAndLogout() {
      this.showPopup = false
      this.$router.push('/auth/signout')
    },
  },
}
</script>

<style scoped>
.nav_bg {
  background-color: var(--color-gray-light);
  padding: 15px 0;
  overflow: hidden;
}
.nav {
  display: grid;
  grid-template-columns: 1fr 223px 1fr;
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
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
}
.nav_item .user_info {
  text-align: center;
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
.desktop_nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
/* .mobile_nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.63);
  display: none;
  z-index: 100000;
} */
.mobile_menu {
  display: none;
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
@media screen and (max-width: 1023px) {
  .nav_bg {
    padding: 8px 0;
  }
  .desktop_nav {
    display: none;
  }
  .mobile_nav {
    display: block;
  }
  .mobile_menu {
    display: block;
  }
  .mobile_menu {
    display: block;
  }
  .nav {
    grid-template-columns: 1fr;
    grid-gap: 5px;
  }
  .nav_item:first-of-type {
    align-items: center;
  }
  .nav_item .user_info {
    margin-bottom: 10px;
  }
  .nav_item .user_info:last-of-type {
    margin-bottom: 0;
  }
  .nav_item:nth-of-type(2) {
    grid-row: 1;
  }
  .nav_item h2 {
    font-size: 30px;
  }
  .logo_slicker {
    width: 32px;
  }
}
</style>
