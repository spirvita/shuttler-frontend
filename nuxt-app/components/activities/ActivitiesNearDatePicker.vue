<script lang="ts" setup>
  import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";

  const getDateOptions = () => {
    const options = [];
    const formatter = new Intl.DateTimeFormat("zh-TW", {
      month: "numeric",
      day: "numeric",
      weekday: "narrow"
    });
    for (let i = 0; i < 30; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i);
      const formattedDate = formatter.format(newDate);
      const label = formattedDate.replace("（", "(").replace("）", ")");
      options.push({
        value: newDate.toISOString().split("T")[0],
        label: `${label}`
      });
    }
    return options;
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
      class="py-3 border-y bg-neutral-50 border-neutral-200"
      @scroll="getScrollValue"
    >
      <div class="flex">
        <el-button
          v-for="item in getDateOptions()"
          :key="item.value"
          class="mx-1.5 rounded-3xl text-md text-black border-0 bg-transparent hover:bg-primary-accent-500"
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
