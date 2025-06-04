import twCities from "~/constants/twLocations";

function createTwCitiesOptions() {
  const twCityOptions: { value: string; label: string }[] = twCities.map(
    (city) => ({
      value: city.name,
      label: city.name
    })
  );
  return twCityOptions;
}

function createTwDistrictsOptions(cityName: string) {
  const twCityDistrictsOptions: { value: string; label: string }[] = [];
  const city = twCities.find((city) => city.name === cityName);
  if (city) {
    for (const [_key, value] of Object.entries(city.districts)) {
      twCityDistrictsOptions.push({
        value: value.zip,
        label: value.name
      });
    }
  }
  return twCityDistrictsOptions;
}

export function useTwLocationState() {
  const isInitLocationByZip = ref(false);
  const twCitiesOptions = createTwCitiesOptions();
  const twCity = ref("");
  const twDistrict = ref("");
  const twDistrictName = ref("");
  const twDistrictsOptions = computed(() =>
    createTwDistrictsOptions(twCity.value)
  );

  function initLocationByZip(zip: string) {
    isInitLocationByZip.value = true;
    twCities.forEach((city) => {
      for (const [_key, district] of Object.entries(city.districts)) {
        if (district.zip === zip) {
          twCity.value = city.name;
          twDistrict.value = district.zip;
          twDistrictName.value = district.name;
        }
      }
    });
  }

  function manuallySetCity(cityName: string) {
    twCity.value = cityName;
  }

  watch(
    () => twCity.value,
    () => {
      if (isInitLocationByZip.value) {
        isInitLocationByZip.value = false;
        return;
      }
      twDistrict.value = "";
      twDistrictName.value = "";
    }
  );

  watch(
    () => twDistrict.value,
    (newVal) => {
      const city = twCities.find((city) => city.name === twCity.value);
      if (city) {
        const district = Object.values(city.districts).find(
          (d) => d.zip === newVal
        );
        twDistrictName.value = district ? district.name : "";
      }
    }
  );

  return {
    twCitiesOptions,
    twDistrictsOptions,
    twCity,
    twDistrict,
    twDistrictName,
    initLocationByZip,
    manuallySetCity
  };
}
