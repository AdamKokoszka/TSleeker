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
          v-for="(admin, index) in allMembers"
          :key="index"
          :disabled="index == 0"
          :value="index == 0 ? '' : admin"
        >
          {{ admin }}
        </option>
      </select>
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
      snackbarText: '',
      search_select_user: '',
      allMembers: [],
      errorTranslator,
      showPopup: false,
    }
  },
  created() {
    this.allMembers = this.$store.getters.getMembers
  },
  methods: {
    selectChange() {
      this.$store.commit('setPrevUser', this.search_select_user)
      this.$emit('clicked')
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
.button_nav {
  margin-bottom: 11px;
  margin-left: 2px;
  padding-right: 2px;
  padding-left: 0;
  padding-bottom: 2px;
  color: var(--color-red-light);
}
.button_nav:hover,
.button_nav:focus {
  border-bottom: 2px solid var(--color-red-light);
}
.con_delete_button {
  display: flex;
  justify-content: center;
  grid-gap: 20px;
  margin-top: 10px;
}
.con_delete_button .button_green {
  width: fit-content;
  width: -moz-fit-content;
}
.con_delete_button .button_red {
  background-color: var(--color-red-light);
  border-color: var(--color-red-light);
}
.con_delete_button .button_red:hover,
.con_delete_button .button_red:focus {
  background-color: #fff;
  color: var(--color-red-light);
}

.radio_con {
  margin-top: 15px;
  margin-bottom: 15px;
}
.radio_con input {
  display: inline-block;
  width: 13px;
  margin-right: 10px;
  margin-bottom: 0;
  padding: 0;
  transform: scale(1.3);
}
.radio_con label {
  display: block;
  margin-bottom: 5px;
  color: #757575;
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
