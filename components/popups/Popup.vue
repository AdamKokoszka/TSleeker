<template>
  <transition name="fade_in_out">
    <div v-if="showPopup" class="popup_bg" @click="changePopup">
      <transition name="fade_slide_in_out">
        <div v-if="showPopup" @click.stop>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changePopup() {
      this.$emit('clicked')
    },
  },
}
</script>

<style scoped>
.popup_bg {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.438);
  z-index: 11;
}
</style>
