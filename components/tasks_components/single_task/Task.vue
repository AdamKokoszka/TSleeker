<template>
  <div>
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
import EditTask from '../../popups/EditTask.vue'
import TaskCheckmark from './TaskCheckmark.vue'
import TaskHeader from './TaskHeader.vue'
import TaskColorBar from './TaskColorBar.vue'
import TaskDescription from './TaskDescription.vue'
import TaskInfoBar from './TaskInfoBar.vue'
export default {
  components: {
    TaskCheckmark,
    TaskHeader,
    TaskColorBar,
    TaskDescription,
    TaskInfoBar,
    EditTask,
  },
  props: {
    task: {
      type: Object,
      default: () => ({
        id: '',
        priority: false,
        delay: false,
        header: '',
        description: '',
        creator: '',
      }),
    },
  },
  data() {
    return {}
  },
  computed: {
    canEdit() {
      if (this.$store.getters.getUser) {
        if (this.task.creator === this.$store.getters.getUser.email) return true
        return false
      }
      return false
    },
  },
  methods: {
    CompleteTask() {
      this.$store.dispatch('deleteTask', this.task.id)
    },
    changePopup() {
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
