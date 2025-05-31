<script lang="ts" setup>
  import {
    getActivity,
    addActivityToFavorites,
    removeActivityFromFavorites
  } from "@/apis/activity";
  import { activityPictures as defaultActivityPictures } from "~/constants/activityPictures";
  import ActivityPictures from "~/components/activity/ActivityPictures.vue";
  import { useParticipantStatus } from "@/composables/useParticipantStatus";
  import {
    Postcard,
    Calendar,
    Location,
    School,
    Help,
    Odometer,
    User,
    Place,
    Tickets,
    Phone,
    UserFilled,
    ChatDotSquare,
    Money
  } from "@element-plus/icons-vue";

  const { loggedIn } = useUserSession();
  const router = useRoute();
  const activityId = router.params.activity as string;
  const { data, refresh: refreshActivity } = await getActivity(activityId);
  const activity = ref(data.value?.data);

  const pictures = ref(defaultActivityPictures);
  if (activity.value?.pictures && activity.value?.pictures.length > 0) {
    pictures.value = activity.value?.pictures;
  }

  const activityInfoList = computed(() => {
    if (!activity.value) return [];
    const activityInfoList = [
      {
        icon: Postcard,
        label: "主辦單位",
        value: activity.value.organizer
      },
      {
        icon: Calendar,
        label: "活動日期",
        value: `${activity.value.date} ${activity.value.startTime} - ${activity.value.endTime}`
      },
      {
        icon: Postcard,
        label: "場館名稱",
        value: activity.value.venueName
      },
      {
        icon: Location,
        label: "場館地點",
        value: `${activity.value.city}${activity.value.district}${activity.value.address}`
      },
      {
        icon: School,
        label: "場館設施",
        value: activity.value.venueFacilities?.join("、")
      },
      {
        icon: Help,
        label: "使用球種",
        value: activity.value.ballType
      },
      {
        icon: Odometer,
        label: "活動程度",
        value: activity.value.level
      },
      {
        icon: User,
        label: "活動名額",
        value: `${activity.value.participantCount} 人`
      },
      {
        icon: Place,
        label: "租用場地",
        value: `${activity.value.rentalLot} 面`
      }
    ];
    if (loggedIn.value) {
      activityInfoList.push(
        {
          icon: UserFilled,
          label: "聯絡人姓名",
          value: activity.value.contactName
        },
        {
          icon: Phone,
          label: "聯絡人電話",
          value: activity.value.contactPhone
        },
        {
          icon: ChatDotSquare,
          label: "聯絡人 Line",
          value: activity.value.contactLine
        }
      );
    }
    activityInfoList.push({
      icon: Tickets,
      label: "活動簡介",
      value: activity.value.brief
    });
    return activityInfoList;
  });

  const toggleFavorite = async () => {
    if (!activity.value) return;
    if (activity.value.isFavorite) {
      const { error } = await removeActivityFromFavorites(
        activity.value.activityId
      );
      if (!error.value) ElMessage.success("已取消收藏");
    } else {
      const { error } = await addActivityToFavorites(activity.value.activityId);
      if (!error.value) ElMessage.success("已收藏活動");
    }
    await refreshActivity();
    activity.value = data.value?.data;
  };
</script>
<template>
  <div
    v-if="activity?.activityId"
    class="py-20"
  >
    <div class="flex flex-col items-center mb-10">
      <h2 class="mb-6">
        <span class="text-5xl">羽神報名去</span>
      </h2>
      <el-breadcrumb
        class="text-md"
        separator="/"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/activities' }">
          活動列表
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ activity.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <ActivityPictures
        :pictures="pictures"
        class="mb-20"
      />
      <div class="grid grid-col-1 lg:grid-cols-12 gap-6 pt-10">
        <section class="lg:col-span-9">
          <div class="flex items-center pb-7 mb-7 border-b border-gray-200">
            <h3 class="flex items-center">
              <el-avatar
                class="mr-2"
                :size="40"
                :src="activity.contactAvatar"
              />
              <span class="text-5xl">{{ activity.name }}</span>
            </h3>
            <el-button
              v-if="loggedIn"
              circle
              class="el-favorite ml-auto"
              :class="
                activity?.isFavorite
                  ? 'text-primary-accent-500 bg-primary-accent-50 border-primary-accent-500 hover:text-primary-300 hover:bg-primary-50 hover:border-primary-300 active:text-neutral-300 active:bg-neutral-50 active:border-neutral-300'
                  : ''
              "
              @click="toggleFavorite"
            >
              <Icon
                :name="
                  activity?.isFavorite
                    ? 'ic:baseline-bookmark'
                    : 'ic:baseline-bookmark-border'
                "
              />
            </el-button>
          </div>
          <ul>
            <li
              v-for="(activityInfo, index) in activityInfoList"
              :key="index"
              class="flex items-center mb-4"
            >
              <el-icon
                class="mr-2"
                size="16"
              >
                <component :is="activityInfo.icon" />
              </el-icon>
              <span class="text-lg text-neutral-700">
                {{ activityInfo.label }}：
              </span>
              <span
                v-if="activityInfo.label !== '活動程度'"
                class="text-lg"
              >
                {{ activityInfo.value }}
              </span>
              <ActivityElTags
                v-else
                :level="[...activityInfo.value]"
              />
            </li>
          </ul>
        </section>
        <div class="lg:col-span-3">
          <div class="flex flex-col border border-neutral-400 p-6 rounded-xl">
            <p class="text-lg font-bold text-neutral-800 mb-3">
              {{ activity.name }}
            </p>
            <div
              class="flex items-center pb-3 mb-3 border-b border-neutral-200"
            >
              <ActivityElTags :level="activity.level" />
              <el-tag
                round
                size="large"
                class="text-black p-4 border-0 text-base"
                :class="`${useParticipantStatus('bg', activity.bookedCount, activity.participantCount)} ${useParticipantStatus('border', activity.bookedCount, activity.participantCount)}`"
              >
                {{ activity.bookedCount }}/{{ activity.participantCount }} 人
              </el-tag>
            </div>
            <p class="flex justify-end items-center mb-3">
              <el-icon
                class="mr-2 text-neutral-400"
                size="16"
              >
                <Money />
              </el-icon>
              <span class="text-lg text-neutral-800 font-bold">
                {{ activity.points }} 點
              </span>
            </p>
            <el-button
              type="primary"
              :disabled="!loggedIn"
              class="w-full py-5 text-md border-0"
              round
            >
              {{ loggedIn ? "報名活動" : "登入報名" }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .el-favorite {
    --el-button-text-color: var(--color-neutral-600);
    --el-button-hover-text-color: var(--color-primary-accent-500);
    --el-button-hover-bg-color: var(--color-primary-accent-50);
    --el-button-hover-border-color: var(--color-primary-accent-500);
    --el-button-active-text-color: var(--color-primary-300);
    --el-button-active-bg-color: var(--color-primary-50);
    --el-button-active-border-color: var(--color-primary-300);
  }
</style>
