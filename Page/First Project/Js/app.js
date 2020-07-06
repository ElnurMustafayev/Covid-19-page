import * as second_vue from "./second.js";
import * as functions from './functions.js'

let app = new Vue({
  el: "#app",

  data: {
    country: "Azerbaijan",
    countries: [],
  },

  methods: {
    Search: function () {
      if (this.countries.find((item) => item === this.country))
        second_vue.second.name = this.country;
      else {
        $(`#error_alert`).css({"display": "block"});
        $(`#error_alert`).text(`Country "${this.country}" not found!`);
      }
    },
    CloseAlert: function () {
      $(`#error_alert`).slideUp(500);
    }
  },

  mounted: async function () {
    this.countries = functions.GetOneParamFromArray(await functions.GetAllCountries(), "Country")
  },
});