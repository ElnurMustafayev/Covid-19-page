import * as functions from './functions.js'

export let rating_vue = new Vue({
    el: '#rating_vue',

    data: {
        countriesInfo: [],
        //countriesFlags: [],
        bydescending: true,
        headWords: ["Confirmed", "Deaths", "Recovered"],
    },

    methods: {
        SortTable: function() {
            let $target = $(event.target);
            let sortProperty = $target[0].className + $target.text();
            
            if(this.bydescending)
                this.countriesInfo.sort((item1, item2) => item2[sortProperty] - item1[sortProperty]);
            else
                this.countriesInfo.sort((item1, item2) => item1[sortProperty] - item2[sortProperty]);

            $('.Total, .New').removeClass("selected");
            $target.addClass("selected");
        },
    },

    beforeCreate: async function() {
        let result = await functions.GetSummary();

        this.countriesInfo = functions.GetParamsFromClassArray(result.Countries,
        "CountryCode", "Country", "TotalConfirmed", "TotalDeaths", 
        "TotalRecovered", "NewConfirmed", "NewDeaths", 
        "NewRecovered");

        this.countriesInfo.map(item => item.CountryCode = `https://www.countryflags.io/${item.CountryCode}/flat/32.png`);
    }
})