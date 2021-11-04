<template>
  <div class="app_container">
    <Header />
    <div class="container_main">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.app_container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.container_main {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
}

::-webkit-scrollbar {
  height: 6px;
  width: 8px;
  background: #ededed;
}

::-webkit-scrollbar-thumb {
  background-color: #292929;
  border-radius: 20px;
  -webkit-border-radius: 20px;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
.invisible-scrollbar {
  scrollbar-width: none;
}
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
