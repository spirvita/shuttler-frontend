<script lang="ts" setup>
  import type { ActivityDetail } from "@/types/activities";
  import {
    getActivity,
    addActivityToFavorites,
    removeActivityFromFavorites,
    registerActivity,
    cancelActivity,
    updateActivityParticipantCount
  } from "@/apis/activity";
  import { activityPictures as defaultActivityPictures } from "@/constants/activityPictures";
  import ActivityPictures from "@/components/activity/ActivityPictures.vue";
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
    Money,
    MapLocation,
    InfoFilled
  } from "@element-plus/icons-vue";
  import { activityStatus } from "@/constants/activityStatus";

  useHead({
    title: "活動詳情 - 羽神同行",
    meta: [
      {
        name: "description",
        content: "查看羽球活動詳情，報名參加並享受羽球樂趣！"
      },
      { property: "og:title", content: "活動詳情 - 羽神同行" },
      {
        property: "og:description",
        content: "查看羽球活動詳情，報名參加並享受羽球樂趣！"
      },
      { property: "og:image", content: "/logo.png" },
      { property: "og:image:alt", content: "羽神同行活動詳情圖片" },
      { property: "og:url", content: "https://www.spirvita.tw/activities" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "羽神同行" }
    ]
  });
  useSeoMeta({
    title: "活動詳情 - 羽神同行",
    description: "查看羽球活動詳情，報名參加並享受羽球樂趣！",
    ogTitle: "活動詳情 - 羽神同行",
    ogDescription: "查看羽球活動詳情，報名參加並享受羽球樂趣！",
    ogImage: "/logo.png",
    ogImageAlt: "羽神同行活動詳情圖片",
    ogUrl: "https://www.spirvita.tw/activities",
    ogType: "website",
    ogSiteName: "羽神同行"
  });

  const { loggedIn } = useUserSession();
  const router = useRoute();
  const activityId = router.params.activity as string;
  const { data, refresh: refreshActivity } = await getActivity(activityId);
  const activity = computed(() => {
    if (!data.value) return null;
    return data.value.data as ActivityDetail;
  });
  const userStore = useUserStore();
  if (loggedIn.value) await userStore.fetchUserInfo();
  const userPoints = computed(() => {
    return userStore.userInfo?.totalPoint || 0;
  });

  const participantCount = ref(1);
  const cancellationLimitHours = ref(2);
  const remainingSlots = computed(() => {
    if (!activity.value) return 0;
    return activity.value.participantCount - activity.value.bookedCount;
  });

  const pictures = ref(defaultActivityPictures);
  if (activity.value?.pictures && activity.value?.pictures.length > 0) {
    pictures.value = activity.value?.pictures;
  }

  const registrationDialogVisible = ref(false);
  const updateRegistrationDialogVisible = ref(false);
  const cancelRegistrationDialogVisible = ref(false);
  const registeredDialogVisible = ref(false);

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

  const canRegisterByPoints = computed(() => {
    if (!activity.value) return false;
    const pointsNeeded = activity.value.points * participantCount.value;
    return (
      pointsNeeded > userPoints.value ||
      participantCount.value <= 0 ||
      participantCount.value === activity.value.registeredCount
    );
  });

  const checkPointsBalance = computed(() => {
    if (!activity.value) return "";
    const pointsNeeded = activity.value.points * participantCount.value;
    if (canRegisterByPoints.value) {
      return `您的點數餘額不足`;
    }
    return `此活動將扣除 ${pointsNeeded} 點數，剩餘 ${
      userPoints.value - pointsNeeded
    } 點數`;
  });

  const checkPointsBalanceByRegisteredCount = computed(() => {
    if (!activity.value) return "";

    if (participantCount.value < activity.value.registeredCount) {
      return `您已報名 ${activity.value.registeredCount} 人，若修改為 ${participantCount.value} 人，將退還 ${
        (activity.value.registeredCount - participantCount.value) *
        activity.value.points
      } 點數`;
    }

    const pointsNeeded =
      (participantCount.value - activity.value.registeredCount) *
      activity.value.points;
    if (pointsNeeded > userPoints.value) {
      return `您的點數餘額不足，還需要 ${pointsNeeded - userPoints.value} 點數`;
    }
    if (participantCount.value === activity.value.registeredCount) {
      return `您已報名 ${activity.value.registeredCount} 人，不須修改`;
    }
    return `您已報名 ${activity.value.registeredCount} 人，若修改為 ${participantCount.value} 人，將扣除 ${
      pointsNeeded
    } 點數，剩餘 ${userPoints.value - pointsNeeded} 點數`;
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
  };

  const handleDialog = (status: string) => {
    if (!loggedIn.value) return;
    if (!isCancelable.value) {
      ElMessage.error(
        `活動開始前 ${cancellationLimitHours.value} 小時內無法取消報名/修改人數`
      );
      cancelRegistrationDialogVisible.value = false;
      return;
    }
    if (status === "published") {
      registrationDialogVisible.value = true;
    } else if (status === "registered") {
      registeredDialogVisible.value = true;
    }
  };
  const handleRegisteredDialog = (action: string) => {
    registeredDialogVisible.value = false;
    setTimeout(() => {
      if (action === "cancel") {
        cancelRegistrationDialogVisible.value = true;
      } else if (action === "register") {
        updateRegistrationDialogVisible.value = true;
      }
    }, 300);
  };

  const updateUserAndActivity = async () => {
    await userStore.fetchUserInfo();
    await refreshActivity();
  };

  const handleRegisterActivity = async (action: boolean) => {
    if (!action) {
      registrationDialogVisible.value = false;
      participantCount.value = 1;
      return;
    }

    if (!activity.value?.activityId) return;
    const payload = {
      activityId: activity.value.activityId,
      participantCount: participantCount.value
    };
    const { error } = await registerActivity(payload);
    if (!error.value) ElMessage.success("報名成功");
    registrationDialogVisible.value = false;
    participantCount.value = 1;
    await updateUserAndActivity();
  };
  const handleUpdateRegisterActivity = async (action: boolean) => {
    if (!action) {
      updateRegistrationDialogVisible.value = false;
      participantCount.value = 1;
      return;
    }
    if (!activity.value?.activityId) return;
    const payload = {
      activityId: activity.value.activityId,
      participantCount: participantCount.value
    };
    const { error } = await updateActivityParticipantCount(payload);
    if (!error.value) ElMessage.success("修改成功");
    updateRegistrationDialogVisible.value = false;
    participantCount.value = 1;
    await updateUserAndActivity();
  };

  const isCancelable = computed(() => {
    if (!activity.value) return false;
    const activityDateTime = new Date(
      `${activity.value.date}T${activity.value.startTime}`
    );
    const hoursBefore = new Date(
      activityDateTime.getTime() - cancellationLimitHours.value * 60 * 60 * 1000
    );
    return new Date() < hoursBefore;
  });

  const handleCancelActivity = async () => {
    if (!activity.value?.activityId) return;
    const { error } = await cancelActivity(activity.value.activityId);
    if (!error.value) ElMessage.success("取消報名成功");
    cancelRegistrationDialogVisible.value = false;
    await updateUserAndActivity();
  };

  const openGoogleMaps = () => {
    if (!activity.value) return;
    const { venueName, city, district, address } = activity.value;
    const query = `${venueName}, ${city}${district}${address}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

    window.open(url, "_blank");
  };

  const openGoogleCalendar = () => {
    if (!activity.value) return;
    const { date, startTime, endTime, name, brief, city, district, address } =
      activity.value;
    const startDateTime = `${date.replace(/-/g, "")}T${startTime.replace(/:/g, "")}00`;
    const endDateTime = `${date.replace(/-/g, "")}T${endTime.replace(/:/g, "")}00`;
    const location = `${city}${district}${address}`;
    const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(name)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(brief)}&location=${encodeURIComponent(location)}`;

    window.open(url, "_blank");
  };

  watch(
    () => loggedIn.value,
    async (newValue) => {
      if (newValue) {
        await updateUserAndActivity();
      }
    }
  );
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
                activity.isFavorite
                  ? 'text-primary-accent-500 bg-primary-accent-50 border-primary-accent-500 hover:text-primary-300 hover:bg-primary-50 hover:border-primary-300 active:text-neutral-300 active:bg-neutral-50 active:border-neutral-300'
                  : ''
              "
              @click="toggleFavorite"
            >
              <Icon
                :name="
                  activity.isFavorite
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
              <span class="text-lg text-neutral-700 text-nowrap">
                {{ activityInfo.label }}：
              </span>
              <span
                v-if="activityInfo.label !== '活動程度'"
                class="text-lg flex items-center"
              >
                {{ activityInfo.value }}
                <el-icon
                  v-if="activityInfo.label === '場館名稱'"
                  class="cursor-pointer ml-1"
                  @click="openGoogleMaps"
                >
                  <MapLocation />
                </el-icon>
                <el-icon
                  v-else-if="activityInfo.label === '活動日期'"
                  class="cursor-pointer ml-1 pb-1"
                  @click="openGoogleCalendar"
                >
                  <Calendar />
                </el-icon>
              </span>
              <ActivityElTags
                v-else
                :level="[...activityInfo.value]"
              />
            </li>
          </ul>
        </section>
        <div class="lg:col-span-3">
          <div
            class="flex flex-col border border-neutral-400 p-6 rounded-xl mb-3"
          >
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
            <p class="flex items-center mb-3 text-xs text-neutral-500">
              <el-icon class="mr-1"><InfoFilled /></el-icon>
              活動開始前
              {{ cancellationLimitHours }} 小時內無法取消報名/修改人數
            </p>
            <el-button
              v-if="!loggedIn"
              type="primary"
              :disabled="!loggedIn"
              class="w-full py-5 text-md border-0"
              round
            >
              {{
                activity.status === "published"
                  ? "報名請先登入"
                  : activityStatus[activity.status]
              }}
            </el-button>
            <el-button
              v-else
              :type="activity.status === 'published' ? 'primary' : 'danger'"
              :disabled="
                activity.status === 'full' || activity.status === 'ended'
              "
              class="w-full py-5 text-md border-0"
              :class="
                activity.status === 'full' || activity.status === 'ended'
                  ? 'bg-neutral-300 text-neutral-600'
                  : ''
              "
              round
              @click="handleDialog(activity.status)"
            >
              {{ activityStatus[activity.status] }}
            </el-button>
          </div>
          <div
            class="flex flex-col border border-neutral-400 p-6 rounded-xl mb-3"
          >
            <el-button
              v-if="activity.status !== 'ended'"
              type="info"
              :icon="Calendar"
              class="py-5 text-md mb-3 border-0 bg-secondary-300 hover:bg-secondary-800"
              round
              @click="openGoogleCalendar"
            >
              加行事曆
            </el-button>
            <el-button
              type="info"
              :icon="Location"
              class="py-5 text-md m-0 border-0 bg-secondary-300 hover:bg-secondary-800"
              round
              @click="openGoogleMaps"
            >
              地點導航
            </el-button>
          </div>
          <div class="flex flex-col border border-neutral-400 p-6 rounded-xl">
            <p>
              <span class="text-lg text-neutral-700">主辦者：</span>
              {{ activity.organizer }}
            </p>
            <p>
              <span class="text-lg text-neutral-700">已舉辦：</span>
              {{ activity.organizerStats.totalHosted }} 場活動
            </p>
            <p>
              <span class="text-lg text-neutral-700">舉辦中：</span>
              {{ activity.organizerStats.ongoingHosted }} 場活動
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="registrationDialogVisible"
      title="報名確認"
      width="350"
    >
      <p class="text-md my-3">
        <span class="mr-1">活動時段 :</span>
        {{ `${activity.date} ${activity.startTime} ${activity.endTime}` }}
      </p>
      <div
        class="flex items-center pb-5 border-b border-neutral-200 mb-5 text-md"
      >
        <label
          for="participantCount"
          class="text-nowrap mr-2"
        >
          報名人數 :
        </label>
        <el-select
          id="participantCount"
          v-model="participantCount"
          placeholder="請選擇人數"
          size="large"
          class="w-full"
        >
          <el-option
            v-for="item in remainingSlots"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <p class="mb-3">您有尚有 {{ userPoints }} 點數</p>
      <p>{{ checkPointsBalance }}</p>
      <template #footer>
        <div class="flex">
          <el-button
            class="w-full mr-2"
            round
            size="large"
            @click="handleRegisterActivity(false)"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            class="w-full"
            round
            size="large"
            :disabled="canRegisterByPoints"
            @click="handleRegisterActivity(true)"
          >
            報名
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="updateRegistrationDialogVisible"
      title="修改確認"
      width="350"
    >
      <p class="text-md my-3">
        <span class="= mr-1">活動時段 :</span>
        {{ `${activity.date} ${activity.startTime} ${activity.endTime}` }}
      </p>
      <div
        class="flex items-center text-md pb-5 border-b border-neutral-200 mb-5"
      >
        <label
          for="participantCount"
          class="text-nowrap mr-2"
        >
          報名人數 :
        </label>
        <span clas="block text-nowrap">修改為</span>
        <el-select
          id="participantCount"
          v-model="participantCount"
          placeholder="請選擇人數"
          size="large"
          class="flex-1 ml-2"
        >
          <el-option
            v-for="item in remainingSlots + activity.registeredCount"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <p class="mb-3">您有尚有 {{ userPoints }} 點數</p>
      <p>{{ checkPointsBalanceByRegisteredCount }}</p>
      <template #footer>
        <div class="flex">
          <el-button
            class="w-full mr-2"
            round
            size="large"
            @click="handleUpdateRegisterActivity(false)"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            class="w-full"
            round
            size="large"
            :disabled="canRegisterByPoints"
            @click="handleUpdateRegisterActivity(true)"
          >
            修改
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="cancelRegistrationDialogVisible"
      title="取消確認"
      width="350"
    >
      <p class="text-md my-3">您是否要取消此活動?</p>
      <template #footer>
        <div class="flex">
          <el-button
            class="w-full mr-2"
            round
            size="large"
            @click="handleCancelActivity"
          >
            取消報名
          </el-button>
          <el-button
            type="primary"
            class="w-full"
            round
            size="large"
            @click="cancelRegistrationDialogVisible = false"
          >
            不取消
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="registeredDialogVisible"
      :model="false"
      title="您已報名活動"
      width="350"
    >
      <p class="text-md my-3">您要取消報名或是修改人數?</p>
      <template #footer>
        <div class="flex">
          <el-button
            class="w-full"
            round
            size="large"
            @click="handleRegisteredDialog('cancel')"
          >
            取消報名
          </el-button>
          <el-button
            class="w-full"
            round
            size="large"
            @click="handleRegisteredDialog('register')"
          >
            修改人數
          </el-button>
        </div>
      </template>
    </el-dialog>
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
