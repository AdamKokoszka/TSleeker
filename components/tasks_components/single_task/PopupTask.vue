<template>
  <CenterContainer :previewBox="previewBox">
    <h2>{{ task.header }}</h2>
    <div class="editor_con">
      <Editor :description="task.description" />
    </div>
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
