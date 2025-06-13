<script setup lang="ts">
  import { emailSignUp, nuxtEmailLogin } from "@/apis/auth";
  import { ElMessage } from "element-plus";
  import { useAuthStore } from "@/stores/auth";
  import { Message, Lock, User } from "@element-plus/icons-vue";

  const { visible } = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
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
        type: "error",
      });
      return;
    }
    if (isSignUp.value && !form.value.name) {
      ElMessage({
        message: "請填寫暱稱",
        type: "error",
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
    const { error } = await emailSignUp({
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
    });
    if (!error.value) {
      ElMessage({
        message: "您已成功註冊，請重新登入",
        type: "success",
      });
      navigateTo("/");
      emit("update:visible", false);
      isSignUp.value = false;
    }
  };

  const handleEmailLogin = async () => {
    const { data, error } = await nuxtEmailLogin({
      email: form.value.email,
      password: form.value.password,
    });
    if (error.value) {
      ElMessage({
        message: error.value?.data.message,
        type: "error",
      });
      return;
    }
    if (data.value?.token) {
      await refreshSession();
      ElMessage({
        message: `歡迎 ${user.value?.name}`,
        type: "success",
      });
      authStore.setToken(data.value?.token);
      emit("update:visible", false);
    }
  };
</script>

<template>
  <el-dialog
    :model-value="visible"
    width="400"
    center
    :show-close="false"
    class="py-5 lg:py-8 border-t-10 border-primary-accent-500"
    :z-index="1000"
    @update:model-value="emit('update:visible', $event)"
  >
    <template #header>
      <div class="text-2xl font-bold">{{ isSignUp ? "註冊" : "登入" }} 羽神同行</div>
    </template>
    <div class="text-center text-secondary-300 mb-5">
      尋找你心目中的羽球活動
    </div>
    <div v-if="!isSignUp" class="flex flex-col items-center">
      <el-form label-position="top" label-width="auto" style="width: 70%">
        <el-form-item label="帳號" required>
          <el-input
            v-model="form.email"
            type="email"
            size="large"
            :prefix-icon="Message"
            placeholder="請輸入電子郵件"
          />
        </el-form-item>
        <el-form-item label="密碼" required>
          <el-input
            v-model="form.password"
            type="password"
            size="large"
            :prefix-icon="Lock"
            placeholder="請輸入密碼"
          />
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="flex flex-col items-center">
      <el-form label-position="top" label-width="auto" style="width: 70%">
        <el-form-item label="帳號" required>
          <el-input
            v-model="form.email"
            type="email"
            size="large"
            :prefix-icon="Message"
            placeholder="請輸入電子郵件"
          />
        </el-form-item>
        <el-form-item label="密碼" required>
          <el-input
            v-model="form.password"
            type="password"
            size="large"
            :prefix-icon="Lock"
            placeholder="請輸入密碼"
          />
        </el-form-item>
        <el-form-item label="暱稱" required>
          <el-input v-model="form.name" size="large" :prefix-icon="User" placeholder="請輸入暱稱" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          size="large"
          class="w-[70%] mb-5 text-md" @click="handleSubmit"
        >
          {{ isSignUp ? "註冊" : "登入" }}
        </el-button>
      </div>
      <p
        class="text-sm cursor-pointer underline"
        @click="isSignUp = !isSignUp"
      >
        立即{{ isSignUp ? "登入" : "註冊" }}
      </p>
    </template>
  </el-dialog>
</template>
