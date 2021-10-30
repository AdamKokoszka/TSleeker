<template>
  <div>
    <form class="form_main" @submit.prevent="EditUser">
      <select
        v-model="search_select_user"
        :class="{ active: search_select_user }"
        required
        @change="selectChange()"
      >
        <option
          v-for="(admin, index) in allUsers"
          :key="index"
          :disabled="index == 0"
          :value="index == 0 ? '' : admin"
        >
          {{ admin }}
        </option>
      </select>
      <transition name="fade_in_out">
        <div v-if="search_select_user">
          <input
            v-model="userData.name"
            type="text"
            placeholder="Imie i nazwisko"
          />
          <select
            v-model="select_perm"
            :class="{ active: select_perm }"
            required
          >
            <option value="" disabled>Rodzaj konta</option>
            <option value="user">Pracownik</option>
            <option value="admin">Przełożony</option>
            <option value="super_admin">Administrator</option>
          </select>
          <select
            v-if="select_perm != 'super_admin'"
            v-model="select_user"
            :class="{ active: select_user }"
            required
          >
            <option
              v-for="(admin, index) in allAdmin"
              :key="index"
              :disabled="index == 0"
              :value="index == 0 ? '' : admin"
            >
              {{ admin }}
            </option>
          </select>
          <button type="submit" class="button_green">Zaktualizuj dane!</button>
        </div>
      </transition>
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
import errorTranslator from '~/assets/errorTranslator.js'
export default {
  data() {
    return {
      userData: {
        email: '',
        name: '',
      },
      select_user: '',
      select_perm: '',
      snackbarText: '',
      search_select_user: '',
      allUsers: [],
      correctUserData: false,
      errorTranslator,
    }
  },
  mounted() {
    this.allUsers = this.$store.getters.getUsers
    this.allAdmin = this.$store.getters.getAdmins
  },
  methods: {
    selectChange() {
      this.$fire.firestore
        .collection('users')
        .doc(this.search_select_user)
        .get()
        .then((snapshot) => {
          this.userData.email = this.search_select_user
          this.userData.name = snapshot.data().name
          this.select_perm = snapshot.data().permissions
          this.select_user = snapshot.data().supervisor
        })
        .catch(function (error) {
          const errorText = this.errorTranslator.find(
            (ell) => ell.code === error.code
          )
          if (errorText) {
            this.snackbarText = errorText.text
          } else {
            this.snackbarText = 'Podane dane zawierają błąd! Spróbuj ponownie.'
          }
        })

      setTimeout(() => {
        this.snackbarText = ''
        this.correctUserData = false
      }, 5000)
    },
    EditUser() {
      const updatedUser = {
        name: this.userData.name,
        permissions: this.select_perm,
        supervisor: this.select_user || '',
      }

      this.$fire.firestore
        .collection('users')
        .doc(this.userData.email)
        .update(updatedUser)
        .then(() => {
          this.correctUserData = true
          this.snackbarText = 'Zaktualizowano dane uzytkownika!'
        })
        .catch((error) => {
          const errorText = this.errorTranslator.find(
            (ell) => ell.code === error.code
          )
          if (errorText) {
            this.snackbarText = errorText.text
          } else {
            this.snackbarText = 'Podane dane zawierają błąd! Spróbuj ponownie.'
          }
        })

      setTimeout(() => {
        this.snackbarText = ''
        this.correctUserData = false
      }, 5000)
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
