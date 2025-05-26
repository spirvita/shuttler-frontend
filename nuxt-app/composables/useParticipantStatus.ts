const participantStatus = {
  border: {
    danger: "border-danger-300",
    warning: "border-warning",
    success: "border-success-300"
  },
  bg: {
    success: "bg-success-300",
    warning: "bg-warning",
    danger: "bg-danger-300"
  }
};

export function useParticipantStatus(
  className: keyof typeof participantStatus,
  bookedCount: number,
  participantCount: number
) {
  if (bookedCount >= participantCount) {
    return participantStatus[className].danger;
  } else if (bookedCount >= participantCount / 2) {
    return participantStatus[className].warning;
  } else {
    return participantStatus[className].success;
  }
}
