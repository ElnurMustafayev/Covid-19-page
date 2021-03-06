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

    let dateNow = _dateNow.toLocaleDateString("en-CA").replace(/\./g, "-");
    let dateOld = _dateOld.toLocaleDateString("en-CA").replace(/\./g, "-");
    return new Dates(dateNow, dateOld);
  }
}

export class Infected {
  constructor(query_result) {
    this.Date = Date.now();
    this.Confirmed = query_result.TotalConfirmed;
    this.Deaths = query_result.TotalDeaths;
    this.Recovered = query_result.TotalRecovered;
    this.Active = this.GetActive();
  }

  GetActive() {
    return this.Confirmed - this.Deaths - this.Recovered;
  }
}

export class NavigationButton {
  constructor(name, isActive = false) {
    this.name = name;
    this.isActive = isActive;
  }

  static GetActiveButtonName(array) {
    return array.find((but) => but.isActive === true).name;
  }

  static SetOneActive(array, name) {
    array.map((but) => (but.isActive = false));
    array.map((but) => {
      if (but.name === name) but.isActive = true;
    });
  }
}
