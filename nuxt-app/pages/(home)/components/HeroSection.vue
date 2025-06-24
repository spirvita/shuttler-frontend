<script setup lang="ts">
  import bgImage from "@/assets/images/hero-section-bg.png";
  import { useTwLocationState } from "@/composables/useTwLocationState";
  import { useShuttlerLevelOptions } from "@/composables/useShuttlerLevelOptions";
  import { Location, Odometer, User } from "@element-plus/icons-vue";
  import { shuttlerLevels } from "@/constants/shuttlerLevels";

  const router = useRouter();
  const { twCitiesOptions, twCity } = useTwLocationState();
  const shuttlerLevelOptions = useShuttlerLevelOptions();
  const level = ref();
  const spotsLeft = ref("");
  const searchActivities = () => {
    const queryParams = [];

    if (twCity.value) {
      queryParams.push(`city=${twCity.value}`);
    }
    if (level.value) {
      queryParams.push(`level=${shuttlerLevels[level.value]}`);
    }
    if (spotsLeft.value) {
      queryParams.push(`spotsLeft=${spotsLeft.value}`);
    }

    const queryString = queryParams.join("&");
    router.push(`/activities?${queryString}`);
  };
</script>

<template>
  <section
    class="bg-cover bg-no-repeat bg-center h-[100dvh] -mt-20"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div
      class="container flex flex-col items-center justify-center h-full py-20"
    >
      <h2 class="mb-20">
        <span
          class="text-4xl sm:text-5xl lg:text-[64px] leading-[1.2] text-neutral-800"
        >
          尋找你想參與的活動
        </span>
      </h2>
      <div
        class="flex flex-col lg:flex-row justify-center items-center w-full lg:w-fit"
      >
        <div
          class="filter-wrapper flex flex-col md:flex-row items-center justify-center py-2 mb-3 lg:mr-2 lg:mb-0 w-full"
        >
          <el-select
            v-model="twCity"
            class="hero-section-select w-full lg:w-[300px]"
            placeholder="請選擇活動縣市"
          >
            <template #prefix>
              <el-icon
                class="text-secondary-300 mr-2"
                size="24"
              >
                <Location />
              </el-icon>
            </template>
            <el-option
              v-for="item in twCitiesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="level"
            class="hero-section-select hidden lg:block lg:w-[300px]"
            placeholder="請選擇可參與程度"
          >
            <template #prefix>
              <el-icon
                class="text-secondary-300 mr-2"
                size="24"
              >
                <Odometer />
              </el-icon>
            </template>
            <el-option
              v-for="item in shuttlerLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="spotsLeft"
            class="hero-section-select hidden lg:block lg:w-[300px]"
            placeholder="請選擇需報名人數"
          >
            <template #prefix>
              <el-icon
                class="text-secondary-300 mr-2"
                size="24"
              >
                <User />
              </el-icon>
            </template>
            <el-option
              v-for="item in 10"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div
          class="filter-wrapper flex items-center justify-center py-2 mb-3 w-full lg:hidden"
        >
          <el-select
            v-model="level"
            class="hero-section-select w-full"
            placeholder="可參與程度"
          >
            <template #prefix>
              <el-icon
                class="text-secondary-300 mr-2"
                size="24"
              >
                <Odometer />
              </el-icon>
            </template>
            <el-option
              v-for="item in shuttlerLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="spotsLeft"
            class="hero-section-select w-full"
            placeholder="需報名人數"
          >
            <template #prefix>
              <el-icon
                class="text-secondary-300 mr-2"
                size="24"
              >
                <User />
              </el-icon>
            </template>
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
          size="large"
          class="h-full text-md w-full lg:w-[104px] rounded-[40px]"
          @click="searchActivities"
        >
          搜尋
        </el-button>
      </div>
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
