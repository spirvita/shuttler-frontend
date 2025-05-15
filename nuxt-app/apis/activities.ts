import type { Activity } from "@/types/activities";

export const getActivities = () => {
  return useShuttlerTwAPI.get<{ message: string; data: Activity[] }>(
    "/activities"
  );
};
