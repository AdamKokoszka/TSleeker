<template>
  <form class="form_main" @submit.prevent="login">
    <h1 class="header1">Witaj w T-sleeker.</h1>
    <input
      v-model="userData.email"
      type="email"
      placeholder="Email"
      required
      autofocus
    />
    <input
      v-model="userData.password"
      type="password"
      placeholder="Hasło"
      required
    />
    <button type="submit" class="button_green">Zaloguj!</button>
    <transition name="fade_in_out"
      ><p v-if="snackbarText" class="error">{{ snackbarText }}</p></transition
    >
  </form>
</template>
<script>
import errorTranslator from '~/assets/errorTranslator.js'
export default {
  data() {
    return {
      snackbarText: '',
      userData: {
        email: '',
        password: '',
      },
      errorTranslator,
    }
  },
  methods: {
    login() {
      this.snackbarText = ''
      const that = this
      this.$fire.auth
        .signInWithEmailAndPassword(this.userData.email, this.userData.password)
        .catch(function (error) {
          const errorText = that.errorTranslator.find(
            (ell) => ell.code === error.code
          )
          if (errorText) {
            that.snackbarText = errorText.text
          } else {
            that.snackbarText = 'Nieprawidłowe dane lub błąd! Spróbuj pózniej.'
          }

          setTimeout(function () {
            that.snackbarText = ''
          }, 5000)
        })
        .then((user) => {
          // we are signed in
          this.$nuxt.$router.push('/')
        })
    },
  },
}
</script>
<style scoped>
.button_green {
  display: block;
  width: 100%;
}
</style>
