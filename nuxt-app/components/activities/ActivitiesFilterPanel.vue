<script setup lang="ts">
  import {
    Search,
    Location,
    Place,
    UserFilled,
    Odometer,
    Calendar,
    Clock,
    Money,
    CloseBold
  } from "@element-plus/icons-vue";
  import { useTwLocationState } from "@/composables/useTwLocationState";
  import { useShuttlerLevelOptions } from "@/composables/useShuttlerLevelOptions";
  import type { ActivityFilter } from "@/types/activities";
  import { mapLevelToLevel } from "@/constants/shuttlerLevels";

  const route = useRoute();
  const city = (route.query.city as string) || "";
  const emits = defineEmits(["updateFilter"]);
  const {
    twCitiesOptions,
    twDistrictsOptions,
    twCity,
    twDistrict,
    manuallySetCity
  } = useTwLocationState();

  const shuttlerLevelOptions = useShuttlerLevelOptions();
  const activitiesFilter = ref<ActivityFilter>({
    venueName: "",
    zipCode: "",
    spotsLeft: (route.query.spotsLeft as string) || "",
    level: (route.query.level as string) || "",
    date: "",
    timeSlot: "",
    points: 0,
    city: ""
  });
  const customDatePrefix = shallowRef({
    render() {
      return h("sapn", "");
    }
  });
  const isOutsideTwoWeeksOrPastDate = (date: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(today.getDate() + 14);
    twoWeeksLater.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate < today || selectedDate > twoWeeksLater;
  };
  const resetActivitiesFilter = () => {
    activitiesFilter.value = {
      venueName: "",
      zipCode: "",
      spotsLeft: "",
      level: "",
      date: "",
      timeSlot: "",
      points: 0,
      city: ""
    };
    manuallySetCity("");
  };

  onMounted(() => {
    manuallySetCity(city);
  });

  watch(
    () => activitiesFilter.value,
    (newFilter) => {
      if (newFilter.date === null) activitiesFilter.value.timeSlot = "";
      const filter = JSON.parse(JSON.stringify(activitiesFilter.value));
      if (filter.level !== "")
        filter.level = mapLevelToLevel(filter.level).toString();
      emits("updateFilter", filter);
    },
    { deep: true, immediate: true }
  );

  watch([twCity, twDistrict], (newValue) => {
    activitiesFilter.value.city = newValue[0];
    activitiesFilter.value.zipCode = newValue[1];
    emits("updateFilter", activitiesFilter.value);
  });
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center">
      <el-input
        v-model="activitiesFilter.venueName"
        class="border border-neutral-300 rounded mr-1"
        placeholder="搜尋活動/場地"
        size="large"
        clearable
        :suffix-icon="Search"
      />
      <el-button
        class="p-3"
        size="large"
        :text="true"
        :icon="CloseBold"
        @click="resetActivitiesFilter"
      >
        清除篩選
      </el-button>
    </div>
    <div class="flex items-center pb-4 border-b border-neutral-300">
      <el-icon class="mr-1.5"><Location /></el-icon>
      <el-select
        v-model="twCity"
        placeholder="請選擇縣市"
        :value-on-clear="''"
        clearable
      >
        <el-option
          v-for="item in twCitiesOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="flex items-center pb-4 border-b border-neutral-300">
      <el-icon class="mr-1.5"><Place /></el-icon>
      <el-select
        v-model="twDistrict"
        placeholder="請選擇區域(需有縣市)"
        :value-on-clear="''"
        clearable
        :disabled="!twCity"
      >
        <el-option
          v-for="item in twDistrictsOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="flex items-center pb-4 border-b border-neutral-300">
      <el-icon class="mr-1.5"><UserFilled /></el-icon>
      <el-select
        v-model="activitiesFilter.spotsLeft"
        placeholder="請選擇人數"
        clearable
      >
        <el-option
          v-for="item in 10"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div class="flex items-center pb-4 border-b border-neutral-300">
      <el-icon class="mr-1.5"><Odometer /></el-icon>
      <el-select
        v-model="activitiesFilter.level"
        placeholder="請選擇程度"
        clearable
      >
        <el-option
          v-for="item in shuttlerLevelOptions"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
    </div>
    <div class="flex items-center pb-4 border-b border-neutral-300">
      <el-icon class="mr-1.5"><Calendar /></el-icon>
      <el-date-picker
        v-model="activitiesFilter.date"
        type="date"
        class="w-full"
        placeholder="請選擇日期"
        clearable
        value-format="YYYY-MM-DD"
        :disabled-date="(date: string) => isOutsideTwoWeeksOrPastDate(date)"
        :prefix-icon="customDatePrefix"
      />
    </div>
    <div class="flex items-center pb-4 border-b border-neutral-300">
      <el-icon class="mr-1.5"><Clock /></el-icon>
      <el-time-select
        v-model="activitiesFilter.timeSlot"
        start="00:00"
        step="01:00"
        end="23:00"
        :disabled="!activitiesFilter.date"
        placeholder="請先選擇時段(需有日期)"
        prefix-icon=""
        clearable
      />
    </div>
    <div>
      <div class="flex items-center">
        <el-icon class="mr-5"><Money /></el-icon>
        <el-slider
          v-model="activitiesFilter.points"
          class="pr-5"
          :step="100"
          show-stops
          :max="1000"
        />
      </div>
      <span class="text-neutral-500 text-sm">
        最低篩選 {{ activitiesFilter.points }} 點以上
      </span>
    </div>
  </div>
</template>
<style scoped lang="scss">
  :deep(.el-select__wrapper) {
    box-shadow: none;
    &.is-hovering:not(.is-focused) {
      box-shadow: none;
    }
    .el-select__prefix {
      display: none;
    }
  }
  :deep(.el-input__wrapper) {
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }
  :deep(.el-input__prefix) {
    display: none;
  }
</style>
