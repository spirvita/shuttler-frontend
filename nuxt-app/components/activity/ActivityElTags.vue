<script setup lang="ts">
  import { getElementPlusTypeByLevel } from "@/constants/shuttlerLevels";

  const props = defineProps({
    level: {
      type: Array as PropType<string[] | number[]>,
      required: true
    }
  });
</script>

<template>
  <ul class="flex items-center">
    <li
      v-for="item in props.level"
      :key="item"
      class="mr-2"
      round
    >
      <el-tag
        round
        size="large"
        class="p-4 border-0 text-base"
        :type="getElementPlusTypeByLevel(item as string)"
      >
        {{ item }}
      </el-tag>
    </li>
  </ul>
</template>
