<template>
  <transition name="fade_in_out">
    <div v-if="!hidden" class="task_box">
      <p>{{ task.id }}</p>
      <p v-if="task.priority" class="priority">Priorytet</p>
      <h5>
        <img
          v-if="task.priority"
          src="~/assets/star.png"
          alt=""
          class="star_icon"
        />{{ task.header || '' }}
      </h5>
      <p>
        {{ task.description || '' }}
      </p>
      <button @click="CompleteTask">Wykonane!</button>
    </div>
  </transition>
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
      priority: 1,
      hidden: false,
    }
  },
  methods: {
    CompleteTask() {
      console.log('Ukończono zadnie!')
      console.log(this.task.id)
      this.hidden = true

      this.$fire.firestore
        .collection('users')
        .doc(this.$fire.auth.currentUser.email)
        .collection('tasks')
        .get()
        .then((snapshot) => {
          const singleTask = snapshot.docs.find(
            (doc) => doc.data().id === this.task.id
          )
          return singleTask
        })
        .then((serachUser) => {
          console.log(serachUser)
          this.$fire.firestore
            .collection('users')
            .doc(this.$fire.auth.currentUser.email)
            .collection('tasks')
            .doc(serachUser.id)
            .delete()
            .then(console.log('Usunięto', serachUser.id, serachUser.header))
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
      // this.classList.add('done')
    },
  },
}
</script>

<style scoped>
.hidden {
  position: absolute;
  background-color: red;
}
.task_box {
  background-color: var(--color-task-1);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  transition: 1s;
}
.star_icon {
  width: 20px;
  height: 20px;
}
h5 {
  font-size: 25px;
}
p {
  position: relative;
}
p:before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  width: 30px;
  height: 30px;
  /* opacity: 0.5; */
  /* background: url(~/assets/star.png) no-repeat; */
  background-position: left top;
  background-size: cover;
}
button {
  width: 100%;
  border: 2px solid var(--color-green-dark);
  background-color: var(--color-gray-light);
  border-radius: 10px;
  padding: 5px;
  font-weight: 700;
  color: var(--color-green-dark);
  margin-top: 20px;
  transition: 0.3s;
  cursor: pointer;
}
button:hover {
  background-color: var(--color-green-dark);
  color: var(--color-gray-light);
}
</style>
