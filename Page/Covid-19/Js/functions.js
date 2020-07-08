const api_countries = "https://api.covid19api.com/countries";
const api_country_total = "https://api.covid19api.com/total/country/";
const api_total = "https://api.covid19api.com/world/total";
const api_summary = "https://api.covid19api.com/summary";

export function GetParamsFromClassArray(array, ...arrayParams) {
  let newObj = [];
  array.map((item) => {
    let newItem = {};
    for (let key of arrayParams) newItem[key] = item[key];
    newObj.push(newItem);
  });
  return newObj;
}

export function GetOneParamFromArray(array, arrayParam) {
  let countries = [];
  array.map((item) => countries.push(item[`${arrayParam}`]));
  return countries;
}

export async function GetAllCountries() {
  try {
    let request = await fetch(api_countries);
    let data = await request.json();
    return data;
  } catch (error) {
    console.error("All countries' info not found!");
  }
}

export async function GetTotal() {
  try {
    let request = await fetch(api_total);
    let data = await request.json();
    return data;
  } catch (error) {
    console.error("Total info not found!");
  }
}

export async function GetCountryTotal(countryName) {
  try {
    let request = await fetch(`${api_country_total}${countryName}`);
    let data = await request.json();
    return data;
  } catch (error) {
    console.error("Country's total info not found!");
  }
}

export async function GetSummary() {
  try {
    let request = await fetch(api_summary);
    let data = await request.json();
    return data;
  } catch (error) {
    console.error("Summary info not found!");
  }
}

export function GetChartParams(cases, prefix = "") {
  let datasets = [];
  let labels = GetOneParamFromArray(cases, `${prefix}Date`);

  datasets.push({
    label: "Deaths",
    data: GetOneParamFromArray(cases, `${prefix}Deaths`),
    backgroundColor: "#dc3545",
  });
  datasets.push({
    label: "Recovered",
    data: GetOneParamFromArray(cases, `${prefix}Recovered`),
    backgroundColor: "#28a745",
  });
  datasets.push({
    label: "Active",
    data: GetOneParamFromArray(cases, `${prefix}Active`),
    backgroundColor: "#ffc107",
  });

  return { datasets, labels };
}