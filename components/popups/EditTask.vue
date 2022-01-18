<template>
  <div>
    <TaskEdit v-if="canEdit" @clicked="EditTask"></TaskEdit>
  </div>
</template>
<script>
import TaskEdit from '../tasks_components/single_task/TaskEdit.vue'
export default {
  components: {
    TaskEdit,
  },
  props: {
    canEdit: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    EditTask() {
      this.$store.commit('setCurrentEditTask', this.task)
    },
  },
}
</script>
