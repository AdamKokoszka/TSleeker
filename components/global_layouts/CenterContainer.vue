<template>
  <div class="box_con">
    <slot></slot>
  </div>
</template>

<style scoped>
.box_con {
  position: relative;
  width: 400px;
  padding: 20px;
  background-color: var(--color-gray-light);
  border-radius: 20px;
}
</style>
