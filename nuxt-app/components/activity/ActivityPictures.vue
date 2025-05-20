<script lang="ts" setup>
  const props = defineProps({
    pictures: {
      type: Array as () => string[],
      required: true
    }
  });
  const pictures = computed(() => props.pictures);

  const getGridStyleByImageCount = computed(() => {
    const length = pictures.value.length;
    switch (length) {
      case 5:
        return "grid-cols-2";
      case 4:
        return "grid-flow-col grid-rows-2";
      case 3:
        return "grid-cols-2";
      case 2:
        return "grid-cols-1";
      default:
        return "";
    }
  });
  const getGridItemStyleByImageCount = (index: number) => {
    const length = pictures.value.length;
    if (length === 4 && index === 0) {
      return "row-span-2";
    } else if (length === 4 && index >= 0) {
      return "col-span-2";
    }
    return "";
  };
</script>

<template>
  <div
    v-if="pictures.length === 1"
    class="grid grid-col-1 lg:grid-cols-5 gap-3 lg:gap-6"
  >
    <el-image
      :src="pictures[0]"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="pictures"
      :initial-index="0"
      lazy
      show-progress
      fit="cover"
      class="max-h-[236px] lg:max-h-[428px] lg:col-span-3 lg:col-start-2"
    />
  </div>
  <div
    v-else
    class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6"
  >
    <el-image
      :src="pictures[0]"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="pictures"
      :initial-index="0"
      lazy
      show-progress
      fit="cover"
      class="max-h-[236px] lg:max-h-[428px]"
    />
    <div
      class="grid gap-3 lg:gap-6 max-h-[236px] lg:max-h-[428px]"
      :class="`${getGridStyleByImageCount}`"
    >
      <el-image
        v-for="(pictureUrl, index) in pictures.slice(1, 5)"
        :key="pictureUrl"
        :src="pictureUrl"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="pictures"
        :initial-index="index + 1"
        :class="`${getGridItemStyleByImageCount(index)}`"
        lazy
        show-progress
        fit="cover"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
  :deep(.el-image) img.el-image__inner.el-image__preview {
    border-radius: var(--radius-2xl);
  }
</style>
