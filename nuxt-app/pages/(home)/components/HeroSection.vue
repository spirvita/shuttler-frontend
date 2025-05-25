<script setup lang="ts">
import bgImage from "@/assets/images/hero-section-bg.png";
import { useTwLocationState } from "@/composables/useTwLocationState";
import { useShuttlerLevelOptions } from "@/composables/useShuttlerLevelOptions";

const { twCitiesOptions, twCity } = useTwLocationState();
const shuttlerLevelOptions = useShuttlerLevelOptions();
const level = ref("");
const spotsLeft = ref("");
</script>

<template>
  <section
    class="bg-cover bg-no-repeat bg-center h-[100dvh]"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-5xl mt-[18%] mb-[5%] text-neutral-800">尋找你想參與的活動</h1>
    </div>

    <div
      class="flex justify-center items-center mx-auto w-fit gap-2 max-w-[100%]"
    >
      <div
        class="filter-wrapper flex items-center justify-center mx-auto px-4 py-2"
      >
        <el-select
          v-model="twCity"
          class="hero-section-select"
          placeholder="請選擇縣市"
        >
          <el-option
            v-for="item in twCitiesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select
          v-model="level"
          class="hero-section-select"
          placeholder="請選擇程度"
        >
          <el-option
            v-for="item in shuttlerLevelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select
          v-model="spotsLeft"
          class="hero-section-select"
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
      <el-button
        type="primary"
        class="h-14 text-[16px] w-[104px] rounded-[40px]"
      >
        搜尋
      </el-button>
    </div>
  </section>
</template>

<style scoped>
:deep(.el-select__wrapper) {
  background-color: transparent;
  height: 40px;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
}

.hero-section-select {
  width: 300px;
  border: none;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
}

.filter-wrapper {
  width: fit-content;
  background-color: #fff;
  border-radius: 32px;

  box-shadow:
    0px 0px 1px 0px #b0b0b00d,
    1px 1px 1px 0px #b0b0b00a,
    2px 2px 2px 0px #b0b0b008,
    4px 4px 2px 0px #b0b0b003;
}

:deep(.hero-section-select:first-child .el-select__wrapper),
:deep(.hero-section-select:nth-child(2) .el-select__wrapper) {
  border-right: 1px solid var(--color-neutral-100);
}
</style>
