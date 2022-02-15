<template>
  <CenterContainer :previewBox="true">
    <div class="white_con">
      <h2>{{ task.header }}</h2>
    </div>
    <div class="editor_con">
      <Editor :description="task.description" />
    </div>
  </CenterContainer>
</template>

<script>
import CenterContainer from '../../global_layouts/CenterContainer.vue'
export default {
  components: {
    CenterContainer,
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
}
</script>

<style scoped>
.white_con {
  background-color: #fff;
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 18px;
  border-radius: 5px;
  margin-bottom: 10px;
  border-color: transparent;
  font-family: 'Lato', sans-serif;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
  border-left: 0px solid transparent;
  border-right: 0px solid transparent;
  transition: 0.3s;
  box-shadow: 2px 4px 2px -6px, rgb(0 0 0 / 4%) 1px 1px 5px -1px;
}
.editor_con {
  max-height: 730px;
  overflow: auto;
}
@media screen and (max-width: 1023px) {
  .editor_con {
    max-height: 65vh;
  }
}
</style>
