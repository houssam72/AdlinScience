<template>
  <div>
    <DateModePicker v-model="mode" />
    <VDatePicker v-if="!id" :mode="mode" :attributes="attributes">
      <template #day-popover="{ dayTitle, attributes }">
        <div class="px-2 resrvationDiv" style="padding: 20px 30px">
          <div class="tc black f4">
            {{ dayTitle }}
          </div>
          <ul>
            <li
              v-for="{
                key,
                customData,
                startDateDay,
                startDateMonth,
                startDateYear,
                startDateHours,
                startDateMinutes,
                endDateDay,
                endDateMonth,
                endDateYear,
                endDateHours,
                endDateMinutes,
              } in attributes"
              :key="key"
              class="block black"
              style="margin-bottom: 20px; text-align: left"
            >
              la salle {{ customData.name }} est réservée le
              {{ startDateDay }}/{{ startDateMonth }}/{{ startDateYear }} à
              {{ startDateHours }} h {{ startDateMinutes }} jusqu'au
              {{ endDateDay }}/{{ endDateMonth }}/{{ endDateYear }} à
              {{ endDateHours }} h {{ endDateMinutes }}.
              <!-- <span class="gg-trash" style="display: inline-block" /> -->
            </li>
          </ul>
        </div>
      </template>
    </VDatePicker>
    <div v-else style="margin-top: 130px">
      <div style="margin-bottom: 45px">
        <span
          v-if="rooms.length"
          class="white ba b--white bg-transparent f3"
          style="padding: 10px 30px"
          >Salle : {{ rooms[0].name }}</span
        >
      </div>
      <VDatePicker
        v-model.range="range"
        :mode="mode"
        :attributes="attributes"
        hide-time-header
      >
        <template #day-popover="{ dayTitle, attributes }">
          <div class="px-2 resrvationDiv" style="padding: 20px 30px">
            <div class="tc black f4">
              {{ dayTitle }}
            </div>
            <ul>
              <li
                v-for="{
                  key,
                  customData,
                  startDateDay,
                  startDateMonth,
                  startDateYear,
                  startDateHours,
                  startDateMinutes,
                  endDateDay,
                  endDateMonth,
                  endDateYear,
                  endDateHours,
                  endDateMinutes,
                } in attributes"
                :key="key"
                class="block black"
                style="margin-bottom: 20px; text-align: left"
              >
                la salle {{ customData.name }} est réservée le
                {{ startDateDay }}/{{ startDateMonth }}/{{ startDateYear }} à
                {{ startDateHours }} h {{ startDateMinutes }} jusqu'au
                {{ endDateDay }}/{{ endDateMonth }}/{{ endDateYear }} à
                {{ endDateHours }} h {{ endDateMinutes }}.
                <!-- <span class="gg-trash" style="display: inline-block" /> -->
              </li>
            </ul>
          </div>
        </template>
      </VDatePicker>
      <div v-if="rooms.length">
        <div style="color: white; margin-top: 15px">{{ range }}</div>
        <button class="myButton" @click="addReservation(rooms[0].id)">
          Resrver pour cette date
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from "vue";
const props = defineProps({
  id: String,
});
const rooms = ref([]);
const range = ref({
  start: new Date(),
  end: new Date(),
});
const mode = ref(props.id ? "dateTime" : "date");
const post = ref(false);
onMounted(async () => {
  console.log("TestMounted");
  if (!props.id) {
    await fetch("http://localhost:3000/rooms")
      .then((res) => res.json())
      .then((data) => (rooms.value = data))
      .catch((err) => console.log(err.message));
  } else {
    await fetch(`http://localhost:3000/rooms/${props.id}`)
      .then((res) => res.json())
      .then((data) => (rooms.value = [data]))
      .catch((err) => console.log(err.message));
  }
  console.log("Test", rooms.value);

  attributes.value = Data();
});

watch(post, async (newValue) => {
  if (props.id) {
    // Handle the change
    console.log("testmyData changed:", newValue);
    await fetch(`http://localhost:3000/rooms/${props.id}`)
      .then((res) => res.json())
      .then((data) => (rooms.value = [data]))
      .catch((err) => console.log(err.message));
    console.log("Test", rooms.value);

    attributes.value = Data();
  }
});

const getAllDatesBetweenTwoDates = (startDate, endDate, id) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push({
      date: currentDate.toISOString().split("T")[0],
      id: id,
      startDate,
      endDate,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const allMyDate = (tab) => {
  let myTab = [];
  tab.forEach((e) => {
    myTab.push(
      ...getAllDatesBetweenTwoDates(new Date(e.start), new Date(e.end), e.id)
    );
  });

  return myTab;
};

const Data = () => {
  let tab = [];
  console.log("Test2", rooms.value);
  rooms.value.forEach((room) => {
    allMyDate(room.date).forEach((date) => {
      tab.push({
        dates: date.date,
        startDateDay: new Date(date.startDate).getDate(),
        startDateMonth: new Date(date.startDate).getMonth() + 1,
        startDateYear: new Date(date.startDate).getFullYear(),
        startDateHours: new Date(date.startDate).getHours(),
        startDateMinutes: new Date(date.startDate).getMinutes(),
        endDateDay: new Date(date.endDate).getDate(),
        endDateMonth: new Date(date.endDate).getMonth() + 1,
        endDateYear: new Date(date.endDate).getFullYear(),
        endDateHours: new Date(date.endDate).getHours(),
        endDateMinutes: new Date(date.endDate).getMinutes(),
        colorBg: room.color,
        dot: {
          color: room.color,
          class: "",
        },
        popover: true,
        customData: room,
      });
    });
  });
  return tab;
};

const addReservation = (id) => {
  fetch("http://localhost:3000/date", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomId: id,
      start: range.value.start,
      end: range.value.end,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data._id) {
        post.value = true;
        alert("Reservation bien enregistrer");
      } else {
        alert("Erreur");
      }
    })
    .catch(() => {
      alert("Erreur");
    });
};

let attributes = ref(Data());
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
  margin-top: 15px;
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

.resrvationDiv {
  background: white;
}
</style>
