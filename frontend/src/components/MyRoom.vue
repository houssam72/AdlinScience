<template>
  <div class="info container tc">
    <div>
      <img src="../assets/Salle.jpg" />
    </div>
    <div>
      <div>
        <p>Name : (nom de la salle)</p>
        <p>Description : (Ma description)</p>
        <p>capacity : (capacity)</p>
        <p>Equipement : ([TV,Retro Projecteur])</p>
      </div>

      <button class="myButton">Resrver Une Salle</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
p {
  text-align: left;
  margin-left: 10%;
  color: white;
}
.container {
  margin-right: 20px;
  position: relative;
  width: 314px;
  height: 440px;
  left: 66px;
  top: 73px;
  background: #ffffff;
}
.myButton {
  background-color: black;
  color: white;
  border: 1px solid white;
  border-radius: 20px;
  padding: 11px;
  cursor: pointer;
}
.myButton:hover {
  background-color: white;
  color: black;
}
.myButton:active {
  background-color: black;
  color: white;
  box-shadow: 0 1px white;
  transform: translateY(2px);
}
.info {
  background-color: black;
}
</style>
