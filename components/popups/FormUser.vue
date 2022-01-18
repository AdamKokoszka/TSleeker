<template>
  <div>
    <form class="form_main" @submit.prevent="addUser">
      <input
        v-model="userData.email"
        type="emial"
        placeholder="E-mail"
        required
      />
      <div class="password_con">
        <input
          ref="password"
          v-model="userData.password"
          :type="hideEye ? 'text' : 'password'"
          placeholder="Hasło"
          class="input_password"
          required
        />
        <div
          :class="{ eye_con: true, eye_con_hide: hideEye }"
          @click="changeEye"
        ></div>
      </div>
      <input
        v-model="userData.name"
        type="text"
        placeholder="Imie i nazwisko"
      />
      <select v-model="select_perm" :class="{ active: select_perm }" required>
        <option value="" disabled>Rodzaj konta</option>
        <option value="user">Pracownik</option>
        <option value="admin">Przełożony</option>
        <option value="super_admin">Administrator</option>
      </select>
      <select v-model="select_user" :class="{ active: select_user }" required>
        <option
          v-for="(admin, index) in allAdmin"
          :key="index"
          :disabled="index == 0"
          :value="index == 0 ? '' : admin"
        >
          {{ admin }}
        </option>
      </select>
      <button type="submit" class="button_green">Dodaj użytkownika!</button>
      <transition name="fade_in_out">
        <p
          v-if="snackbarText"
          :class="{ error: true, correct_user_data: correctUserData }"
        >
          {{ snackbarText }}
        </p></transition
      >
    </form>
    <div class="close_con">
      <img src="~assets/close.png" alt="Close" />
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
import errorTranslator from '~/assets/errorTranslator.js'
export default {
  data() {
    return {
      userData: {
        email: '',
        password: '',
        name: '',
      },
      hideEye: false,
      select_user: '',
      select_perm: '',
      snackbarText: '',
      allAdmin: [],
      correctUserData: false,
      disabled: 'disabled',
      errorTranslator,
      testinfo: '',
      secondConfig: process.env.secondConfig,
    }
  },
  created() {
    this.allAdmin = this.$store.getters.getAdmins
  },
  methods: {
    async addUser() {
      this.snackbarText = ''
      const that = this

      const secondaryApp = firebase.initializeApp(
        this.secondConfig,
        'Secondary'
      )

      await secondaryApp
        .auth()
        .createUserWithEmailAndPassword(
          this.userData.email,
          this.userData.password
        )
        .then(function () {
          that.correctUserData = true
          that.snackbarText = 'Dodano uzytkownika!'

          secondaryApp.delete()
          secondaryApp.auth().signOut()
        })
        .then(() => {
          const userData = {
            name: this.userData.name,
            permissions: this.select_perm,
            supervisor: this.select_user,
          }

          const email = this.userData.email
          const data = { userData, email }
          this.$store.commit('setNewUser', data)

          this.$store.dispatch('getAdminsAccount')
          this.$store.dispatch('getUsersAccount')
          this.$store.dispatch('getTeamMembers')
        })
        .then(() => {
          this.allAdmin = this.$store.getters.getAdmins
        })
        .catch(function (error) {
          const errorText = that.errorTranslator.find(
            (ell) => ell.code === error.code
          )
          if (errorText) {
            that.snackbarText = errorText.text
          } else {
            that.snackbarText = error
            // that.snackbarText = 'Podane dane zawierają błąd! Spróbuj ponownie.'
          }
          secondaryApp.delete()
        })

      setTimeout(function () {
        that.snackbarText = ''
        that.correctUserData = false
      }, 5000)
    },
    changeEye() {
      this.hideEye = !this.hideEye
      this.$nextTick(() => {
        const password = this.$refs.password
        password.focus()
      })
    },
  },
}
</script>

<style scoped>
.add_task_con .button_green {
  display: block;
  width: 100%;
}
.close_con {
  position: absolute;
  bottom: -50px;
  right: 0;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  display: block;
  display: none;
  width: fit-content;
  width: -moz-fit-content;
  padding: 9px;
  border-radius: 11px;
  background-color: var(--color-gray-light);
  z-index: 9;
}
.close_con img {
  width: 16px;
}
.password_con {
  position: relative;
}
.eye_con {
  position: absolute;
  top: calc(50% - 11px);
  right: 10px;
  width: 22px;
  height: 22px;
  background: url(~assets/eye_1.png) no-repeat;
  background-size: cover;
  cursor: pointer;
  z-index: 20;
  transition: 0.2s;
  opacity: 0.8;
}
.eye_con_hide {
  background: url(~assets/eye_0.png) no-repeat;
  background-size: cover;
}
</style>
