<template>
  <h5>
    {{ header }}
  </h5>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
h5 {
  font-size: 18px;
  margin-bottom: 4px;
  padding-right: 15px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
