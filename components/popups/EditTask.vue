<template>
  <div>
    <TaskEdit v-if="canEdit" @clicked="EditTask"></TaskEdit>
  </div>
</template>
<script>
export default {
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
