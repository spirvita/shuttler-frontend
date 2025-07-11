export interface Activity {
  activityId: string;
  name: string;
  contactAvatar: string;
  venueName: string;
  date: string;
  startTime: string;
  endTime: string;
  level: string[] | number[];
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
  registeredCount: number;
  organizerStats: {
    totalHosted: number;
    ongoingHosted: number;
  };
}

export type CreateActivityPayload = Omit<
  ActivityDetail,
  | "activityId"
  | "isFavorite"
  | "contactAvatar"
  | "bookedCount"
  | "registeredCount"
  | "organizerStats"
>;

export interface ActivityFilter {
  venueName: string;
  city?: string;
  zipCode?: string;
  spotsLeft: string;
  level: string;
  date: string;
  timeSlot: string;
  points: number;
}

export interface PopularActivity {
  activityId: string;
  name: string;
  picture: string;
  city: string;
  level: string[];
  participantCount: number;
  bookedCount: number;
  points: number;
}

export interface UpcomingActivity {
  activityId: string;
  name: string;
  picture: string;
  date: string;
  startTime: string;
  endTime: string;
  city: string;
  level: string[];
  participantCount: number;
  bookedCount: number;
  points: number;
}
