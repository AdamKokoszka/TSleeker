<template>
  <div>
    <form class="form_main" @submit.prevent="addTask">
      <input
        v-model="taskData.header"
        type="text"
        placeholder="Nagłówek"
        required
      />
      <div class="editor_con">
        <Editor :edit="true" @clicked="updateEditor" />
      </div>
      <div class="split_2">
        <input
          v-model="taskData.end_date"
          type="text"
          placeholder="Data"
          onfocus="(this.type='date')"
          required
        />
        <select
          v-if="isNotUser"
          v-model="select_user"
          :class="{ active: select_user }"
          required
        >
          <option
            v-for="(member, index) in allMembers"
            :key="index"
            :disabled="index == 0"
            :value="index == 0 ? '' : member"
          >
            {{ member }}
          </option>
        </select>
      </div>
      <div class="checkbox_con">
        <input id="checkbox" v-model="taskData.priority" type="checkbox" />
        <label for="checkbox" :class="{ dark_text: taskData.priority }"
          >Zadanie priorytetowe</label
        >
      </div>
      <button type="submit" class="button_green">Dodaj zadanie!</button>
    </form>
    <div class="close_con">
      <img src="~assets/close.png" alt="Close" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      taskData: {
        header: '',
        description: '',
        priority: false,
        end_date: '',
        creator: this.$fire.auth.currentUser.email,
      },
      select_user:
        this.$store.getters.getPermissions === 'user'
          ? this.$store.getters.getUser.email
          : '',
      clockedCheckbox: false,
      allMembers: [],
      disabled: 'disabled',
    }
  },
  computed: {
    isNotUser() {
      if (this.$store.getters.getPermissions === 'user') {
        return false
      }
      return true
    },
  },
  created() {
    this.allMembers = this.$store.getters.getMembers
  },
  methods: {
    addTask() {
      const getDate = new Date(this.taskData.end_date)
      this.taskData.end_date = getDate

      const tasksHandler = this.$fire.firestore
        .collection('users')
        .doc(this.select_user)
        .collection('tasks')
        .doc()
      tasksHandler.set(this.taskData)
      this.$store.commit('setPrevUser', this.select_user)
      this.$emit('clicked')
    },
    updateEditor(value) {
      this.taskData.description = value
    },
  },
}
</script>

<style scoped>
.add_task_con .button_green {
  display: block;
  width: 100%;
}

.checkbox_con {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}
.checkbox_con input {
  width: 13px;
  margin-right: 10px;
  margin-bottom: 0;
  padding: 0;
  transform: scale(1.3);
}
.checkbox_con label {
  display: block;
  color: #757575;
}
.checkbox_con .dark_text {
  color: var(--color-grey-dark);
}
.close_con {
  position: absolute;
  bottom: -50px;
  right: 0;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  display: block;
  display: none;
  width: fit-content;
  width: -moz-fit-content;
  padding: 9px;
  border-radius: 11px;
  background-color: var(--color-gray-light);
  z-index: 9;
}
.close_con img {
  width: 16px;
}
</style>
