<script lang="ts" setup>
  import type {
    FormInstance,
    FormRules,
    UploadFiles,
    UploadInstance
  } from "element-plus";
  import type {
    ActivityDetail,
    CreateActivityPayload
  } from "@/types/activities";
  import { useShuttlerLevelOptions } from "@/composables/useShuttlerLevelOptions";
  import { useTwLocationState } from "@/composables/useTwLocationState";
  import { venueFacilities as availableVenueFacilities } from "@/constants/venueFacilities";
  import {
    createActivity,
    updateActivity,
    draftActivityToPublished
  } from "@/apis/activity";
  import { uploadImages } from "@/apis/upload";
  import { queryBallTypesSearch } from "@/constants/ballTypes";
  import { queryVenuesSearch } from "@/constants/venues";
  import { useUserStore } from "@/stores/user";

  interface ActivityForm {
    activityEditInfo?: ActivityDetail;
  }

  type ActivityStatus = "draft" | "published" | "update" | "";

  const props = defineProps<ActivityForm>();
  const emits = defineEmits(["close", "reloadData"]);
  const userStore = useUserStore();
  await userStore.fetchUserInfo();

  const activityEditInfo = computed(() => {
    return props.activityEditInfo;
  });
  const isDisableEditColumn = computed(() => {
    const isDraft = activityEditInfo.value?.status === "draft";
    const isPublished = activityEditInfo.value?.status === "published";
    if (isDraft) return false;
    if (activityEditInfo.value?.activityId && isPublished) return true;
    return false;
  });
  const router = useRouter();
  const {
    twCitiesOptions,
    twDistrictsOptions,
    twCity,
    twDistrict,
    twDistrictName,
    initLocationByZip,
    manuallySetCity,
    manuallySetDistrictNameByName
  } = useTwLocationState();
  const activityInfo = ref<Partial<ActivityDetail> & CreateActivityPayload>({
    name: "",
    pictures: [],
    date: new Date().toISOString().split("T")[0],
    startTime: "",
    endTime: "",
    participantCount: 1,
    rentalLot: 1,
    ballType: "",
    points: 0,
    level: [],
    brief: "",
    city: twCity.value,
    district: twDistrictName.value,
    venueName: "",
    address: "",
    venueFacilities: [],
    organizer:
      userStore.userInfo?.organization || userStore.userInfo?.name || "",
    contactName: userStore.userInfo?.name || "",
    contactPhone: userStore.userInfo?.phone || "",
    contactLine: "",
    status: ""
  });
  const validatePhone = (
    _rule: unknown,
    value: string,
    callback: (error?: Error) => void
  ) => {
    const phoneRegex = /^[0-9]+$/;
    if (!value) {
      callback(new Error("請輸入聯絡人電話"));
    } else if (!phoneRegex.test(value)) {
      callback(new Error("聯絡人電話格式不正確，請輸入數字"));
    } else {
      callback();
    }
  };
  const validateGreaterThanZero = (
    _rule: unknown,
    value: number,
    callback: (error?: Error) => void
  ) => {
    if (value <= 0) {
      callback(new Error("數字必須大於 0"));
    } else {
      callback();
    }
  };
  const validateLessThanZero = (
    _rule: unknown,
    value: number,
    callback: (error?: Error) => void
  ) => {
    if (value < 0) {
      callback(new Error("數字不能小於 0"));
    } else {
      callback();
    }
  };
  const isPastDate = (date: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate < today;
  };
  const validateParticipantCount = (
    _rule: unknown,
    value: number,
    callback: (error?: Error) => void
  ) => {
    const bookedCount = activityEditInfo.value?.bookedCount || 0;
    if (activityEditInfo.value?.activityId && value < bookedCount) {
      callback(new Error("活動名額不能小於已報名人數"));
    } else {
      callback();
    }
  };
  const activityInfoFormRules = ref<FormRules>({
    name: [
      { required: true, message: "請輸入名稱", trigger: "blur" },
      {
        min: 2,
        max: 15,
        message: "名稱長度應在 2 到 15 個字之間",
        trigger: "blur"
      }
    ],
    date: [{ required: true, message: "請選擇日期", trigger: "change" }],
    startTime: [
      { required: true, message: "請選擇開始時間", trigger: "change" }
    ],
    endTime: [{ required: true, message: "請選擇結束時間", trigger: "change" }],
    participantCount: [
      { required: true, message: "請輸入活動名額", trigger: "blur" },
      { validator: validateGreaterThanZero, trigger: "change" },
      { validator: validateParticipantCount, trigger: "change" }
    ],
    rentalLot: [
      { required: true, message: "請輸入租用場地", trigger: "blur" },
      { validator: validateGreaterThanZero, trigger: "blur" }
    ],
    ballType: [{ required: true, message: "請輸入使用球種", trigger: "blur" }],
    points: [
      { required: true, message: "請輸入活動點數", trigger: "blur" },
      { validator: validateLessThanZero, trigger: "blur" }
    ],
    level: [{ required: true, message: "請選擇活動程度", trigger: "change" }],
    venueName: [
      { required: true, message: "請輸入場館名稱", trigger: "change" },
      {
        min: 2,
        max: 15,
        message: "場館名稱長度應在 2 到 15 個字之間",
        trigger: "blur"
      }
    ],
    venueFacilities: [
      {
        type: "array",
        required: true,
        message: "請至少選擇一項場館設施",
        trigger: "change"
      }
    ],
    address: [
      { required: true, message: "請輸入場館地址", trigger: "change" },
      {
        min: 3,
        max: 50,
        message: "地址長度應在 3 到 50 個字之間",
        trigger: "blur"
      }
    ],
    organizer: [
      {
        required: true,
        message: "請輸入主辦單位名稱/個人名稱",
        trigger: "blur"
      },
      {
        min: 2,
        max: 15,
        message: "主辦單位名稱長度應在 2 到 15 個字之間",
        trigger: "blur"
      }
    ],
    contactName: [
      { required: true, message: "請輸入聯絡人姓名", trigger: "blur" },
      {
        min: 2,
        max: 15,
        message: "聯絡人姓名長度應在 2 到 15 個字之間",
        trigger: "blur"
      }
    ],
    contactPhone: [
      {
        required: true,
        validator: validatePhone,
        trigger: "blur"
      }
    ]
  });
  const activityInfoFormRef = ref<FormInstance>();
  const uploadImageRef = ref<UploadInstance>();
  const shuttlerLevelOptions = useShuttlerLevelOptions();
  const uploadImageFiles = ref<UploadFiles>([]);

  const processActivityStatus = async (status: ActivityStatus) => {
    const isOrganizerPage =
      router.currentRoute.value.path === "/member-center/organizer-activities";

    const handleSuccess = (message: string) => {
      ElMessage.success(message);
      emits("close");
      emits("reloadData");
    };

    if (
      isOrganizerPage &&
      activityInfo.value.activityId &&
      status === "update"
    ) {
      const { error } = await updateActivity(
        activityInfo.value as ActivityDetail
      );
      if (!error.value) handleSuccess("修改成功");
      return;
    }
    if (
      isOrganizerPage &&
      activityInfo.value.activityId &&
      status === "draft"
    ) {
      activityInfo.value.status = status;
      const { error } = await draftActivityToPublished(
        activityInfo.value as ActivityDetail
      );
      if (!error.value)
        handleSuccess(`活動已${status === "draft" ? "儲存" : "發佈"}成功`);
      return;
    }

    activityInfo.value.district = twDistrictName.value;
    const { error } = await createActivity(
      activityInfo.value,
      status as "draft" | "published"
    );
    if (error.value) return;
    if (!error.value) {
      if (!isOrganizerPage && status === "published")
        router.push("/activities");
      if (!isOrganizerPage && status === "draft")
        router.push("/member-center/organizer-activities");
      handleSuccess(`活動已${status === "draft" ? "儲存" : "發佈"}成功`);
      activityInfoFormRef.value?.resetFields();
      clearUploadedFiles();
    }
  };

  const handleElUploadRef = (elUploadRef: UploadInstance) => {
    uploadImageRef.value = elUploadRef;
  };

  const handleChange = (uploadFiles: UploadFiles) => {
    uploadImageFiles.value = uploadFiles;
  };

  const handleUploadImages = async () => {
    return await uploadImages(uploadImageFiles.value, "activity");
  };

  const handleVenueSelect = (item: Record<string, string>) => {
    activityInfo.value.address = item.address;
  };

  const submitForm = async (
    formEl: FormInstance | undefined,
    status: ActivityStatus
  ) => {
    if (!formEl) return;
    await formEl.validate(async (valid, _fields) => {
      if (valid) {
        if (!activityInfo.value.city || !activityInfo.value.district) {
          ElMessage.error("請選擇縣市區域");
          return;
        }
        if (uploadImageFiles.value.length > 0) {
          const photo = await handleUploadImages();
          if (photo && photo.length > 0) {
            activityInfo.value.pictures = photo as string[];
          } else {
            return;
          }
        }
        await processActivityStatus(status);
      } else {
        ElMessage.error("提交資料有錯誤喔! 請檢查後再送出");
      }
    });
  };

  const clearUploadedFiles = () => {
    uploadImageRef.value?.clearFiles();
  };

  const canUseTimeSlot = computed(() => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (activityInfo.value.date === currentDate) {
      const nextHour = currentMinute > 0 ? currentHour + 3 : currentHour;
      return `${String(nextHour).padStart(2, "0")}:00`;
    } else {
      return "00:00";
    }
  });
  const isImporting = ref(true);
  onMounted(() => {
    if (
      activityEditInfo.value?.activityId ||
      activityEditInfo.value?.status === "copy"
    ) {
      activityInfo.value = activityEditInfo.value;
      if (activityEditInfo.value?.status === "copy") {
        activityInfo.value.date = new Date(
          new Date().setDate(new Date().getDate() + 1)
        )
          .toISOString()
          .split("T")[0];
        activityInfo.value.status = "";
      }
      manuallySetCity(activityEditInfo.value.city);
      setTimeout(() => {
        manuallySetDistrictNameByName(
          activityEditInfo.value?.district as string
        );
      }, 100);
    } else {
      const userPreferredLocation = userStore.userInfo?.preferredLocation?.[0]
        ? userStore.userInfo.preferredLocation[0]
        : "100";
      const userLevel = userStore.userInfo?.level
        ? [userStore.userInfo.level]
        : [];
      if (userLevel.length > 0) activityInfo.value.level = userLevel;
      initLocationByZip(userPreferredLocation);
    }
    setTimeout(() => {
      isImporting.value = false;
      activityInfo.value.district = twDistrictName.value;
    }, 500);
  });

  watch([twCity, twDistrict], () => {
    activityInfo.value.city = twCity.value;
    if (isImporting.value) return;
    activityInfo.value.district = twDistrictName.value;
    activityInfo.value.venueName = "";
    activityInfo.value.address = "";
    activityInfo.value.venueFacilities = [];
  });

  watch(
    () => activityInfo.value.venueName,
    () => {
      if (isImporting.value) return;
      if (activityInfo.value.venueName === "") {
        activityInfo.value.address = "";
        activityInfo.value.venueFacilities = [];
      }
    }
  );

  watch(
    () => activityInfo.value.date,
    () => {
      if (isImporting.value) return;
      activityInfo.value.startTime = "";
      activityInfo.value.endTime = "";
    }
  );
</script>

<template>
  <el-form
    ref="activityInfoFormRef"
    label-position="top"
    label-width="auto"
    class="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-6 gap-6"
    :model="activityInfo"
    :rules="activityInfoFormRules"
  >
    <el-form-item
      label="活動名稱"
      prop="name"
      class="lg:col-span-6"
      required
    >
      <el-input
        v-model="activityInfo.name"
        size="large"
        placeholder="請輸入活動名稱"
        :disabled="isDisableEditColumn"
      />
    </el-form-item>
    <el-form-item
      label="活動圖片"
      prop=""
      class="lg:col-span-6"
    >
      <ElUploadImage
        :pictures="activityInfo.pictures"
        :limit="5"
        @on-change="handleChange"
        @emit-el-upload-ref="handleElUploadRef"
      />
    </el-form-item>
    <el-form-item
      label="活動日期"
      prop="date"
      class="lg:col-span-2"
      required
    >
      <el-date-picker
        v-model="activityInfo.date"
        size="large"
        class="w-full"
        type="date"
        placeholder="請選擇日期"
        value-format="YYYY-MM-DD"
        :disabled-date="(date: string) => isPastDate(date)"
        :disabled="isDisableEditColumn"
      />
    </el-form-item>
    <el-form-item
      label="開始時間"
      prop="startTime"
      class="lg:col-span-2"
      required
    >
      <el-time-select
        v-model="activityInfo.startTime"
        size="large"
        :start="canUseTimeSlot"
        step="01:00"
        end="23:00"
        placeholder="請選擇開始時間"
        prefix-icon=""
        :max-time="activityInfo.endTime"
        :disabled="isDisableEditColumn"
      />
    </el-form-item>
    <el-form-item
      label="結束時間"
      prop="endTime"
      class="lg:col-span-2"
      required
    >
      <el-time-select
        v-model="activityInfo.endTime"
        size="large"
        :start="canUseTimeSlot"
        step="01:00"
        end="23:00"
        placeholder="請選擇結束時間"
        prefix-icon=""
        :min-time="activityInfo.startTime"
        :disabled="isDisableEditColumn"
      />
    </el-form-item>
    <el-form-item
      label="活動名額"
      prop="participantCount"
      class="lg:col-span-6"
      required
    >
      <el-input
        v-model="activityInfo.participantCount"
        size="large"
        type="number"
        placeholder="請輸入活動名額"
        min="1"
        @input="
          activityInfo.participantCount = Number(activityInfo.participantCount)
        "
      >
        <template #suffix>
          <span>人</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item
      label="租用場地"
      prop="rentalLot"
      class="lg:col-span-6"
      required
    >
      <el-input
        v-model="activityInfo.rentalLot"
        size="large"
        type="number"
        placeholder="請輸入租用場地"
        min="1"
        @input="activityInfo.rentalLot = Number(activityInfo.rentalLot)"
      >
        <template #suffix>
          <span>面</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item
      label="使用球種"
      class="lg:col-span-6"
      prop="ballType"
      required
    >
      <el-autocomplete
        v-model="activityInfo.ballType"
        :fetch-suggestions="queryBallTypesSearch"
        clearable
        size="large"
        placeholder="請輸入使用球種"
      />
    </el-form-item>
    <el-form-item
      label="活動點數"
      prop="points"
      class="lg:col-span-6"
      required
    >
      <el-input
        v-model="activityInfo.points"
        size="large"
        type="number"
        placeholder="請輸入活動點數"
        min="0"
        :disabled="isDisableEditColumn"
        @input="activityInfo.points = Number(activityInfo.points)"
      >
        <template #suffix>
          <span>點/人</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item
      label="活動程度 ( 最多兩項 )"
      prop="level"
      class="lg:col-span-6"
      required
    >
      <el-checkbox-group
        v-model="activityInfo.level"
        :min="0"
        :max="2"
        size="large"
      >
        <el-checkbox
          v-for="levelOption in shuttlerLevelOptions"
          :key="levelOption.value"
          :label="levelOption.label"
          :value="levelOption.value"
        />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item
      label="活動簡介"
      prop="brief"
      class="lg:col-span-6"
    >
      <el-input
        v-model="activityInfo.brief"
        type="textarea"
        size="large"
        maxlength="200"
        placeholder="請輸入活動簡介，例如活動內容、注意事項等"
        :autosize="{ minRows: 3, maxRows: 5 }"
      />
    </el-form-item>
    <el-form-item
      label="縣市"
      prop=""
      class="lg:col-span-3"
      required
    >
      <el-select
        v-model="twCity"
        placeholder="請選擇縣市"
        size="large"
        :disabled="isDisableEditColumn"
      >
        <el-option
          v-for="item in twCitiesOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="區域"
      prop=""
      class="lg:col-span-3"
      required
    >
      <el-select
        v-model="twDistrict"
        placeholder="請選擇區域"
        size="large"
        :disabled="isDisableEditColumn"
      >
        <el-option
          v-for="item in twDistrictsOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="場館名稱"
      prop="venueName"
      class="lg:col-span-6"
      required
    >
      <el-autocomplete
        v-model="activityInfo.venueName"
        :fetch-suggestions="
          (queryVenueName, cb) =>
            queryVenuesSearch(queryVenueName, cb, twDistrict)
        "
        clearable
        size="large"
        placeholder="請輸入場館名稱"
        :disabled="isDisableEditColumn"
        @select="handleVenueSelect"
      >
        <template #default="{ item }">
          <span class="block">{{ item.value }}</span>
          <span class="text-gray-400 mb-3">{{ item.address }}</span>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item
      label="場館地址"
      class="lg:col-span-6"
      prop="address"
      required
    >
      <el-input
        v-model="activityInfo.address"
        clearable
        size="large"
        placeholder="請輸入場館地址"
        :disabled="isDisableEditColumn"
      />
    </el-form-item>
    <el-form-item
      label="場館設施 ( 至少一項 )"
      prop="venueFacilities"
      class="lg:col-span-6"
      required
    >
      <el-checkbox-group
        v-model="activityInfo.venueFacilities"
        size="large"
        :disabled="isDisableEditColumn"
      >
        <el-checkbox
          v-for="facility in availableVenueFacilities"
          :key="facility"
          :label="facility"
          :value="facility"
        />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item
      label="主辦單位"
      class="lg:col-span-6"
      prop="organizer"
      required
    >
      <el-input
        v-model="activityInfo.organizer"
        size="large"
        placeholder="請輸入主辦單位名稱/個人名稱"
        :disabled="isDisableEditColumn"
      />
    </el-form-item>
    <el-form-item
      label="聯絡人姓名"
      class="lg:col-span-6"
      prop="contactName"
      required
    >
      <el-input
        v-model="activityInfo.contactName"
        size="large"
        placeholder="請輸入聯絡人姓名"
      />
    </el-form-item>
    <el-form-item
      label="聯絡人電話"
      class="lg:col-span-6"
      prop="contactPhone"
      required
    >
      <el-input
        v-model="activityInfo.contactPhone"
        type="tel"
        size="large"
        placeholder="請輸入聯絡人電話"
      />
    </el-form-item>
    <el-form-item
      label="聯絡人 Line"
      class="lg:col-span-6"
    >
      <el-input
        v-model="activityInfo.contactLine"
        type="tel"
        size="large"
        placeholder="請輸入聯絡人 Line"
      />
    </el-form-item>
    <el-form-item class="lg:col-span-6">
      <template
        v-if="
          activityEditInfo?.activityId &&
          activityEditInfo?.status === 'published'
        "
      >
        <div class="flex w-full">
          <el-button
            type="primary"
            size="large"
            class="px-10 mx-auto"
            round
            @click="submitForm(activityInfoFormRef, 'update')"
          >
            更新
          </el-button>
        </div>
      </template>
      <template v-else>
        <div class="flex w-full">
          <el-button
            size="large"
            class="w-full text-md text-neutral-400 border border-neutral-400 mr-3 hover:bg-neutral-50"
            round
            @click="submitForm(activityInfoFormRef, 'draft')"
          >
            儲存
          </el-button>
          <el-button
            type="primary"
            size="large"
            class="w-full text-md"
            round
            @click="submitForm(activityInfoFormRef, 'published')"
          >
            發佈
          </el-button>
        </div>
      </template>
    </el-form-item>
  </el-form>
</template>
