export const shuttlerLevels: { [key: number]: string } = {
  1: "新手階",
  2: "初階",
  3: "初中階",
  4: "中階",
  5: "中進階",
  6: "高階",
  7: "職業"
};
export const getElementPlusTypeByLevel = (levelString: string) => {
  switch (levelString) {
    case "新手階":
      return "success";
    case "初階":
      return "success";
    case "初中階":
      return "success";
    case "中階":
      return "info";
    case "中進階":
      return "info";
    case "高階":
      return "danger";
    case "職業":
      return "danger";
  }
};
