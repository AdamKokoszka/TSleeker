<template>
  <div v-if="isLoaded && !isError" class="board_con_all">
    <div v-swiper="swiperOption" :loadtheme="false">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in colmunCount"
          :key="index"
          class="swiper-slide"
        >
          <Column
            :first-day-date="currentDate"
            :item-num="item - 1"
            :task-as-a-day="taskGroup[index]"
          />
        </div>
      </div>
      <div slot="button-prev" class="swiper_button swiper_button_prev"></div>
      <div slot="button-next" class="swiper_button swiper_button_next"></div>
    </div>
    <MainPopups></MainPopups>
  </div>
  <div v-else-if="isError" class="board_con">
    <div class="loading_con">
      <img src="~/assets/loading.svg" />
      <h3>Problem z pobrawniem danych...</h3>
    </div>
  </div>
  <div v-else class="board_con">
    <div class="loading_con">
      <img src="~/assets/loading.svg" />
      <h3>Ładowanie...</h3>
    </div>
  </div>
</template>
<script>
import { directive } from 'vue-awesome-swiper'
export default {
  name: 'Slider',
  directives: {
    swiper: directive,
  },
  data() {
    return {
      currentDate: new Date(),
      colmunCount: 30,
      isLoaded: false,
      isError: false,
      tasks: [],
      taskGroup: [],
      retrivealTasks: [],
      entered_name: '',
      permissions: '',
      newUser: {
        name: '',
        email: '',
        password: '',
      },
      pomDate: '',

      swiperOption: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        navigation: {
          nextEl: '.swiper_button_next',
          prevEl: '.swiper_button_prev',
        },
        breakpoints: {
          1600: {
            slidesPerView: 7,
          },
          1300: {
            slidesPerView: 6,
          },
          1120: {
            slidesPerView: 5,
          },
          920: {
            slidesPerView: 4,
          },
          740: {
            slidesPerView: 3,
            slidesPerGroup: 2,
          },
          500: {
            slidesPerView: 2,
          },
        },
      },
    }
  },
  computed: {
    prevUser() {
      return this.$store.getters.getPrevUser
    },
  },
  watch: {
    prevUser(prevUser) {
      this.getUserTasks(prevUser)
    },
  },
  mounted() {
    this.$fire.firestore
      .collection('users')
      .doc(this.$fire.auth.currentUser.email)
      .get()
      .then((info) => {
        if (info.data()) this.permissions = info.data().permissions
        this.$store.commit('setPermissions', this.permissions)
        this.permAdmin(this.permissions)
      })

    this.getUserTasks()

    const appHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', appHeight)
    appHeight()
  },

  methods: {
    getUserTasks(prevUser) {
      const user = prevUser || this.$fire.auth.currentUser.email
      console.log('user:', user)
      this.$fire.firestore
        .collection('users')
        .doc(user)
        .collection('tasks')
        .orderBy('end_date', 'asc')
        .onSnapshot(
          (snapshot) => {
            const tasks = []
            snapshot.docs.forEach((doc) => {
              const docObject = doc.data()
              docObject.id = doc.id
              tasks.push(docObject)
            })
            this.$store.commit('setTasks', tasks)
            this.tasks = this.$store.getters.getTasks
            this.isLoaded = true
            this.taskGroup = []
            this.segregationTasks()
          },
          (error) => {
            console.log(error)
          }
        )
    },
    segregationTasks() {
      for (let i = 0; i < this.colmunCount; i++) {
        const findTasks = this.tasks.filter((task) => {
          const taskDateSlice = new Date(task.end_date.seconds * 1000)
            .toString()
            .slice(0, 10)
          const dayCount = 86400000 * i // One day * count day after today
          const currentDate = new Date(this.currentDate.getTime() + dayCount)
            .toString()
            .slice(0, 10)
          if (taskDateSlice === currentDate) return true
          return false
        })

        // Push Array of task to data()
        this.taskGroup.push(findTasks)
      }
      this.retrievalDelayedTasks()
    },
    retrievalDelayedTasks() {
      const retrivealTasks = this.tasks.filter((task) => {
        const taskDateSlice = new Date(task.end_date.seconds * 1000)
        taskDateSlice.setHours(0, 0, 1)

        const currentDate = new Date(this.currentDate.getTime())
        currentDate.setHours(0, 0, 0)

        if (taskDateSlice.getTime() < currentDate.getTime()) {
          return true
        } else {
          return false
        }
      })
      retrivealTasks.forEach((singleRetriveal) => {
        singleRetriveal.delay = true
        this.taskGroup[0].unshift(singleRetriveal)
      })
    },
    permAdmin(perm) {
      if (perm === 'admin' || perm === 'super_admin') {
        this.$store.dispatch('getTeamMembers')
      }
      if (perm === 'super_admin') {
        this.$store.dispatch('getAdminsAccount')
        this.$store.dispatch('getUsersAccount')
      }
    },
  },
}
</script>
<style scoped>
.board_con_all {
  display: flex;
  flex: 1;
  /* overflow-x: scroll; */
  width: 100%;
  max-width: 100%;
}
.board_con_all::-webkit-scrollbar {
  display: none;
}
.board_con {
  position: relative;
  display: flex;
  flex: 1;
  width: 100%;
}
.col_for {
  /* width: 300px; */
}
.loading_con {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.loading_con h3 {
  position: relative;
  top: -30px;
}
.swiper-container {
  max-width: 100%;
}

.swiper_button {
  position: absolute;
  bottom: 6px;
  width: 45px;
  height: 45px;
  z-index: 10;
  opacity: 0.5;
  transition: 0.3s;
  cursor: pointer;
}
.swiper_button:hover {
  opacity: 1;
}
.swiper_button_next {
  right: 6px;
  background: url(~assets/arrow_right.png);
  background-size: cover;
}
.swiper_button_prev {
  left: 6px;
  background: url(~assets/arrow_left.png);
  background-size: cover;
}
.swiper-button-disabled {
  opacity: 0;
  z-index: -1;
}
</style>
