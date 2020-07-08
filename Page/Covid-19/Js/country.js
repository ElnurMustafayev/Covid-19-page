import * as functions from "./functions.js";
import * as classes from "./classes.js";

export let country_vue = new Vue({
  el: "#country_vue",

  // data for bind
  data: {
    name: "",
    cases: [],
    daysCount: 10,
    buttons: [],
  },

  // commands
  methods: {
    ChangeDiagram: function() {
      let $target = $(event.target);
      classes.NavigationButton.SetOneActive(this.buttons, $target.text());
      functions.CreateChart(this.cases, classes.NavigationButton.GetActiveButtonName(this.buttons));
    }
  },

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
      functions.CreateChart(this.cases, classes.NavigationButton.GetActiveButtonName(this.buttons));
    },
  },

  created: function() {
    let DiagramTypes = ["line", "bar", "radar"];
    DiagramTypes.map(name => this.buttons.push(new classes.NavigationButton(name)));
    this.buttons.find(but => but.name === "line").isActive = true;
    
    this.name = "Azerbaijan";
  },

});