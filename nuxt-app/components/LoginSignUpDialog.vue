<script setup lang="ts">
  import { emailSignUp, nuxtEmailLogin, forgotPassword } from "@/apis/auth";
  import { ElMessage, ElLoading } from "element-plus";
  import { useAuthStore } from "@/stores/auth";
  import { Message, Lock, User } from "@element-plus/icons-vue";
  import GoogleSVG from "@/assets/images/google.svg";

  const { visible } = defineProps({
    visible: {
      type: Boolean,
      default: false
    }
  });

  watch(() => visible, (newValue) => {
    if (!newValue) {
      isSignUp.value = false;
      forgotPasswordDialogVisible.value = false;
      form.value = {
        email: "",
        password: "",
        name: ""
      };
    }
  });

  const isSignUp = ref(false);
  const forgotPasswordDialogVisible = ref(false);
  const form = ref({
    email: "",
    password: "",
    name: ""
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
        type: "error"
      });
      return;
    }
    if (isSignUp.value && !form.value.name) {
      ElMessage({
        message: "請填寫暱稱",
        type: "error"
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
      name: ""
    };
  };

  const handleEmailSignUp = async () => {
    const { error } = await emailSignUp({
      email: form.value.email,
      password: form.value.password,
      name: form.value.name
    });
    if (!error.value) {
      ElMessage({
        message: "您已成功註冊，請重新登入",
        type: "success"
      });
      navigateTo("/");
      emit("update:visible", false);
      isSignUp.value = false;
    }
  };

  const handleEmailLogin = async () => {
    const { data, error } = await nuxtEmailLogin({
      email: form.value.email,
      password: form.value.password
    });
    if (error.value) {
      ElMessage({
        message: error.value?.data.message,
        type: "error"
      });
      return;
    }
    if (data.value?.token) {
      await refreshSession();
      ElMessage({
        message: `歡迎 ${user.value?.name}`,
        type: "success"
      });
      authStore.setToken(data.value?.token);
      emit("update:visible", false);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.value.email) {
      ElMessage({
        message: "請填寫電子郵件",
        type: "error"
      });
      return;
    }
    const loading = ElLoading.service({
      lock: true,
      text: "正在發送重設密碼郵件...",
      background: "rgba(0, 0, 0, 0.7)"
    });
    const { error } = await forgotPassword(form.value.email);
    if (!error.value) {
      loading.close();
      ElMessage({
        message: "重設密碼郵件已發送，請檢查您的電子郵件",
        type: "success"
      });
      forgotPasswordDialogVisible.value = false;
      emit("update:visible", false);
      isSignUp.value = false;
      form.value.email = "";
      form.value.password = "";
      form.value.name = "";
    }
  };
  const handleForgotPwDialog = () => {
    forgotPasswordDialogVisible.value = true;
  };
</script>

<template>
  <el-dialog
    :model-value="visible"
    width="375"
    center
    :show-close="false"
    class="py-5 lg:py-8 border-t-10 border-primary-accent-500"
    :z-index="1000"
    @update:model-value="emit('update:visible', $event)"
  >
    <template #header>
      <div class="text-2xl font-bold">
        {{ isSignUp ? "註冊" : "登入" }} 羽神同行
      </div>
    </template>
    <div class="text-center text-secondary-300 mb-5">
      尋找你心目中的羽球活動
    </div>
    <div
      v-if="!isSignUp && !forgotPasswordDialogVisible"
      class="flex flex-col items-center"
    >
      <el-form
        label-position="top"
        label-width="auto"
        style="width: 70%"
      >
        <el-form-item
          label="帳號"
          required
        >
          <el-input
            v-model="form.email"
            type="email"
            size="large"
            :prefix-icon="Message"
            placeholder="請輸入電子郵件"
          />
        </el-form-item>
        <el-form-item
          label="密碼"
          required
        >
          <el-input
            v-model="form.password"
            type="password"
            size="large"
            :prefix-icon="Lock"
            placeholder="請輸入密碼"
          />
          <div class="flex justify-end w-full">
            <span
              class="cursor-pointer underline text-neutral-500"
              @click="handleForgotPwDialog"
            >
              忘記密碼?
            </span>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div
      v-else-if="isSignUp && !forgotPasswordDialogVisible"
      class="flex flex-col items-center"
    >
      <el-form
        label-position="top"
        label-width="auto"
        style="width: 70%"
      >
        <el-form-item
          label="帳號"
          required
        >
          <el-input
            v-model="form.email"
            type="email"
            size="large"
            :prefix-icon="Message"
            placeholder="請輸入電子郵件"
          />
        </el-form-item>
        <el-form-item
          label="密碼"
          required
        >
          <el-input
            v-model="form.password"
            type="password"
            size="large"
            :prefix-icon="Lock"
            placeholder="請輸入密碼"
          />
        </el-form-item>
        <el-form-item
          label="暱稱"
          required
        >
          <el-input
            v-model="form.name"
            size="large"
            :prefix-icon="User"
            placeholder="請輸入暱稱"
          />
        </el-form-item>
      </el-form>
    </div>
    <div
      v-if="forgotPasswordDialogVisible"
      class="flex flex-col items-center"
    >
      <el-form
        label-position="top"
        label-width="auto"
        style="width: 70%"
      >
        <el-form-item
          label="帳號"
          required
        >
          <el-input
            v-model="form.email"
            type="email"
            size="large"
            :prefix-icon="Message"
            placeholder="請輸入電子郵件"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div
        v-if="!forgotPasswordDialogVisible"
        class="flex flex-col items-center w-[70%] gap-5 mx-auto"
      >
        <el-button
          type="primary"
          size="large"
          class="w-full text-md"
          @click="handleSubmit"
        >
          {{ isSignUp ? "註冊" : "登入" }}
        </el-button>
        <el-button
          size="large"
          class="w-full text-md text-neutral-800 bg-white hover:border-neutral-800 m-0"
        >
          <a
            href="https://dev-api.spirvita.tw/api/v1/auth/google"
            class="flex items-center px-14 py-2"
          >
            <img
              :src="GoogleSVG"
              alt="Google Logo"
              class="w-5 h-5 mr-5 rounded-full"
            />
            使用 Google 繼續
          </a>
        </el-button>
        <p
          class="text-sm cursor-pointer underline"
          @click="isSignUp = !isSignUp"
        >
          立即{{ isSignUp ? "登入" : "註冊" }}
        </p>
      </div>
      <div
        v-else
        class="flex flex-col items-center w-[70%] gap-5 mx-auto"
      >
        <el-button
          type="primary"
          size="large"
          class="w-full text-md"
          @click="handleForgotPassword"
        >
          重設密碼
        </el-button>
        <p
          class="text-sm cursor-pointer underline"
          @click="forgotPasswordDialogVisible = false"
        >
          返回登入
        </p>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped>
  .el-form-item {
    margin-bottom: 0.75rem;
  }
</style>
