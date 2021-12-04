import { getLocalStorage, setLocalStorage } from "../util/localStorage.js";

export default class LineManagerModel {
  constructor() {
    this.lineMangerLists = getLocalStorage("line-manager");
  }

  addLine = (lineName, startStation, endStation) => {
    const lineManager = {};
    lineManager[lineName] = [startStation, endStation];

    if (this.lineManagerLists) {
      setLocalStorage("line-manager", [
        ...this.lineManagerLists,
        ...lineManager,
      ]);
    } else {
      setLocalStorage("line-manager", [...lineManager]);
    }
  };

  deleteLine = (lineNameId) => {
    setLocalStorage(
      "line-manager",
      this.lineManagerList.filter(
        (lineManager) => Object.keys(lineManager)[0] !== lineNameId
      )
    );
  };

  updateLineManagerLists = () => {
    this.lineMangerLists = getLocalStorage("line-manager");
  };
}
