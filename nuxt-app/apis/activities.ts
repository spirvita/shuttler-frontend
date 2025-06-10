import type { Activity } from "@/types/activities";

export const getActivities = (queryString?: string) => {
  return useShuttlerTwAPI.get<{ message: string; data: Activity[] }>(
    `/activities?${queryString}`
  );
};

export const getOrganizerActivities = () => {
  return useShuttlerTwAPI.get<{ message: string; data: Activity[] }>(
    "/organizer/activities"
  );
};

export const getUpcomingActivities = () => {

  return useShuttlerTwAPI.get<{ message: string; data: Activity[] }>(
    "/activity/upcoming"
  );
};

export const getPopularActivities = () => {
  return useShuttlerTwAPI.get<{ message: string; data: Activity[] }>(
    "/activity/popular"
  );
};
