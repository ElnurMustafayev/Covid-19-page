import * as functions from "./functions.js";

export let world_vue = new Vue({
  el: "#world_vue",

  data: {
    total: {},
    time: "",
    totalChart: {},
    todayChart: {},
  },

  methods: {
    GetActive: function (istotal) {
      let str = istotal == true ? "Total" : "New";
      return (
        this.total[`${str}Confirmed`] -
        this.total[`${str}Deaths`] -
        this.total[`${str}Recovered`]
      );
    },
  },

  beforeCreate: async function () {
    let result = await functions.GetSummary();
    this.total = result.Global;
    this.time = new Date(result.Date).toUTCString();

    // total chart
    this.totalChart = new Chart($('#totalChart'), {
        type: 'pie',
        data: {
            labels: ['Recovered', 'Deaths', 'Active'],
            datasets: [{
                backgroundColor: ["#86e06b", "#ff4747", "#59dae4"],
                data: [this.total.TotalRecovered, this.total.TotalDeaths, this.GetActive(true)]
            }]
        },
        options: {}
    });

    // today chart
    this.todayChart = new Chart($('#todayChart'), {
        type: 'pie',
        data: {
            labels: ['Recovered', 'Deaths', 'Active'],
            datasets: [{
                backgroundColor: ["#86e06b", "#ff4747", "#59dae4"],
                data: [this.total.NewRecovered, this.total.NewDeaths, this.GetActive(false)]
            }]
        },
        options: {}
    });
  },
});