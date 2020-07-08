import * as functions from "./functions.js";

export let country_vue = new Vue({
  el: "#country_vue",

  // data for bind
  data: {
    name: "",
    cases: [],
    daysCount: 10,
  },

  // commands
  methods: {
    GetCaseFullInfo(caseItem) {
      return caseItem.Date.toLocaleDateString() + ": " + caseItem.Confirmed + " | " + 
      caseItem.Deaths + " | " + + caseItem.Recovered + " | " + 
      caseItem.Active;
    }
  },

  // when prop is changed (like setter)
  watch: {
    name: async function name(newname, oldname) {
      let result = await functions.GetCountryTotal(newname);
      
      let filteredResult = result.splice(result.length - this.daysCount);
      this.cases = functions.GetParamsFromClassArray(
        filteredResult,
        "Date",
        "Confirmed",
        "Deaths",
        "Recovered",
        "Active"
      );
      this.cases.map(item => item.Date = new Date(item.Date));
    },
  },
});
