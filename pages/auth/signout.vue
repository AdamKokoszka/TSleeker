<template>
  <div></div>
</template>
<script>
export default {
  asyncData($nuxt) {
    $nuxt.$fire.auth.signOut()
  },
}
</script>

<style></style>
