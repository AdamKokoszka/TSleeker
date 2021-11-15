<template>
  <div class="footer">
    <p>
      &copy; {{ new Date().getFullYear() }} T-sleeker. Aplikacja wpomagająca
      planowanie i realizację zadań.
    </p>
    <p>
      Icons made by
      <a href="https://www.freepik.com" title="Freepik" target="_blank"
        >Freepik</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon" target="_blank"
        >www.flaticon.com</a
      >
    </p>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #fff;
  background-color: rgb(41, 41, 41);
  padding: 7px 15px;
}
.footer p {
  font-size: 14px;
  color: #fff;
}
.footer a {
  color: #fff;
}
@media screen and (max-width: 850px) {
  .footer {
    flex-direction: column;
    align-items: center;
    padding: 10px 5px;
  }
  .footer p {
    font-size: 12px;
    text-align: center;
  }
  .footer p:first-of-type {
    margin-bottom: 5px;
  }
}
</style>
