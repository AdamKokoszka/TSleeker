<template>
  <div>
    <form class="form_main" @submit.prevent="editTask">
      <input
        v-model="taskData.header"
        type="text"
        placeholder="Nagłówek"
        required
      />
      <div class="editor_con">
        <Editor
          :edit="true"
          :description="task.description"
          @clicked="updateEditor"
        />
      </div>
      <div class="split_2">
        <input
          v-model="taskData.end_date"
          type="date"
          placeholder="Data"
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
      <button type="submit" class="button_green">Edytuj zadanie!</button>
      <transition name="fade_in_out">
        <p
          v-if="snackbarText"
          :class="{ error: true, correct_user_data: correctUserData }"
        >
          {{ snackbarText }}
        </p></transition
      >
    </form>
    <div class="close_con">
      <img src="~assets/close.png" alt="Close" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      taskData: {
        header: this.task.header,
        description: this.task.description,
        priority: this.task.priority,
        end_date: { nanoseconds: 0, seconds: 1640304000 },
        creator: this.$fire.auth.currentUser.email,
      },
      select_user: this.$store.getters.getUser.email,
      // select_user:
      //   this.$store.getters.getPermissions === 'user'
      //     ? this.$store.getters.getUser.email
      //     : '',
      snackbarText: '',
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
    // Convert getting date to 'rrrr-mm-dd' form
    const covDate = new Date(this.task.end_date.seconds * 1000)
    let d = '' + covDate.getDate()
    if (d.length < 2) {
      d = '0' + d
    }
    let m = '' + (covDate.getMonth() + 1)
    if (m.length < 2) {
      m = '0' + m
    }
    const r = covDate.getFullYear()
    const displayDate = `${r}-${m}-${d}`
    this.taskData.end_date = displayDate

    this.allMembers = this.$store.getters.getMembers
  },
  methods: {
    editTask() {
      this.snackbarText = ''

      const getDate = new Date(this.taskData.end_date)
      this.taskData.end_date = getDate

      this.$store.dispatch('deleteTask', this.task.id)
      const tasksHandler = this.$fire.firestore
        .collection('users')
        .doc(this.select_user)
        .collection('tasks')
        .doc()
      tasksHandler
        .set(this.taskData)
        .then(() => {
          // this.correctUserData = true
          // this.snackbarText = 'Zaktualizowano dane użytkownika!'
          this.$store.commit('setCurrentEditTask', {})
        })
        .catch((error) => {
          const errorText = this.errorTranslator.find(
            (ell) => ell.code === error.code
          )
          if (errorText) {
            this.snackbarText = errorText.text
          } else {
            this.snackbarText = 'Podane dane zawierają błąd! Spróbuj ponownie.'
          }
        })

      setTimeout(() => {
        this.snackbarText = ''
        this.correctUserData = false
      }, 5000)
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
