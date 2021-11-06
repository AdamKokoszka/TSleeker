<template>
  <div class="description" v-html="description"></div>
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

<style scoped>
.description {
  position: relative;
  font-size: 14px;
  margin-top: 8px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
