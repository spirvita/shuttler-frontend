<script setup lang="ts">
  import { getElementPlusTypeByLevel } from "@/constants/shuttlerLevels";

  const props = defineProps({
    level: {
      type: Array as PropType<string[]>,
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
        effect="light"
        class="py-4 border-0"
        :type="getElementPlusTypeByLevel(item)"
      >
        {{ item }}
      </el-tag>
    </li>
  </ul>
</template>
