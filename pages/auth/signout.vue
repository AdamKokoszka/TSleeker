<template>
  <div></div>
</template>
<script>
export default {
  asyncData($nuxt) {
    $nuxt.store.commit('resetState')
    $nuxt.$fire.auth.signOut()
  },
}
</script>

<style></style>
