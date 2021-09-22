export const deleteUser = function (serachUser, thisFireFirestore) {
  thisFireFirestore
    .collection('users')
    .doc(this.$fire.auth.currentUser.email)
    .collection('tasks')
    .doc(serachUser.id)
    .delete()
    .catch((err) => {
      console.log(err)
    })
}
