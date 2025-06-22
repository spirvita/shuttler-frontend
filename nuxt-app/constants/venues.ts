import badmintonPlaces from "@/static/badminton_places.json";

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
