import * as functions from "./functions.js";
import * as classes from "./classes.js";

export let country_vue = new Vue({
  el: "#country_vue",

  // data for bind
  data: {
    name: "",
    cases: [],
  },

  // commands
  methods: {},

  // new property with accessors
  computed: {
    country_name: {
      get: function () {
        return this.name;
      },
      set: function (value) {
        console.log(value);
        this.name = value;
      },
    },
  },

  // when prop is changed (like setter)
  watch: {
    name: async function name(newname, oldname) {
      let days = classes.Dates.GetOldAndNowDays(10);
      let apistr = functions.GetApiStrCountryInDiapason(newname, days);
      let resultArr = await functions.GetCountryTotalInDiapason(apistr);
      this.cases = functions.GetOneParamFromArray(resultArr, "Cases");
      //let result = await functions.GetCountryTotal(newname);
      //console.log(result.length);
      //result = result.slice(result.length - 10 - 1, 10);
      //console.log(result);
    },
  },
});
