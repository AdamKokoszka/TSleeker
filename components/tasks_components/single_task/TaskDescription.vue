<template>
  <div class="description_task" v-html="description"></div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
.description_task {
  position: relative;
  font-size: 14px;
  margin-top: 8px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.description_task h2,
.description_task h3 {
  font-size: 16px;
}
.description_task ol,
.description_task ul {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
