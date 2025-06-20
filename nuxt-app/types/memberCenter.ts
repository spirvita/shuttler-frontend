export interface MemberInfo {
  name: string;
  avatar: string;
  email: string;
  registerDate: string;
  level: number;
  attendCount: number;
  totalPoint: number;
  preferredLocation: string[];
  organization: string;
  phone: string;
}

export interface ActivityParticipant {
  memberId: string;
  name: string;
  email: string;
  registrationDate: string;
  cancellationDate?: string;
  registrationCount: number;
  registrationPoints: number;
  refundPoints: number;
  status: "已報名" | "已取消";
}
