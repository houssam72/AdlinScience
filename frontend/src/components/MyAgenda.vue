<template>
  <div style="margin-top: 200px">
    <DateModePicker v-model="mode" />
    <VDatePicker
      v-model.range="range"
      :mode="mode"
      :rules="rules"
      :attributes="attributes"
    >
      <template #day-popover="{ dayTitle, attributes }">
        <div class="px-2" style="padding: 20px 30px">
          <div
            class="text-xs text-gray-700 dark:text-gray-300 font-semibold text-center"
          >
            {{ dayTitle }}
          </div>
          <ul>
            <li
              v-for="{ key, customData } in attributes"
              :key="key"
              class="block text-xs text-gray-700 dark:text-gray-300 bg-red-100"
              style="margin-bottom: 20px"
            >
              {{ customData.description }}
              <span class="gg-trash" style="display: inline-block" />
            </li>
          </ul>
        </div>
      </template>
    </VDatePicker>
    <div>
      <button class="myButton">Resrver pour cette date</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const range = ref({
  start: new Date(),
  end: new Date(),
});
const mode = ref("dateTime");
const rules = ref([
  {
    hours: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23,
    ],
    minutes: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 58, 59,
    ],
    seconds: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 58, 59,
    ],
    milliseconds: 0,
  },
  {
    hours: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23,
    ],
    minutes: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 58, 59,
    ],
    seconds: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 58, 59,
    ],
    milliseconds: 999,
  },
]);

const todos = ref([
  {
    description: "Salle réservée de [heure de début] jusqu'à [heure de fin].",
    isComplete: false,
    dates: [
      new Date(2023, 4, 4),
      new Date(2023, 4, 10),
      new Date(2023, 4, 15),
      new Date(2023, 5, 10),
    ],
    color: "red",
  },
  {
    description: "Salle réservée de [heure de début] jusqu'à [heure de fin].",
    isComplete: false,
    dates: [
      new Date(2023, 4, 4),
      new Date(2023, 4, 10),
      new Date(2023, 5, 15),
      new Date(2023, 5, 10),
    ],
    color: "green",
  },
  {
    description: "Salle réservée de [heure de début] jusqu'à [heure de fin].",
    isComplete: false,
    dates: [
      new Date(2023, 4, 4),
      new Date(2023, 4, 10),
      new Date(2023, 4, 15),
      new Date(2023, 5, 10),
    ],
    color: "black",
  },
]);

const attributes = computed(() => [
  // Attributqes for todos
  ...todos.value.map((todo) => ({
    dates: todo.dates,
    dot: {
      color: todo.color,
      class: todo.isComplete ? "opacity-75" : "",
    },

    popover: true,
    customData: todo,
  })),
]);
</script>

<style scoped>
.gg-trash {
  color: red;
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 10px;
  height: 12px;
  border: 2px solid transparent;
  box-shadow: 0 0 0 2px, inset -2px 0 0, inset 2px 0 0;
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
  margin-left: 5px;
}

.gg-trash::after,
.gg-trash::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
}

.gg-trash::after {
  background: currentColor;
  border-radius: 3px;
  width: 16px;
  height: 2px;
  top: -4px;
  left: -5px;
}

.gg-trash::before {
  width: 10px;
  height: 4px;
  border: 2px solid;
  border-bottom: transparent;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  top: -7px;
  left: -2px;
}
.myButton {
  background-color: black;
  color: white;
  border: 1px solid white;
  border-radius: 20px;
  padding: 11px;
  margin-top: 30px;
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
</style>
