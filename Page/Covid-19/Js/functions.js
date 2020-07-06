const api_countries = "https://api.covid19api.com/countries";
const api_country_total = "https://api.covid19api.com/total/country/";
const api_total = "https://api.covid19api.com/world/total";

export function GetParamsFromClassArray(array, ...arrayParams) {
  let countries = [];
  array.map((item) => {
    let newItem = {};
    for (let key of arrayParams)
      newItem[key] = item[key];
    countries.push(newItem);
  });
  return countries;
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
  }
  catch(error) {
    console.error("All countries' info not found!");
  }
}

export async function GetTotal() {
  try {
    let request = await fetch(api_total);
    let data = await request.json();
    return data;
  }
  catch(error) {
    console.error("Total info not found!");
  }
}

export async function GetCountryTotalInDiapason(apistr) {
  try {
    let request = await fetch(apistr);
    let data = await request.json();
    return data;
  }
  catch(error) {
    console.error("Country's info not found!");
  }
}

export async function GetCountryTotal(countryName) {
  try {
    let request = await fetch(`${api_country_total}${countryName}`);
    let data = await request.json();
    return data;
  }
  catch(error) {
    console.error("Country's total info not found!");
  }
}

export function GetApiStrCountryInDiapason(Country, dates) {
    let api = "https://api.covid19api.com/total/country/" + Country +
    "/status/confirmed?from=" + dates.dateOld + "&to=" + dates.dateNow;
    
    return api;
}