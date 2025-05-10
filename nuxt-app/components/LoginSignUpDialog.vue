<script setup lang="ts">
import { emailSignUp, nuxtEmailLogin } from "@/apis/auth";
import { ElMessage } from "element-plus";
import { useAuthStore } from "~/stores/auth";
import { useUserStore } from "@/stores/user";

const { visible } = defineProps({
  visible: {
    type: Boolean,
    default: false,
  }
});

const isSignUp = ref(false);

const form = ref({
  email: "",
  password: "",
  name: "",
});

const emit = defineEmits<{
  "update:visible": [value: boolean];
}>();

const authStore = useAuthStore();
const { user, fetch: refreshSession } = useUserSession();

const handleSubmit = async () => {
  if (!form.value.email || !form.value.password) {
    ElMessage({
      message: "請填寫帳號和密碼",
      type: "warning",
    });
    return;
  }
  if (isSignUp.value && !form.value.name) {
    ElMessage({
      message: "請填寫暱稱",
      type: "warning",
    });
    return;
  }
  if (isSignUp.value) {
    await handleEmailSignUp();
  } else {
    await handleEmailLogin();
  }
  form.value = {
    email: "",
    password: "",
    name: "",
  };
};

const handleEmailSignUp = async () => {
  await emailSignUp({
    email: form.value.email,
    password: form.value.password,
    name: form.value.name,
  });
  ElMessage({
    message: "您已成功註冊，請重新登入",
    type: "success",
  });
  navigateTo("/");
  emit("update:visible", false);
};

const handleEmailLogin = async () => {
  const { token } = await nuxtEmailLogin({
    email: form.value.email,
    password: form.value.password,
  });
  await refreshSession();
  if (token) {
    ElMessage({
      message: `歡迎 ${user.value?.name}`,
      type: "success",
    });
    authStore.setToken(token);
    emit("update:visible", false);
  }
};
</script>

<template>
  <el-dialog
    :model-value="visible"
    title="加入 羽神同行"
    width="500"
    center
    :show-close="false"
    @update:model-value="emit('update:visible', $event)"
  >
    <div class="text-center">尋找你心目中的羽球活動</div>

    <div v-if="!isSignUp" class="flex flex-col items-center mt-5">
      <el-form label-position="top" label-width="auto" style="width: 60%">
        <el-form-item label="帳號">
          <el-input type="email" v-model="form.email" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
      </el-form>

      <div class="mt-5 text-blue-500 cursor-pointer underline" @click="isSignUp = true">立即註冊</div>
    </div>

    <div v-else class="flex flex-col items-center mt-5">
      <el-form label-position="top" label-width="auto" style="width: 60%">
        <el-form-item label="帳號">
          <el-input type="email" v-model="form.email" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="暱稱">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>

      <div class="mt-5 text-blue-500 cursor-pointer underline" @click="isSignUp = false">立即登入</div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          class="text-black w-[150px]"
          @click="handleSubmit"
        >
          {{ isSignUp ? "註冊" : "登入" }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
