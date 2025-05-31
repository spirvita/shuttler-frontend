import type { Activity } from "@/types/activities";

export const getActivities = () => {
  return useShuttlerTwAPI.get<{ message: string; data: Activity[] }>(
    "/activities"
  );
};

export const getOrganizerActivities = () => {
  return useShuttlerTwAPI.get<{ message: string; data: Activity[] }>(
    "/organizer/activities"
  );
};
