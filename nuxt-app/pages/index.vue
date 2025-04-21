<script setup lang="ts">
  import { getTestData, testLogin } from "~/apis/auth";
  import { ElMessage } from "element-plus";

  const { data: testData, refresh } = await getTestData();
  const countStore = useCountStore();
  const { loggedIn, user, clear, fetch: refreshSession } = useUserSession();
  const userLoginData = ref({
    email: "777@gmail.com",
    password: "123456"
  });

  const reFreshGetTestData = async () => {
    await refresh();
    ElMessage({
      message: testData.value?.message,
      type: "success"
    });
  };
  const { refresh: reFrechLogin } = await testLogin(userLoginData.value);
  const userLogin = async () => {
    await reFrechLogin();
    await refreshSession();
    if (loggedIn.value) {
      ElMessage({
        message: `歡迎 ${user.value?.name}，您已成功登入 `,
        type: "success"
      });
    }
  };
</script>

<template>
  <div class="text-center">
    <h1 class="text-2xl mb-5">Index Page</h1>
    <div class="mb-5">
      <h2 class="text-xl mb-3">{{ testData?.message }}</h2>
      <ElButton
        type="info"
        @click="reFreshGetTestData"
      >
        Refresh Get Data
      </ElButton>
    </div>
    <ElDivider />
    <div class="mb-5">
      <p>Count: {{ countStore.count }}</p>
      <ElButton
        type="primary"
        class="text-black"
        @click="countStore.addCount"
      >
        Add Count
      </ElButton>
      <ElButton
        type="success"
        @click="countStore.subtractCount"
      >
        Subtract Count
      </ElButton>
      <ElButton
        type="danger"
        @click="countStore.resetCount"
      >
        Reset Count
      </ElButton>
    </div>
    <ElDivider />
    <ElForm
      v-model="userLoginData"
      :inline="true"
    >
      <ElFormItem label="Email">
        <ElInput
          v-model="userLoginData.email"
          placeholder="Email"
        />
      </ElFormItem>
      <ElFormItem label="Password">
        <ElInput
          v-model="userLoginData.password"
          type="password"
          placeholder="Password"
        />
      </ElFormItem>
      <ElFormItem>
        <ElButton
          v-if="!loggedIn"
          type="info"
          @click="userLogin"
        >
          Login
        </ElButton>
        <ElButton
          v-else
          type="danger"
          @click="clear"
        >
          Logout
        </ElButton>
      </ElFormItem>
    </ElForm>
    <div>
      <div v-if="loggedIn">
        <h2>Welcome {{ user?.name }}</h2>
      </div>
      <h2 v-else>Logged Out</h2>
    </div>
  </div>
</template>

<style scoped></style>
