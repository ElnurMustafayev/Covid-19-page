import * as functions from './functions.js'

export let world_vue = new Vue({
    el: '#world_vue',

    data: {
        total: {},
        time: "",
    },

    methods: {
        GetActive: function(istotal) {
            let str = istotal == true ? "Total" : "New";
            return this.total[`${str}Confirmed`] - this.total[`${str}Deaths`] - this.total[`${str}Recovered`];
        },
    },

    beforeCreate: async function() {
        let result = await functions.GetSummary();
        this.total = result.Global;
        this.time = new Date(result.Date);
    },
})