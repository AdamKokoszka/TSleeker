<template>
  <div :class="{ col: true, color_week: isWeekend }">
    <ColumnDate :first-day-date="firstDayDate" :item-num="itemNum" />
    <div v-if="taskAsADay.length <= 0" class="task_con">
      <p class="empty_task">Brak zadań na ten dzień...</p>
    </div>
    <div v-else class="task_con">
      <div v-for="(task, index) in taskAsADay" :key="index">
        <Task :task="task" />
      </div>
    </div>
  </div>
</template>
<script>
import ColumnDate from './ColumnDate.vue'
import Task from './single_task/Task.vue'
export default {
  components: {
    ColumnDate,
    Task,
  },
  props: {
    firstDayDate: {
      type: Date,
      default() {
        return new Date()
      },
    },
    itemNum: {
      type: Number,
      default: 0,
    },
    taskAsADay: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {
    isWeekend() {
      const currentDate = new Date()
      currentDate.setDate(this.firstDayDate.getDate() + this.itemNum)
      const dayOfWeek = currentDate.getDay()

      if (dayOfWeek % 7 === 0 || dayOfWeek % 7 === 6) return true
      return false
    },
  },
}
</script>
<style scoped>
.col {
  height: 100%;
  border-right: 1px solid var(--color-gray-light);
  border-left: 1px solid var(--color-gray-light);
  transition: 0.3s;
  padding: 0 11px;
  padding-bottom: 20px;
}

.empty_task {
  text-align: center;
  opacity: 0.5;
  font-size: 15px;
}
.color_week {
  background-color: #e1e1e1;
}

.arrow_r_con {
  position: absolute;
  right: -45px;
  top: calc(50% - 20px);
  transition: 0.3s;
  z-index: -1;
}
.arrow_r_con img {
  width: 40px;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;
}
.arrow_r_con img:hover {
  opacity: 1;
}
</style>
