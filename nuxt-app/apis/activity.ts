import type { ActivityDetail, CreateActivityPayload } from "@/types/activities";
import type { ActivityParticipant } from "@/types/memberCenter";

export const createActivity = (
  activityPayload: CreateActivityPayload,
  status: "draft" | "published"
) => {
  return useShuttlerTwAPI.post("/activity", {
    ...activityPayload,
    status
  });
};

export const updateActivity = (activityPayload: ActivityDetail) => {
  return useShuttlerTwAPI.put(
    `/organizer/activity/${activityPayload.activityId}`,
    activityPayload as unknown as Record<string, unknown>
  );
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

export const getActivityParticipants = (activityId: string) => {
  return useShuttlerTwAPI.get<{
    message: string;
    data: ActivityParticipant[];
  }>(`/organizer/activities/${activityId}`);
};

export const suspendActivity = (activityId: string) => {
  return useShuttlerTwAPI.post<{ message: string }>(
    `/organizer/activity/${activityId}/suspend`
  );
};
