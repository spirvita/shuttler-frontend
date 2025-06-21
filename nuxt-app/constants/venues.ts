import badmintonPlaces from "@/static/badminton_places.json";

const venues = [
  {
    zipCode: "338",
    value: "富暘羽球育樂旗艦館",
    address: "338桃園市蘆竹區大華北街170巷27號"
  },
  {
    zipCode: "338",
    value: "桃園市立蘆竹羽球館",
    address: "338桃園市蘆竹區錦溪路69號"
  },
  {
    zipCode: "324",
    value: "桃園展躍羽球館",
    address: "324桃園市平鎮區長安路339巷168弄50號"
  },
  {
    zipCode: "334",
    value: "東泰羽球會館",
    address: "334桃園市八德區東泰街201號"
  },
  {
    zipCode: "320",
    value: "翼升羽球館-中壢館",
    address: "320桃園市中壢區內定八街35號"
  },
  {
    zipCode: "334",
    value: "動力羽球會館",
    address: "334桃園市八德區大興路895巷6-7號"
  },
  {
    zipCode: "330",
    value: "桃園國民運動中心",
    address: "330桃園市桃園區中山東路233號"
  },
  {
    zipCode: "320",
    value: "羽宙人球館",
    address: "320桃園市中壢區培英路169號"
  },
  {
    zipCode: "334",
    value: "翼升羽球館-八德館",
    address: "334桃園市八德區介壽路二段1022巷146號"
  },
  {
    zipCode: "320",
    value: "中壢國民運動中心",
    address: "320桃園市中壢區三光路350號"
  },
  {
    zipCode: "320",
    value: "威肯羽球館",
    address: "320桃園市中壢區民權路三段38巷82-3號"
  },
  {
    zipCode: "320",
    value: "三芝小鹿羽球館",
    address: "320桃園市中壢區三芝路280號"
  },
  {
    zipCode: "324",
    value: "桃園市平鎮國民運動中心",
    address: "324桃園市平鎮區中庸路18號"
  },
  {
    zipCode: "324",
    value: "高飛羽球訓練中心",
    address: "324桃園市平鎮區興埔路232-2號"
  },
  {
    zipCode: "100",
    value: "國語實小樂學樓-體育館",
    address: "100台北市中正區和平西路二段100號對面號"
  },
  {
    zipCode: "100",
    value: "舞動陽光-成功高中運動中心",
    address: "100台北市中正區濟南路一段71號"
  },
  {
    zipCode: "100",
    value: "馬克羽球訓練中心",
    address: "100台北市中正區重慶南路二段80號1樓"
  }
];

export const queryVenuesSearch = (
  queryVenueName: string,
  cb: (result: typeof badmintonPlaces) => void,
  zipCode: string
) => {
  const regex = queryVenueName ? new RegExp(queryVenueName, "i") : null;
  const filteredVenues = badmintonPlaces.filter((item) => {
    const matchesZipCode = zipCode ? item.zipCode === zipCode : true;
    const matchesQuery = regex
      ? regex.test(item.value) || regex.test(item.address)
      : true;
    return matchesZipCode && matchesQuery;
  });

  cb(filteredVenues);
};
