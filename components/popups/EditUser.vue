<template>
  <div>
    <button v-if="showUserButton" class="button_nav" @click="changePopup">
      Zarządzaj Użytkownikami
    </button>
    <Popup :show-popup="showPopup" @clicked="changePopup">
      <div class="add_task_con">
        <CenterContainer>
          <h2 class="green_header">Wybierz Użytkownika</h2>
          <FormEditUser @clicked="changePopup"></FormEditUser>
        </CenterContainer>
      </div>
    </Popup>
  </div>
</template>
<script>
import Popup from '../global_layouts/Popup.vue'
import CenterContainer from '../global_layouts/CenterContainer.vue'
import FormEditUser from '../popups/FormEditUser.vue'
export default {
  components: {
    Popup,
    CenterContainer,
    FormEditUser,
  },
  data() {
    return {
      showPopup: false,
    }
  },
  computed: {
    showUserButton() {
      if (this.$store.getters.getPermissions === 'super_admin') {
        return true
      }
      return false
    },
  },
  methods: {
    changePopup() {
      this.showPopup = !this.showPopup
    },
  },
}
</script>

<style scoped>
.add_task_con {
  z-index: 100;
  top: 140px;
}
.green_header {
  margin-bottom: 20px;
}
.add_task_con .button_green {
  display: block;
  width: 100%;
}
</style>
