<template>
  <div class="nav_bg">
    <div class="nav con_main">
      <img src="~/assets/logo.png" alt="Slicker Logo" class="logo_slicker" />
      <h2>T-sleeker</h2>
      <button
        v-if="$store.getters.getUser"
        class="button_green button_green_small"
        @click="$router.push('/auth/signout')"
      >
        Wyloguj
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showLogoutButton: false,
    }
  },
}
</script>

<style scoped>
.nav_bg {
  background-color: var(--color-gray-light);
  padding: 15px 0;
}
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav h2 {
  font-size: 40px;
  color: var(--color-grey-dark);
}
.logo_slicker {
  width: 50px;
  opacity: 0;
  animation: 1s ease-in-out 0.5s 1 slideInFromLeft forwards;
}

@keyframes slideInFromLeft {
  0% {
    transform: rotate(0deg) scale(0%);
    opacity: 0;
  }
  100% {
    transform: rotate(90deg) scale(100%);
    opacity: 1;
  }
}
</style>
