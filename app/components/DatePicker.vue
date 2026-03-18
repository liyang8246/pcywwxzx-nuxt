<script setup>
const datesList = ref([]);
const dateModel = defineModel();

const getDatesRange = (currentDate, days) => {
  const dates = [];
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  for (let i = 0; i < days; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    if (date.getDay() === 0 || date.getDay() === 6) {
      days += 1;
      continue;
    }
    dates.push({
      date: date,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      weekday: weekdays[date.getDay()],
    });
  }
  return dates;
};

datesList.value = getDatesRange(new Date(), 5);
const selectDate = (date) => {
  const d = new Date(date.date);
  d.setUTCHours(0, 0, 0, 0);
  dateModel.value = d.getTime();
};
</script>

<template>
  <div class="p-0 join max-w-full flex">
    <input
      v-for="(date, index) in datesList"
      :key="index"
      name="DateOption"
      :value="date.id"
      :id="'date-' + date.id"
      @change="selectDate(date)"
      class="join-item btn flex-grow p-0 text-sm"
      type="radio"
      :aria-label="date.day + ' ' + date.weekday"
    />
  </div>
</template>
