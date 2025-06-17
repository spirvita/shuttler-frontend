import { defineStore } from "pinia";
import type { MemberInfo } from "@/types/memberCenter";
import { getUserInfo } from "@/apis/user";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<MemberInfo>();
  async function fetchUserInfo() {
    const cookie = useCookie("userInfo");
    if (cookie.value) {
      const { data } = await getUserInfo();
      userInfo.value = JSON.parse(JSON.stringify(data.value?.data));
    }
  }
  async function setUserInfo(data: MemberInfo) {
    userInfo.value = data ? JSON.parse(JSON.stringify(data)) : {};
  }
  return { userInfo, setUserInfo, fetchUserInfo };
});
