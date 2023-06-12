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
                isAdmin,
                dateId,
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
              <span
                v-if="isAdmin"
                class="gg-trash"
                style="display: inline-block"
                @click="deleteDate(dateId)"
              />
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
                  isAdmin,
                  dateId,
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
                <span
                  v-if="isAdmin"
                  class="gg-trash"
                  style="display: inline-block"
                  @click="deleteDate(dateId)"
                />
              </li>
            </ul>
          </div>
        </template>
      </VDatePicker>
      <div v-if="rooms.length">
        <div style="color: white; margin-top: 15px">{{ range }}</div>
        <button
          v-if="token"
          class="myButton"
          @click="addReservation(rooms[0].id)"
        >
          Resrver pour cette date
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from "vue";
const token = ref(localStorage.getItem("token"));
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
    await fetch("http://localhost:3000/rooms", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res) => res.json())
      .then((data) => (rooms.value = data))
      .catch((err) => console.log(err.message));
  } else {
    await fetch(`http://localhost:3000/rooms/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
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
    await fetch(`http://localhost:3000/rooms/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res) => res.json())
      .then((data) => (rooms.value = [data]))
      .catch((err) => console.log(err.message));
    console.log("Test", rooms.value);

    attributes.value = Data();
  } else {
    await fetch("http://localhost:3000/rooms", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res) => res.json())
      .then((data) => (rooms.value = data))
      .catch((err) => console.log(err.message));

    attributes.value = Data();
  }
});

const isDateBetween = (targetDate, startDate, endDate) => {
  const targetTime = new Date(targetDate).getTime();
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  return targetTime >= startTime && targetTime <= endTime;
};

const areDatesBetween = (startDate, endDate, date1, date2) => {
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  const time1 = new Date(date1).getTime();
  const time2 = new Date(date2).getTime();

  const isDate1InRange = time1 >= startTime && time1 <= endTime;
  const isDate2InRange = time2 >= startTime && time2 <= endTime;

  return isDate1InRange && isDate2InRange;
};

const getAllDatesBetweenTwoDates = (startDate, endDate, id, isAdmin) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push({
      date: currentDate.toISOString().split("T")[0],
      _id: id,
      isAdmin: isAdmin,
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
      ...getAllDatesBetweenTwoDates(
        new Date(e.start),
        new Date(e.end),
        e._id,
        e.isAdmin
      )
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
        isAdmin: date.isAdmin,
        dateId: date._id,
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
  let salleReserve = false;

  rooms.value[0].date?.forEach((dt) => {
    if (
      isDateBetween(range.value.start, dt.start, dt.end) ||
      isDateBetween(range.value.end, dt.start, dt.end) ||
      areDatesBetween(range.value.start, range.value.end, dt.start, dt.end)
    ) {
      salleReserve = true;
    }
  });

  if (salleReserve) {
    alert(
      "Cette salle est déjà réservée pour ce créneau. Veuillez choisir un autre créneau."
    );
  } else {
    fetch("http://localhost:3000/date", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
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
          post.value = !post.value;
          alert("Reservation bien enregistrer");
        } else {
          alert("Erreur");
        }
      })
      .catch(() => {
        alert("Erreur");
      });
  }
};

const deleteDate = (id) => {
  fetch(`http://localhost:3000/date/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.message == "date deleted") {
        post.value = !post.value;
        alert("Reservation supprimer");
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
  cursor: pointer;
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
