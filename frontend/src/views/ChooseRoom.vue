<template>
  <div>
    <div style="margin-top: 120px">
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
    <div style="display: flex; justify-content: center">
      <MyRoom />
      <MyRoom />
      <MyRoom />
      <MyRoom />
      <MyRoom />
    </div>
  </div>
</template>

<script>
import MyRoom from "../components/MyRoom.vue";
export default {
  name: "ChooseRoom",
  components: { MyRoom },
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
