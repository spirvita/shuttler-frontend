import { shuttlerLevels } from "@/constants/shuttlerLevels";

export function useShuttlerLevelOptions() {
  const shuttlerLevelOptions: { value: number; label: string }[] = [];
  for (const [key, value] of Object.entries(shuttlerLevels)) {
    shuttlerLevelOptions.push({
      value: Number(key),
      label: value
    });
  }
  return shuttlerLevelOptions;
}
