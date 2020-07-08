import * as country_m from "./country.js";
import * as functions from './functions.js'

let input_vue = new Vue({
  el: "#input_vue",

  data: {
    country: "",
    countries: null,
    daysCount: 10,
    maxDaysCount: 167,
  },

  methods: {
    Search: function () {
      let $error = $(`#error_alert`);
      if (this.countries.find((item) => item === this.country)){
        country_m.country_vue.daysCount = this.daysCount;
        country_m.country_vue.name = this.country;
        $error.slideUp(500);
      }
      else {
        $error.slideDown(500);
        $error.text(`Country "${this.country}" is not found!`);
      }
    },

    CloseAlert: function () {
      $(`#error_alert`).slideUp(500);
    }
  },

  watch: {
    country: function(newcountry, oldcountry) {
      let $search = $('#search');
      
      newcountry.length > 0 ? $search.removeAttr("disabled") : $search.attr("disabled", "");
    },
  },

  beforeCreate: async function () {
    let allCountries = await functions.GetAllCountries();
    this.countries = functions.GetOneParamFromArray(allCountries, "Country");

    $(`#error_alert`).hide();
  },
});