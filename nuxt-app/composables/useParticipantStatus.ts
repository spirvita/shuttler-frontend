const participantStatus = {
  border: {
    danger: "border-danger-light",
    warning: "border-warning",
    success: "border-success-light"
  },
  bg: {
    success: "bg-success-light",
    warning: "bg-warning",
    danger: "bg-danger-light"
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
