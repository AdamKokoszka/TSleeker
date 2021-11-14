<template>
  <div>
    <Popup :show-popup="showPopupTask" @clicked="changePopupGetterTask">
      <PopupTask :task="getterTask"></PopupTask>
    </Popup>
    <Popup :show-popup="showPopupEditTask" @clicked="changePopupGetterEditTask">
      <div class="add_task_con">
        <CenterContainer :add-task="true">
          <h2 class="green_header">Edytuj dane.</h2>
          <FormEditTask :task="getterEditTask"></FormEditTask>
        </CenterContainer>
      </div>
    </Popup>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    getterTask() {
      const task = this.$store.getters.getCurrentTask
      const taskLength = Object.keys(task).length
      if (taskLength > 0) {
        return task
      }
      return {}
    },
    getterEditTask() {
      const task = this.$store.getters.getCurrentEditTask
      const taskLength = Object.keys(task).length
      if (taskLength > 0) {
        return task
      }
      return {}
    },
    showPopupTask() {
      const taskLength = Object.keys(this.getterTask).length
      if (taskLength > 0) {
        return true
      }
      return false
    },
    showPopupEditTask() {
      const taskLength = Object.keys(this.getterEditTask).length
      if (taskLength > 0) {
        return true
      }
      return false
    },
  },
  methods: {
    changePopupGetterTask() {
      this.$store.commit('setCurrentTask', {})
    },
    changePopupGetterEditTask() {
      this.$store.commit('setCurrentEditTask', {})
    },
  },
}
</script>

<style scoped>
.green_header {
  margin-bottom: 20px;
}
</style>
