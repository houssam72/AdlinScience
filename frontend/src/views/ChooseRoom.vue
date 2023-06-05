<template>
  <div>
    <div style="margin-top: 40px">
      <input
        class="inputSearch"
        style="margin-right: 100px"
        type="number"
        placeholder="Trouver Votre salle par capacite"
        v-model="CapacityValue"
      />
      <input
        class="inputSearch"
        type="text"
        placeholder="Trouver Votre salle par Equipement"
        v-model="EquipementValue"
      />
    </div>
    <div v-if="filterRooms.length">
      <div style="display: flex; justify-content: center">
        <div v-for="(room, index) in filterRooms" :key="index">
          <MyRoom :room="room" @button-click="handleButtonClick" />
        </div>
      </div>
      <div style="margin-top: 100px">
        <MyAgenda modeAgenda="date" />
      </div>
    </div>

    <div v-else>Loading</div>
  </div>
</template>

<script>
import MyRoom from "../components/MyRoom.vue";
import MyAgenda from "../components/MyAgenda.vue";

export default {
  name: "ChooseRoom",
  components: { MyRoom, MyAgenda },
  data() {
    return {
      rooms: [],
      filterRooms: [],
      filterRoomsByEquipement: [],
      filterRoomsByCapacite: [],
      CapacityValue: "",
      EquipementValue: "",
    };
  },
  watch: {
    CapacityValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        // Add your custom logic here
        this.filterRoomsByCapacite = this.rooms.filter((e) => {
          return e.capacity == parseInt(newVal);
        });
        this.filterRoomsFct();
        console.log(
          "Test CapacityValue has been updated:",
          newVal,
          this.filterRoomsByCapacite
        );
      }
    },
    EquipementValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.filterRoomsByEquipement = this.rooms.filter((e) => {
          const equipementNameArray = e.equipements.map((obj) => {
            return obj.name.toUpperCase();
          });

          return equipementNameArray.some((item) =>
            item.includes(newVal.toUpperCase())
          );
        });

        this.filterRoomsFct();
        console.log(
          "Test EquipementValue has been updated:",
          newVal,
          this.filterRoomsByEquipement
        );
      }
    },
  },
  mounted() {
    fetch("http://localhost:3000/rooms")
      .then((res) => res.json())
      .then((data) => {
        this.rooms = data;
        this.filterRooms = data;
      })
      .catch((err) => console.log(err.message));
  },

  methods: {
    handleButtonClick(id) {
      // Do something with the received props
      this.$router.push({ name: "agenda", params: { id: id } });
    },
    filterRoomsFct() {
      if (this.CapacityValue == "" && this.EquipementValue == "") {
        this.filterRooms = this.rooms;
      } else if (this.CapacityValue == "") {
        this.filterRooms = this.filterRoomsByEquipement;
      } else if (this.EquipementValue == "") {
        this.filterRooms = this.filterRoomsByCapacite;
      } else {
        this.filterRooms = this.filterRoomsByCapacite.filter((o) =>
          this.filterRoomsByEquipement.some(
            ({ capacity, equipements }) =>
              o.capacity === capacity &&
              o.equipements.length === equipements.length &&
              o.equipements.every(
                (value, index) => value.name === equipements[index].name
              )
          )
        );
      }
    },
  },
};
</script>

<style>
.inputSearch {
  text-align: center;
  color: white;
  background-color: black;
  border: 1px solid white;
  border-radius: 20px;
  width: 295px;
  height: 30px;
}
</style>
