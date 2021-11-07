<template>
  <div>
    <button class="button_nav" @click="changePopup">Dodaj zadanie</button>
    <Popup :show-popup="showPopup" @clicked="changePopup">
      <div class="add_task_con">
        <CenterContainer :add-task="true">
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
      previewBox: true,
    }
  },
  computed: {
    showTaskButton() {
      if (
        this.$store.getters.getPermissions === 'admin' ||
        this.$store.getters.getPermissions === 'super_admin'
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
