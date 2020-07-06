import * as country_m from "./country.js";
import * as world_m from './world.js'
import * as functions from './functions.js'

let input_vue = new Vue({
  el: "#input_vue",

  data: {
    country: "",
    countries: null,
  },

  methods: {
    Search: function () {
      if (this.countries.find((item) => item === this.country)){
        country_m.country_vue.name = this.country;
        $(`#error_alert`).slideUp(500);
      }
      else {
        $(`#error_alert`).css({"display": "block"});
        $(`#error_alert`).text(`Country "${this.country}" not found!`);
      }
    },
    CloseAlert: function () {
      $(`#error_alert`).slideUp(500);
    }
  },

  beforeCreate: async function () {
    let allCountries = await functions.GetAllCountries();
    this.countries = functions.GetOneParamFromArray(allCountries, "Country");
  },
});