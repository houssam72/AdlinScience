<template>
  <div>
    <div style="margin-top: 40px">
      <input
        class="inputSearch"
        style="margin-right: 100px"
        type="text"
        placeholder="Trouver Votre salle par capacite"
      />
      <input
        class="inputSearch"
        type="text"
        placeholder="Trouver Votre salle par Equipement"
      />
    </div>
    <div v-if="rooms.length">
      <div style="display: flex; justify-content: center">
        <div v-for="room in rooms" :key="room.id">
          <MyRoom
            :name="room.name"
            :description="room.description"
            :capacity="room.capacity"
            :equipements="room.equipements"
            :id="room.id"
          />
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
    };
  },
  mounted() {
    fetch("http://localhost:3000/rooms")
      .then((res) => res.json())
      .then((data) => (this.rooms = data))
      .catch((err) => console.log(err.message));
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
