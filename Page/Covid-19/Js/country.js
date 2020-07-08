import * as functions from "./functions.js";
let chart = null;

function CreateChart(cases, chartType = "line") {
  let chartparams = functions.GetChartParams(cases);
      
  if(chart !== null)
    chart.destroy();

  chart = new Chart($("#countryChart"), {
    type: chartType, 
    data: {
      labels: chartparams.labels,
      datasets: chartparams.datasets,
    },
    options: {},
  });
}

export let country_vue = new Vue({
  el: "#country_vue",

  // data for bind
  data: {
    name: "",
    cases: [],
    daysCount: 10,
  },

  // commands
  methods: {},

  // when prop is changed (like setter)
  watch: {
    name: async function name(newname, oldname) {
      let result = await functions.GetCountryTotal(newname);

      // Get data in diapason
      let filteredResult = result.splice(result.length - this.daysCount);
      this.cases = functions.GetParamsFromClassArray(
        filteredResult,
        "Date",
        "Confirmed",
        "Deaths",
        "Recovered",
        "Active"
      );
      this.cases.map(item => item.Date = new Date(item.Date).toDateString());

      // Create Chart
      CreateChart(this.cases, "radar");
    },
  },

  created: function() {
    this.name = "Azerbaijan";
  }

});