<script setup lang="ts">
  import ActivitiesFilterPanel from "~/components/activities/ActivitiesFilterPanel.vue";
  import ActivitiesNearDatePicker from "~/components/activities/ActivitiesNearDatePicker.vue";
  import { Location, Clock, Money, TopRight } from "@element-plus/icons-vue";
  import { useParticipantStatus } from "@/composables/useParticipantStatus";
  import type { Activity, ActivityFilter } from "@/types/activities";

  useHead({
    title: "活動列表 - 羽神同行",
    meta: [
      {
        name: "description",
        content: "探索最新的羽球活動，報名參加並享受羽球樂趣！"
      },
      { property: "og:title", content: "活動列表 - 羽神同行" },
      {
        property: "og:description",
        content: "探索最新的羽球活動，報名參加並享受羽球樂趣！"
      },
      { property: "og:image", content: "/logo.png" },
      { property: "og:image:alt", content: "羽神同行活動列表圖片" },
      { property: "og:url", content: "https://www.spirvita.tw/activities" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "羽神同行" }
    ]
  });
  useSeoMeta({
    title: "活動列表 - 羽神同行",
    description: "探索最新的羽球活動，報名參加並享受羽球樂趣！",
    ogTitle: "活動列表 - 羽神同行",
    ogDescription: "探索最新的羽球活動，報名參加並享受羽球樂趣！",
    ogImage: "/logo.png",
    ogImageAlt: "羽神同行活動列表圖片",
    ogUrl: "https://www.spirvita.tw/activities",
    ogType: "website",
    ogSiteName: "羽神同行"
  });

  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();
  const filter = ref<ActivityFilter>({
    date: "",
    city: (route.query.city as string) || "",
    spotsLeft: (route.query.spotsLeft as string) || "",
    level: (route.query.level as string) || ""
  } as ActivityFilter);
  const queryString = computed(() => {
    const newFilter = filter.value;
    if (filter.value?.zipCode) {
      delete newFilter.city;
    } else if (newFilter?.city) {
      delete newFilter.zipCode;
    }
    newFilter.timeSlot = newFilter.timeSlot
      ? newFilter.timeSlot.replace(":00", "")
      : "";
    if (newFilter.date === null) newFilter.date = "";
    if (newFilter.spotsLeft === undefined) newFilter.spotsLeft = "";
    const newQueryString = new URLSearchParams(
      newFilter as unknown as Record<string, string>
    ).toString();
    return newQueryString;
  });
  const { data, refresh: refreshActivities } = await useFetch<{
    message: string;
    data: Activity[];
  }>(
    () => `${runtimeConfig.public.API_BASE_URL}/activities?${queryString.value}`
  );
  const activitiesData = computed(() => {
    return data.value?.data || [];
  });
  const currentDate = ref("");
  const currentPage = ref(1);
  const paginationLimit = ref(9);
  const router = useRouter();

  const pushToActivity = (activityId: string) => {
    router.push(`/activities/${activityId}`);
  };
  const changePage = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    currentPage.value = page;
  };
  const changeDate = (date: string) => {
    currentDate.value = date;
  };
  const updateFilter = async (newFilter: ActivityFilter) => {
    filter.value = JSON.parse(JSON.stringify(newFilter));
    refreshActivities();
  };
  const activitiesDataFilteredByNearDate = computed(() => {
    return currentDate.value
      ? activitiesData.value.filter(
          (activity) => activity.date === currentDate.value
        )
      : activitiesData.value;
  });
  const activitiesDataFilteredByName = computed(() => {
    const searchKeyword = filter.value.venueName?.toLowerCase();
    if (!searchKeyword) {
      return activitiesDataFilteredByNearDate.value;
    }
    return activitiesDataFilteredByNearDate.value.filter((activity) => {
      const venueName = activity.venueName.toLowerCase();
      const activityName = activity.name.toLowerCase();
      return (
        venueName.includes(searchKeyword) ||
        activityName.includes(searchKeyword)
      );
    });
  });

  const activitiesByPagination = computed(() => {
    return activitiesDataFilteredByName.value.slice(
      (currentPage.value - 1) * paginationLimit.value,
      currentPage.value * paginationLimit.value
    );
  });
</script>
<template>
  <div class="py-20">
    <div class="flex flex-col items-center mb-10">
      <h2 class="mb-6">
        <span class="text-5xl">羽神找活動</span>
      </h2>
      <el-breadcrumb
        class="text-md"
        separator="/"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item>活動列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <ActivitiesFilterPanel
          class="col-span-12 xl:col-span-3"
          @update-filter="updateFilter"
        />
        <div class="col-span-12 xl:col-span-9">
          <ActivitiesNearDatePicker
            :disable-date="filter.date"
            class="mb-6"
            @change-date="changeDate"
          />
          <ul class="grid grid-col-1 xl:grid-cols-3 gap-6 mb-6">
            <li
              v-for="activity in activitiesByPagination"
              :key="activity.activityId"
              class="relative group p-4 border rounded-lg"
              :class="`${useParticipantStatus('border', activity.bookedCount, activity.participantCount)}`"
              @click="pushToActivity(activity.activityId)"
            >
              <div class="flex items-center mb-2">
                <el-avatar
                  class="mr-2"
                  :size="40"
                  :src="activity.contactAvatar"
                />
                <h3>
                  <span class="text-xl block">{{ activity.name }}</span>
                </h3>
              </div>
              <p class="flex items-center text-md mb-2">
                <el-icon
                  class="text-neutral-400 mr-2"
                  size="16"
                >
                  <Location />
                </el-icon>
                {{ activity.venueName }}
              </p>
              <p class="flex items-center text-md mb-2">
                <el-icon
                  class="text-neutral-400 mr-2"
                  size="16"
                >
                  <Clock />
                </el-icon>
                {{ activity.date }} {{ activity.startTime }} -
                {{ activity.endTime }}
              </p>
              <p class="flex items-center mb-2">
                <el-icon
                  class="text-neutral-400 mr-2"
                  size="16"
                >
                  <Money />
                </el-icon>
                <span class="text-lg text-neutral-800 font-bold">
                  {{ activity.points }} 點
                </span>
              </p>
              <div class="flex items-center">
                <ActivityElTags :level="activity.level" />
                <el-tag
                  round
                  class="text-neutral-800 p-4 border-0"
                  :class="`${useParticipantStatus('bg', activity.bookedCount, activity.participantCount)} ${useParticipantStatus('border', activity.bookedCount, activity.participantCount)}`"
                >
                  {{ activity.bookedCount }}/{{ activity.participantCount }} 人
                </el-tag>
              </div>
              <div
                class="absolute -top-0.25 -left-0.25 -bottom-0.25 -right-0.25 border border-gray-500 bg-gray-500 opacity-20 rounded-lg hidden group-hover:block group-hover:cursor-pointer"
              />
              <el-button
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black hidden group-hover:block"
                :icon="TopRight"
                circle
              />
            </li>
          </ul>
          <el-pagination
            class="flex justify-center"
            layout="prev, pager, next"
            size="large"
            :hide-on-single-page="true"
            :page-size="paginationLimit"
            :total="activitiesDataFilteredByName.length"
            @current-change="changePage"
          />
          <p
            v-if="activitiesDataFilteredByName.length === 0"
            class="text-center text-lg text-neutral-500 mt-20"
          >
            暫無資料
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  :deep(.el-pager li.is-active) {
    background-color: var(--color-primary-accent-500);
    border-color: var(--color-primary-accent-500);
    border-radius: 50%;
    color: var(--color-black);
    font-weight: 400;
  }
  :deep(.el-select__wrapper.is-disabled) {
    background: transparent;
  }
</style>
