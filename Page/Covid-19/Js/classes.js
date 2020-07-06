// Class which contains 2 dates: now and old
export class Dates {
    constructor(dateNow, dateOld) {
        this.dateNow = dateNow;
        this.dateOld = dateOld;
    }

    static GetOldAndNowDays(daysAgo) {
        let _dateNow = new Date();
        let _dateOld = new Date();
        _dateOld.setDate(_dateOld.getDate() - daysAgo);
        
        let dateNow = _dateNow.toLocaleDateString('en-CA').replace(/\./g, '-');
        let dateOld = _dateOld.toLocaleDateString('en-CA').replace(/\./g, '-');
        return new Dates(dateNow, dateOld);
    }
}

export class Infected {
    constructor(result) {
        this.Confirmed = result.TotalConfirmed;
        this.Deaths = result.TotalDeaths;
        this.Recovered = result.TotalRecovered;
        this.Active = this.GetActive();
    }

    GetActive() {
        return this.Confirmed - this.Deaths - this.Recovered;
    }
}