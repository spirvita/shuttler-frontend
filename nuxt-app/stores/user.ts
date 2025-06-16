import { defineStore } from "pinia";
import type { MemberInfo } from "@/types/memberCenter";
import { getUserInfo } from "@/apis/user";
const { loggedIn } = useUserSession();

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<MemberInfo>();
  async function fetchUserInfo() {

    if (!loggedIn.value) return;
    setTimeout(async() => {
      const { data } = await getUserInfo();
      userInfo.value = JSON.parse(JSON.stringify(data.value?.data));
    }, 300);
  }
  async function setUserInfo(data: MemberInfo) {
    userInfo.value = data ? JSON.parse(JSON.stringify(data)) : {};
  }
  return { userInfo, setUserInfo, fetchUserInfo };
});
