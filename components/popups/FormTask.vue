<template>
  <div>
    <form class="form_main" @submit.prevent="addTask">
      <input
        v-model="taskData.header"
        type="text"
        placeholder="Nagłówek"
        required
      />
      <textarea
        v-model="taskData.description"
        type="text"
        placeholder="Opis"
        required
        rows="4"
      ></textarea>
      <input
        v-model="taskData.end_date"
        type="text"
        placeholder="Data"
        onfocus="(this.type='date')"
        required
      />
      <select v-model="select_user" :class="{ active: select_user }" required>
        <option
          v-for="(member, index) in allMembers"
          :key="index"
          :disabled="index == 0"
          :value="index == 0 ? '' : member"
        >
          {{ member }}
        </option>
      </select>
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
      },
      select_user: '',
      clockedCheckbox: false,
      allMembers: [],
      disabled: 'disabled',
    }
  },
  created() {
    console.log('Form Task created!')
    this.allMembers = this.$store.getters.getMembers
  },
  methods: {
    addTask() {
      const getDate = new Date(this.taskData.end_date)
      this.taskData.end_date = getDate
      const isPermisionUser = this.allMembers.filter(
        (member) => member === this.select_user
      )
      if (isPermisionUser.length > 0) {
        const tasksHandler = this.$fire.firestore
          .collection('users')
          .doc(this.select_user)
          .collection('tasks')
          .doc()
        tasksHandler.set(this.taskData)
        this.$emit('clicked')
      }
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
