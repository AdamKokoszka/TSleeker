<template>
  <div>
    <form class="form_main" @submit.prevent="EditUser">
      <select
        v-model="search_select_user"
        :class="{ active: search_select_user }"
        required
        @change="selectChange()"
      >
        <option
          v-for="(admin, index) in allMembers"
          :key="index"
          :disabled="index == 0"
          :value="index == 0 ? '' : admin"
        >
          {{ admin }}
        </option>
      </select>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search_select_user: '',
      allMembers: [],
    }
  },
  created() {
    this.allMembers = this.$store.getters.getMembers
  },
  methods: {
    selectChange() {
      this.$store.commit('setPrevUser', this.search_select_user)
      this.$emit('clicked')
    },
  },
}
</script>

<style scoped></style>
