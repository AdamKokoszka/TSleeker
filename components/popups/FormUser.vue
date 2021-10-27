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
      <select v-model="select_user" required>
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
    </form>
    <div class="close_con">
      <img src="~assets/close.png" alt="Close" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {
        email: '',
        password: '',
      },
      hideEye: false,
      select_user: '',
      allAdmin: [],
      disabled: 'disabled',
    }
  },
  mounted() {
    this.allAdmin = this.$store.getters.getAdmins
  },
  methods: {
    addUser() {
      //   const getDate = new Date(this.userData.end_date)
      //   this.userData.end_date = getDate
      //   const isPermisionUser = this.allMembers.filter(
      //     (member) => member.email === this.select_user
      //   )
      //   if (isPermisionUser.length > 0) {
      //     const tasksHandler = this.$fire.firestore
      //       .collection('users')
      //       .doc(this.select_user)
      //       .collection('tasks')
      //       .doc()
      //     tasksHandler.set(this.userData)
      //     this.$emit('clicked')
      //   }
    },
    changeEye() {
      //   console.log(this.allAdmin[0].email)
      this.hideEye = !this.hideEye
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
