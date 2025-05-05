export default defineNuxtPlugin(() => {
  const levels: { [key: number]: string } = {
    1: "新手",
    2: "初階",
    3: "初中階",
    4: "中階",
    5: "中高階",
    6: "高階",
    7: "職業"
  };
  return {
    provide: {
      getShuttlerLevelName: (level: number) => levels[level]
    }
  };
});
