import type { PointsPlan, PointsPurchaseInfo } from "@/types/points";

export const getPointsPlan = () => {
  return useShuttlerTwAPI.get<{ message: string; data: PointsPlan[] }>(
    "/points"
  );
};

export const getPointsPurchaseInfo = (points: number) => {
  return useShuttlerTwAPI.post<{
    message: string;
    data: PointsPurchaseInfo;
  }>("/points/purchase", { pointsPlan: { points, value: points } });
};
