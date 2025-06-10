<script setup lang="ts">
  import { emailSignUp, nuxtEmailLogin } from "@/apis/auth";
  import { ElMessage } from "element-plus";
  import { useAuthStore } from "~/stores/auth";

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
    title="加入 羽神同行"
    width="500"
    center
    :show-close="false"
    @update:model-value="emit('update:visible', $event)"
  >
    <template #title>
      <div class="text-2xl">加入 羽神同行</div>
    </template>
    <div class="text-center text-sm text-neutral-800">
      尋找你心目中的羽球活動
    </div>

    <div v-if="!isSignUp" class="flex flex-col items-center mt-5">
      <el-form label-position="top" label-width="auto" style="width: 60%">
        <el-form-item label="帳號">
          <el-input
            v-model="form.email"
            type="email"
            placeholder="請輸入帳號"
          />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="請輸入密碼"
          />
        </el-form-item>
      </el-form>

      <div
        class="mt-5 text-secondary-800 cursor-pointer underline"
        @click="isSignUp = true"
      >
        立即註冊
      </div>
    </div>

    <div v-else class="flex flex-col items-center mt-5">
      <el-form label-position="top" label-width="auto" style="width: 60%">
        <el-form-item label="帳號">
          <el-input
            v-model="form.email"
            type="email"
            placeholder="請輸入帳號"
          />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="請輸入密碼"
          />
        </el-form-item>
        <el-form-item label="暱稱">
          <el-input v-model="form.name" placeholder="請輸入暱稱" />
        </el-form-item>
      </el-form>

      <div
        class="mt-5 text-secondary-800 cursor-pointer underline"
        @click="isSignUp = false"
      >
        立即登入
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" class="w-[150px]" @click="handleSubmit">
          {{ isSignUp ? "註冊" : "登入" }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
