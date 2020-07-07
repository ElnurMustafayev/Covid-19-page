import * as functions from './functions.js'

export let rating_vue = new Vue({
    el: '#rating_vue',

    data: {
        countriesInfo: [],
        countriesFlags: [],
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

        let countryCodes = functions.GetOneParamFromArray(result.Countries, "CountryCode");
        countryCodes.map(code => this.countriesFlags.push(`https://www.countryflags.io/${code}/flat/32.png`))

        this.countriesInfo = functions.GetParamsFromClassArray(result.Countries,
        "Country", "TotalConfirmed", "TotalDeaths", 
        "TotalRecovered", "NewConfirmed", "NewDeaths", 
        "NewRecovered");
    }
})