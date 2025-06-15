import type { Activity, PopularActivity, UpcomingActivity } from "@/types/activities";

export const getActivities = (queryString?: string) => {
  return useShuttlerTwAPI.get<{ message: string; data: Activity[] }>(
    `/activities?${queryString}`
  );
};

export const getUserActivities = () => {
  return useShuttlerTwAPI.get<{ message: string; data: Activity[] }>(
    "/user/activities"
  );
};

export const getOrganizerActivities = () => {
  return useShuttlerTwAPI.get<{ message: string; data: Activity[] }>(
    "/organizer/activities"
  );
};

export const getUpcomingActivities = () => {
  return useShuttlerTwAPI.get<{ message: string; data: UpcomingActivity[] }>(
    "/activity/upcoming"
  );
};

export const getPopularActivities = () => {
  return useShuttlerTwAPI.get<{ message: string; data: PopularActivity[] }>(
    "/activity/popular"
  );
};
