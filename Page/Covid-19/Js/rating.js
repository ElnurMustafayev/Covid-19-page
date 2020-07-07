import * as functions from './functions.js'

export let rating_vue = new Vue({
    el: '#rating_vue',

    data: {
        countriesInfo: [],
        headWords: ["Confirmed", "Deaths", "Recovered"],
    },

    methods: {},

    beforeCreate: async function() {
        let result = await functions.GetSummary();
        this.countriesInfo = functions.GetParamsFromClassArray(result.Countries,
        "Country", "TotalConfirmed", "TotalDeaths", 
        "TotalRecovered", "NewConfirmed", "NewDeaths", 
        "NewRecovered");
    }
})