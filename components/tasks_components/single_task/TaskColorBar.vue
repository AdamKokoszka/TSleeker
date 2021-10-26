<template>
  <div
    :class="{ color_bar: true, color_priority: priority, color_delay: delay }"
  ></div>
</template>

<script>
export default {
  props: {
    priority: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.color_bar {
  width: 50px;
  height: 5px;
  border-radius: 5px;
  background-color: var(--color-green-dark);
}
.color_priority {
  background-color: var(--color-blue-light);
}
.color_delay {
  background-color: var(--color-red-light);
}
</style>
