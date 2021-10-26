<template>
  <div>
    <button
      v-if="$store.getters.getPermissions == 'admin'"
      class="button_green button_green_small"
      @click="changePopup"
    >
      Dodaj zadanie
    </button>
    <Popup :show-popup="showPopup" @clicked="changePopup">
      <div class="add_task_con">
        <CenterContainer>
          <h2 class="green_header">Wprowadź dane.</h2>
          <FormTask @clicked="changePopup"></FormTask>
        </CenterContainer>
      </div>
    </Popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showPopup: false,
    }
  },
  mounted() {
    // this.$store.dispatch('getTeamMembers')
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
