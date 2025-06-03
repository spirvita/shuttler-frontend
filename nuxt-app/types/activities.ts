export interface Activity {
  activityId: string;
  name: string;
  contactAvatar: string;
  venueName: string;
  date: string;
  startTime: string;
  endTime: string;
  level: string[];
  participantCount: number;
  bookedCount: number;
  points: number;
}

export interface ActivityDetail extends Activity {
  organizer: string;
  pictures: string[];
  city: string;
  district: string;
  address: string;
  venueFacilities: string[];
  ballType: string;
  rentalLot: number;
  brief: string;
  contactName: string;
  contactPhone: string;
  contactLine: string;
  isFavorite: boolean;
  status: string;
}

export type CreateActivityPayload = Omit<
  ActivityDetail,
  "activityId" | "isFavorite" | "contactAvatar" | "bookedCount"
>;
