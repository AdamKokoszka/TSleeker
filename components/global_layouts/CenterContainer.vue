<template>
  <div :class="{ box_con: true, preview_box: previewBox }">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    previewBox: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.box_con {
  position: relative;
  width: 400px;
  padding: 20px;
  background-color: var(--color-gray-light);
  border-radius: 20px;
}
.preview_box {
  min-width: 1000px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>
