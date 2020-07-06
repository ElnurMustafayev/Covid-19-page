import * as functions from './functions.js'
import * as classes from './classes.js'

export let world_vue = new Vue({
    el: '#world_vue',

    data: {
        Total: classes.Infected,
    },

    beforeCreate: async function() {
        let result = await functions.GetTotal();
        this.Total = new classes.Infected(result);
    }
})