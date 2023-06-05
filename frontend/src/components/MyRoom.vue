<template>
  <div class="info container tc">
    <div>
      <img
        :src="require(`@/assets/Salle${room.img}.avif`)"
        style="width: 314px; height: 200px"
      />
    </div>
    <div>
      <div>
        <p>Name : {{ room.name }}</p>
        <p>Description : {{ room.description }}</p>
        <p>capacity : {{ room.capacity }}</p>

        <p v-if="room.equipements.length">
          Equipement:
          {{
            room.equipements.map((e) => {
              return e.name;
            })
          }}
        </p>
        <p v-else style="margin-bottom: 50px"></p>
      </div>

      <button class="myButton" @click="handleButtonClick">
        Resrver Une Salle
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyRoom",
  props: ["room"],

  methods: {
    handleButtonClick() {
      this.$emit("button-click", this.room.id);
    },
  },
};
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
  top: 50px;
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
