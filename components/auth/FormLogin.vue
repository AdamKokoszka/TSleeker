<template>
  <form @submit.prevent="login">
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
form {
  position: relative;
  z-index: 10;
}
.header1 {
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  border-radius: 5px;
  margin-bottom: 10px;
  /* border: 2px solid var(--color-green-light); */
  border-color: transparent;
}
input:active,
input:focus {
  outline: none;
  border: 2px solid var(--color-green-dark);
}

.button_green {
  display: block;
  width: 100%;
}

.error {
  position: absolute;
  top: calc(100%);
  left: 0;
  right: 0;
  width: fit-content;
  width: -moz-fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;
  border-radius: 5px;
  text-align: center;
  padding: 10px;
  background-color: rgb(255, 125, 125);
  color: #fff;
}
</style>
