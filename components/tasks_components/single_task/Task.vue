<template>
  <div>
    <!-- <transition name="fade_in_out" @after-leave="toDelate"> -->
    <div
      :class="{
        task_box: true,
        blue_bg: task.priority,
        red_bg: task.delay,
      }"
      @click="changePopup"
    >
      <TaskCheckmark @clicked="CompleteTask"></TaskCheckmark>
      <TaskHeader :header="task.header || ''"></TaskHeader>
      <TaskColorBar
        :priority="task.priority"
        :delay="task.delay"
      ></TaskColorBar>
      <TaskDescription :description="task.description || ''"></TaskDescription>
      <TaskInfoBar
        :priority="task.priority"
        :delay="task.delay || null"
      ></TaskInfoBar>
      <EditTask :can-edit="canEdit" :task="task"></EditTask>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    canEdit() {
      if (this.task.creator === this.$fire.auth.currentUser.email) return true
      return false
    },
  },
  methods: {
    CompleteTask() {
      // this.toDelate()
      this.$store.dispatch('deleteTask', this.task.id)
    },
    // toDelate() {
    //   this.$store.dispatch('deleteTask', this.task.id)
    // },
    changePopup() {
      console.log('Click task!')
      this.$store.commit('setCurrentTask', this.task)
    },
  },
}
</script>

<style scoped>
.task_box {
  position: relative;
  background-color: var(--color-gray-light);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 9px;
  transition: 1s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  cursor: pointer;
}
.task_box:hover .mark {
  visibility: visible;
  opacity: 1;
}
.blue_bg {
  background-color: var(--color-blue-lighter);
}
.red_bg {
  background-color: var(--color-red-lighter);
}
</style>
