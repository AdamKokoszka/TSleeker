<template>
  <CenterContainer :previewBox="previewBox">
    <h2>{{ task.header }}</h2>
    <p>{{ task.description }}</p>
  </CenterContainer>
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
    return {
      previewBox: true,
    }
  },
}
</script>

<style scoped>
.box_con {
  min-width: 400px;
  width: 50%;
}
</style>
