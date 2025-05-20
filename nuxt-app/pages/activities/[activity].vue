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
    CollectionTag,
    Flag,
    Money
  } from "@element-plus/icons-vue";

  const { loggedIn } = useUserSession();
  const router = useRoute();
  const activityId = router.params.activity as string;
  const { data, refresh } = await getActivity(activityId);
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
      },
      {
        icon: Tickets,
        label: "活動簡介",
        value: activity.value.brief
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
    return activityInfoList;
  });

  const toggleFavorite = async () => {
    if (!activity.value) return;
    if (activity.value.isFav) {
      const { error } = await removeActivityFromFavorites(
        activity.value.activityId
      );
      if (error.value) return;
      ElMessage({
        message: "已取消收藏",
        type: "success"
      });
    } else {
      const { error } = await addActivityToFavorites(activity.value.activityId);
      if (error.value) return;
      ElMessage({
        message: "已加入收藏",
        type: "success"
      });
    }
    await refresh();
  };
</script>
<template>
  <div
    v-if="activity?.activityId"
    class="py-20"
  >
    <div class="flex flex-col items-center mb-10">
      <h2 class="mb-6">羽神報名去</h2>
      <el-breadcrumb separator="/">
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
            <h3 class="text-4xl flex items-center">
              <el-avatar
                class="mr-2"
                :size="40"
                :src="activity.contactAvatar"
              />
              {{ activity.name }}
            </h3>
            <el-button
              v-if="loggedIn"
              circle
              class="el-favorite ml-auto"
              @click="toggleFavorite"
            >
              <el-icon
                v-if="activity.isFav"
                class="text-primary-accent-dark"
              >
                <Flag />
              </el-icon>
              <el-icon v-else>
                <CollectionTag />
              </el-icon>
            </el-button>
          </div>
          <ul>
            <li
              v-for="(activityInfo, index) in activityInfoList"
              :key="index"
              class="flex items-center mb-2"
            >
              <el-icon
                class="mr-2"
                size="16"
              >
                <component :is="activityInfo.icon" />
              </el-icon>
              {{ activityInfo.label }}：
              <span v-if="activityInfo.label !== '活動程度'">
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
          <div class="flex flex-col border border-gray-300 p-6 rounded-xl">
            <p class="text-lg font-bold mb-3">{{ activity.name }}</p>
            <div class="flex items-center pb-3 mb-3 border-b border-gray-200">
              <ActivityElTags :level="activity.level" />
              <el-tag
                round
                effect="light"
                class="text-black py-4 border-0"
                :class="`${useParticipantStatus('bg', activity.bookedCount, activity.participantCount)} ${useParticipantStatus('border', activity.bookedCount, activity.participantCount)}`"
              >
                {{ activity.bookedCount }}/{{ activity.participantCount }} 人
              </el-tag>
            </div>
            <p class="flex justify-end items-center mb-3">
              <el-icon
                class="mr-2"
                size="16"
              >
                <Money />
              </el-icon>
              <span class="text-lg font-bold">{{ activity.points }} 點</span>
            </p>
            <el-button
              type="primary"
              :disabled="!loggedIn"
              class="w-full py-5 text-base/6 border-0"
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
    --el-button-hover-text-color: var(--color-primary-accent);
    --el-button-hover-bg-color: var(--color-white);
    --el-button-hover-border-color: var(--color-primary-accent);
    --el-button-active-text-color: var(--color-primary-accent-dark);
    --el-button-active-bg-color: var(--color-primary-accent-light);
    --el-button-active-border-color: var(--color-primary-accent-dark);
  }
</style>
