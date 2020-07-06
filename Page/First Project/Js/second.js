import * as functions from './functions.js'

export let second = new Vue({
    el: '#second',

    // data for bind
    data: {
        name: "",
        cases: [],
    },

    // commands
    methods: {

    },

    // new property with accessors
    computed: {
        country_name: {
            get: function() {
                return this.name;
            },
            set: function(value) {
                console.log(value);
                this.name = value;
            }
        }
    },

    // when prop is changed (like setter)
    watch: {
        name: async function name(newname, oldname) {
            let daysAgo = 10;
            let _dateNow = new Date();
            let _dateOld = new Date();
            _dateOld.setDate(_dateOld.getDate() - daysAgo);
            
            let dateNow = _dateNow.toLocaleDateString('en-CA').replace(/\./g, '-');
            let dateOld = _dateOld.toLocaleDateString('en-CA').replace(/\./g, '-');
            
            let apistr = functions.GetApiStrCountryInDiapason(newname, dateNow, dateOld);
            
            this.cases = functions.GetOneParamFromArray(await functions.GetApiCountryTotalInDiapason(apistr), "Cases");
        }
    }
});