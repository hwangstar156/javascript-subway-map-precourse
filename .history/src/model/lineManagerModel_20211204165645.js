import { getLocalStorage, setLocalStorage } from "../util/localStorage";

export default class LineManagerModel {
  constructor() {
    this.stationNameLists = getLocalStorage("station-name");
    this.lineMangerLists = getLocalStorage("line-manager");
  }

  static addLine = (lineName, startStation, endStation) => {
    const lineManager = {};
    lineManager[lineName] = [startStation, endStation];

    if (this.lineManagerLists) {
      setLocalStorage("line-manager", [...this.lineManagerLists, lineManager]);
    } else {
      setLocalStorage("line-manager", [lineManager]);
    }
  };

  static deleteLine = (lineNameId) => {
    const lineManagerList = getLocalStorage("line-manager");
    setLocalStorage(
      "line-manager",
      lineManagerList.filter(
        (lineManager) => Object.keys(lineManager)[0] !== lineNameId
      )
    );
  };
}
