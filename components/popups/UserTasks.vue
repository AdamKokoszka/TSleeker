<template>
  <div>
    <button v-if="showUserButton" class="button_nav" @click="changePopup">
      Zadania pracowników
    </button>
    <Popup :show-popup="showPopup" @clicked="changePopup">
      <div class="add_task_con">
        <CenterContainer>
          <h2 class="green_header">Wybierz Użytkownika</h2>
          <FormUserTasks @clicked="changePopup"></FormUserTasks>
        </CenterContainer>
      </div>
    </Popup>
  </div>
</template>
<script>
import Popup from '../global_layouts/Popup.vue'
import CenterContainer from '../global_layouts/CenterContainer.vue'
import FormUserTasks from '../popups/FormUserTasks.vue'
export default {
  components: {
    Popup,
    CenterContainer,
    FormUserTasks,
  },
  data() {
    return {
      showPopup: false,
    }
  },
  computed: {
    showUserButton() {
      if (
        this.$store.getters.getPermissions === 'super_admin' ||
        this.$store.getters.getPermissions === 'admin'
      ) {
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
