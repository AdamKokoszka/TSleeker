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
}
</style>
