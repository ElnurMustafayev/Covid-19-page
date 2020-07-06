const api_countries = "https://api.covid19api.com/countries";

export function GetOneParamFromArray(array, arrayParam) {
  let countries = [];
  array.map((item) => countries.push(item[`${arrayParam}`]));
  return countries;
}

export async function GetAllCountries() {
  let request = await fetch(api_countries);
  let data = await request.json();
  return data;
}

export async function GetApiCountryTotalInDiapason(apistr) {
  let request = await fetch(apistr);
  let data = await request.json();
  return data;
}

export function GetApiStrCountryInDiapason(Country, dateNow, dateOld) {
    let api = "https://api.covid19api.com/total/country/" + Country +
    "/status/confirmed?from=" + dateOld + "&to=" + dateNow;

    return api;
}