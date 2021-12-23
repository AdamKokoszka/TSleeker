<template>
  <img
    src="~/assets/checkmark.png"
    alt="Img circle"
    class="mark"
    title="Zadanie wykonane!"
    @click="CompleteTask"
    @click.stop
  />
</template>

<script>
export default {
  methods: {
    CompleteTask() {
      this.$emit('clicked')
    },
  },
}
</script>

<style scoped>
.mark {
  position: absolute;
  top: 6px;
  right: 6px;
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
