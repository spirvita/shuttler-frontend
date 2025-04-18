<script setup lang="ts">
  import { testGetData, testLogin } from "~/apis/auth";

  const countStore = useCountStore();
  const { loggedIn, user, clear, fetch: refreshSession } = useUserSession();
  const userLoginData = ref({
    email: "777@gmail.com",
    password: "123456"
  });
  const { data: testData } = await testGetData();
  const userLogin = async () => {
    await testLogin(userLoginData.value);
    await refreshSession();
  };
</script>

<template>
  <div class="text-center">
    <h1 class="text-2xl mb-5">Index Page</h1>
    <h2 class="text-xl mb-5">{{ testData?.message }}</h2>
    <p>Count: {{ countStore.count }}</p>
    <div class="mb-5">
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
    <ElForm
      :inline="true"
      @submit.prevent="userLogin"
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
    </ElForm>
    <div>
      <div v-if="loggedIn">
        <h2>Welcome {{ user?.name }}</h2>
      </div>
      <h2 v-else>Logged Out</h2>
      <ElButton
        type="info"
        @click="userLogin"
      >
        Login
      </ElButton>
      <ElButton
        type="danger"
        @click="clear"
      >
        Logout
      </ElButton>
    </div>
  </div>
</template>

<style scoped></style>
