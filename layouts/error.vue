<template>
  <div class="separate_con">
    <CenterContainer>
      <h1 v-if="error.statusCode === 404" class="header1">
        {{ pageNotFound }}
      </h1>
      <h1 v-else class="header1">
        {{ otherError }}
      </h1>
      <a class="button_green" @click="errorBack">Wróć na stronę główną</a>
    </CenterContainer>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'error 404 Nie znaleziono podstrony',
      otherError: 'Wystąpił błąd',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  methods: {
    errorBack() {
      this.$store.commit('resetState')
      this.$router.go('/')
      this.$fire.auth.signOut()
    },
  },
}
</script>

<style scoped>
.separate_con {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
}
.button_green {
  display: block;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}
</style>
