import type { MemberInfo } from "@/types/memberCenter";

export const getUserInfo = () => {
  return useShuttlerTwAPI.get<{
    data: MemberInfo;
    message: string;
  }>("/user/profile", { watch: false });
};

export const updateUserInfo = (data: Partial<MemberInfo>) => {
  return useShuttlerTwAPI.put("/user/profile", data);
};

export const getUserPointsRecord = () => {
  return useShuttlerTwAPI.get<{
    message: string,
    data: {
      createdTime: string;
      recordType: string;
      points: string;
      activity?: {
        id: string;
        name: string;
      };
    }[]
  }>("/user/records");
};
