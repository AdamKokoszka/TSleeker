<template>
  <img
    src="~/assets/edit.png"
    alt="Img complete task"
    class="mark"
    title="Edytuj zadanie!"
    @click="CompleteTask"
    @click.stop
  />
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    CompleteTask() {
      this.$emit('clicked')
    },
  },
}
</script>

<style scoped>
.task_box:hover .mark {
  visibility: visible;
  opacity: 1;
}
.mark {
  position: absolute;
  bottom: 6px;
  right: 4px;
  width: 19px;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;
  transition: 0.3s;
  z-index: 10;
}
.mark:hover {
  transform: scale(1.1);
}
</style>
