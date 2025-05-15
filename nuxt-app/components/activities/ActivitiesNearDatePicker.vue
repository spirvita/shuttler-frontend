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
      class="text-2xl font-bold py-7 bg-gray-100 border-gray-200 rounded-r-none rounded-l-2xl hover:text-primary-accent-dark"
      :icon="ArrowLeft"
      @click="handleScrollValue(scrollLeftValue - 350)"
    />
    <el-scrollbar
      ref="elScrollbarRef"
      class="py-3 bg-gray-100 border-y border-gray-200"
      @scroll="getScrollValue"
    >
      <div class="flex">
        <el-button
          v-for="item in getDateOptions()"
          :key="item.value"
          class="mx-1.5 w-full rounded-3xl text-black border-0 bg-transparent hover:bg-primary-accent-dark"
        >
          {{ item.label }}
        </el-button>
      </div>
    </el-scrollbar>
    <el-button
      size="large"
      class="text-2xl font-bold py-7 bg-gray-100 border-gray-200 rounded-l-none rounded-r-2xl hover:text-primary-accent-dark"
      :icon="ArrowRight"
      @click="handleScrollValue(scrollLeftValue + 350)"
    />
  </div>
</template>
