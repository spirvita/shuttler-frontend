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
        }
      }
    });
  }

  watch(
    () => twCity.value,
    (newVal) => {
      if (isInitLocationByZip.value) {
        isInitLocationByZip.value = false;
        return;
      }
      twDistrict.value = createTwDistrictsOptions(newVal)[0].value;
    }
  );

  return {
    twCitiesOptions,
    twDistrictsOptions,
    twCity,
    twDistrict,
    initLocationByZip
  };
}
