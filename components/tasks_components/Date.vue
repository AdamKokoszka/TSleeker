<template>
  <div class="date">
    <h3>
      {{ numDayText }} <span>{{ monthOfWeekText }}</span>
    </h3>
    <p>{{ dayOfWeekText }}</p>
  </div>
</template>
<script>
import {
  dayOfWeekTranslator,
  monthOfWeekTranslator,
} from '~/assets/dateTranslator.js'
export default {
  props: {
    firstDayDate: {
      type: Date,
      default: 0,
    },
    itemNum: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dayOfWeekTranslator,
      monthOfWeekTranslator,
    }
  },
  computed: {
    currentDate() {
      const displayNumberDate = new Date()
      displayNumberDate.setDate(this.firstDayDate.getDate() + this.itemNum)
      return displayNumberDate
    },
    numDayText() {
      return this.currentDate.getDate()
    },
    dayOfWeekText() {
      let dayText = ''
      const dayOfWeek = this.currentDate.getDay()

      dayOfWeekTranslator.forEach((item) => {
        if (item.number === dayOfWeek % 7) {
          dayText = item.text
        }
      })
      return dayText
    },
    monthOfWeekText() {
      let monthText = ''
      const curNumMonth = this.currentDate.getMonth()

      monthOfWeekTranslator.forEach((item) => {
        if (item.number === curNumMonth) {
          monthText = item.text
        }
      })
      return monthText
    },
  },
}
</script>

<style scoped>
.date {
  position: relative;
  padding: 15px 0;
  border-bottom: 2px solid var(--color-gray-light);
  margin-bottom: 15px;
  transition: 0.3s;
}
.date:after {
  content: '';
  position: absolute;
  bottom: -2px;
  width: 0;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  height: 2px;
  transition: 0.3s;
  background-color: var(--color-green-dark);
}
.col:hover .date:after {
  width: 100%;
}
h3 {
  font-size: 30px;
  color: var(--color-grey-dark);
}
h3 span {
  font-size: 16px;
  font-weight: 400;
}
p {
  font-size: 14px;
  opacity: 0.5;
}
</style>
