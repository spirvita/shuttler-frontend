<script setup lang="ts">
  import {
    Search,
    Location,
    Place,
    UserFilled,
    Odometer,
    Calendar,
    Clock,
    Money
  } from "@element-plus/icons-vue";
  import { useTwLocationState } from "@/composables/useTwLocationState";
  import { useShuttlerLevelOptions } from "@/composables/useShuttlerLevelOptions";

  const {
    twCitiesOptions,
    twDistrictsOptions,
    twCity,
    twDistrict,
    initLocationByZip
  } = useTwLocationState();
  const shuttlerLevelOptions = useShuttlerLevelOptions();
  const activitiesFilter = ref({
    venueName: "",
    zipCode: [twDistrict.value],
    spotsLeft: 1,
    level: 1,
    date: "",
    timeSlot: "",
    points: [0, 1000]
  });
  const customDatePrefix = shallowRef({
    render() {
      return h("sapn", "");
    }
  });

  initLocationByZip("100");
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center">
      <el-input
        v-model="activitiesFilter.venueName"
        class="border border-neutral-300 rounded"
        placeholder="搜尋活動/場地"
        size="large"
        clearable
        :suffix-icon="Search"
      />
      <!-- <el-icon
        class="mx-2.5 cursor-pointer"
        size="20"
      >
        <Filter />
      </el-icon> -->
    </div>
    <div class="flex items-center pb-4 border-b border-neutral-300">
      <el-icon class="mr-1.5"><Location /></el-icon>
      <el-select
        v-model="twCity"
        placeholder="請選擇縣市"
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
        placeholder="請選擇區域"
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
      >
        <el-option
          v-for="item in shuttlerLevelOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="flex items-center pb-4 border-b border-neutral-300">
      <el-icon class="mr-1.5"><Calendar /></el-icon>
      <el-date-picker
        v-model="activitiesFilter.date"
        type="date"
        placeholder="請選擇日期"
        :prefix-icon="customDatePrefix"
      />
    </div>
    <div class="flex items-center pb-4 border-b border-neutral-300">
      <el-icon class="mr-1.5"><Clock /></el-icon>
      <el-time-select
        v-model="activitiesFilter.timeSlot"
        start="04:00"
        step="01:00"
        end="23:00"
        placeholder="請選擇時段"
        prefix-icon=""
      />
    </div>
    <div class="flex items-center">
      <el-icon class="mr-5"><Money /></el-icon>
      <el-slider
        v-model="activitiesFilter.points"
        range
        class="pr-5"
        :step="100"
        show-stops
        :max="1000"
      />
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
