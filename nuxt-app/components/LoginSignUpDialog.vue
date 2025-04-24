<script setup lang="ts">
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  isSignUp: {
    type: Boolean,
    default: false,
  },
});

const form = ref({
  email: "",
  password: "",
  displayName: "",
});

const emit = defineEmits<{
  "update:visible": [value: boolean];
}>();
</script>

<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="emit('update:visible', $event)"
    title="加入 羽神同行"
    width="500"
    center
    :show-close="false"
  >
    <div class="text-center">尋找你心目中的羽球活動</div>

    <div v-if="!isSignUp" class="flex flex-col items-center mt-5">
      <el-form label-position="top" label-width="auto" style="width: 60%">
        <el-form-item label="帳號">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="form.password" />
        </el-form-item>
      </el-form>
    </div>

    <div v-else class="flex flex-col items-center mt-5">
      <el-form label-position="top" label-width="auto" style="width: 60%">
        <el-form-item label="帳號">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="暱稱">
          <el-input v-model="form.displayName" />
        </el-form-item>
      </el-form>
    </div>
    
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          class="text-black w-[150px]"
          @click="emit('update:visible', false)"
        >
          {{ isSignUp ? "註冊" : "登入" }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
