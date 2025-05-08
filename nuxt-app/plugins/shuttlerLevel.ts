import { shuttlerLevels } from "@/constants/shuttlerLevels";
export default defineNuxtPlugin(() => {
  return {
    provide: {
      getShuttlerLevelName: (level: number) => shuttlerLevels[level]
    }
  };
});
