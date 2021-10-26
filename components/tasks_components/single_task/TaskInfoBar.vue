<template>
  <p v-if="delay" class="info_bar color_delay">Opóźnione!</p>
  <p v-else-if="priority" class="info_bar color_priority">Priorytet!</p>
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
.info_bar {
  margin-top: 20px;
  font-weight: 700;
  font-size: 16px;
  color: var(--color-green-light);
}
.color_priority {
  color: var(--color-blue-light);
}
.color_delay {
  color: var(--color-red-light);
}
</style>
