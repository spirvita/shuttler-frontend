<script lang="ts" setup>
  import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";

  const props = defineProps<{
    disableDate: string;
  }>();
  const emits = defineEmits(["changeDate"]);
  const currentDate = ref("");
  const getDateOptions = computed(() => {
    const options = [
      {
        value: "",
        label: "全部"
      }
    ];
    const formatter = new Intl.DateTimeFormat("zh-TW", {
      month: "numeric",
      day: "numeric",
      weekday: "narrow"
    });
    for (let i = 0; i <= 14; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i);
      const formattedDate = formatter.format(newDate);
      const label = formattedDate.replace("（", "(").replace("）", ")");
      if (!isBeforeDisableDate(newDate.toISOString().split("T")[0])) {
        options.push({
          value: newDate.toISOString().split("T")[0],
          label: `${label}`
        });
      }
    }
    return options;
  });
  const setDate = (date: string) => {
    currentDate.value = date;
    emits("changeDate", date);
  };

  const elScrollbarRef = ref();
  const scrollLeftValue = ref(0);
  const getScrollValue = ({ scrollLeft }: { scrollLeft: number }) => {
    scrollLeftValue.value = scrollLeft;
  };
  const handleScrollValue = (value: number) => {
    if (elScrollbarRef.value) {
      elScrollbarRef.value.scrollTo({ left: value, behavior: "smooth" });
    }
  };
  const isBeforeDisableDate = (date: string): boolean => {
    if (date === "") return false;
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const disableDate = new Date(props.disableDate);
    disableDate.setHours(0, 0, 0, 0);

    return selectedDate < disableDate;
  };
  watch(
    () => props.disableDate,
    () => {
      setDate("");
    }
  );
</script>
<template>
  <div class="flex items-center">
    <el-button
      size="large"
      class="text-2xl font-bold py-7 bg-neutral-50 border-neutral-200 rounded-r-none rounded-l-2xl hover:text-primary-300"
      :icon="ArrowLeft"
      @click="handleScrollValue(scrollLeftValue - 350)"
    />
    <el-scrollbar
      ref="elScrollbarRef"
      class="py-3 border-y bg-neutral-50 border-neutral-200 flex-1"
      @scroll="getScrollValue"
    >
      <div class="flex">
        <el-button
          v-for="item in getDateOptions"
          :key="item.value"
          round
          class="mx-1.5 text-md border-0 active:bg-primary-400 active:text-white hover:bg-primary-accent-500 hover:text-black disabled:bg-transparent disabled:text-neutral-400"
          :class="
            currentDate === item.value
              ? 'bg-primary-accent-500 text-black'
              : 'bg-transparent'
          "
          @click="setDate(item.value)"
        >
          {{ item.label }}
        </el-button>
      </div>
    </el-scrollbar>
    <el-button
      size="large"
      class="text-2xl font-bold py-7 bg-neutral-50 border-neutral-200 rounded-l-none rounded-r-2xl hover:text-primary-300"
      :icon="ArrowRight"
      @click="handleScrollValue(scrollLeftValue + 350)"
    />
  </div>
</template>
