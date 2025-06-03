import type { ActivityDetail, CreateActivityPayload } from "@/types/activities";

export const createActivity = (
  activityPayload: CreateActivityPayload,
  status: "draft" | "published"
) => {
  return useShuttlerTwAPI.post("/activity", {
    ...activityPayload,
    status
  });
};

export const getActivity = (activityId: string) => {
  return useShuttlerTwAPI.get<{ message: string; data: ActivityDetail }>(
    `/activities/${activityId}`
  );
};

export const addActivityToFavorites = (activityId: string) => {
  return useShuttlerTwAPI.post<{ message: string }>("/activity/favorites", {
    activityId
  });
};

export const removeActivityFromFavorites = (activityId: string) => {
  return useShuttlerTwAPI.delete<{ message: string }>(
    `/activity/favorites/${activityId}`
  );
};

export const registerActivity = ({
  activityId,
  participantCount
}: {
  activityId: string;
  participantCount: number;
}) => {
  return useShuttlerTwAPI.post<{ message: string }>("/activity/registration", {
    activityId,
    participantCount
  });
};

export const cancelActivity = (activityId: string) => {
  return useShuttlerTwAPI.delete<{ message: string }>(
    `/activity/registration/${activityId}`
  );
};

export const suspendActivity = (activityId: string) => {
  return useShuttlerTwAPI.post<{ message: string }>(
    `/organizer/activity/${activityId}/suspend`
  );
};
