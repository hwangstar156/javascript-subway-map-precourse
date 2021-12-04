import { getLocalStorage, setLocalStorage } from "../util/localStorage.js";

export default class LineManagerModel {
  constructor() {
    this.lineManagerLists = getLocalStorage("line-manager");
  }

  addLine = (lineName, startStation, endStation) => {
    const lineManager = {};
    lineManager[lineName] = [startStation, endStation];
    if (this.lineManagerLists) {
      setLocalStorage("line-manager", [...this.lineManagerLists, lineManager]);
    } else {
      setLocalStorage("line-manager", [lineManager]);
    }
    this.updateLineManagerLists();
  };

  deleteLine = (lineNameId) => {
    setLocalStorage(
      "line-manager",
      this.lineManagerList.filter(
        (lineManager) => Object.keys(lineManager)[0] !== lineNameId
      )
    );
    this.updateLineManagerLists();
  };

  updateLineManagerLists = () => {
    this.lineMangerLists = getLocalStorage("line-manager");
  };
}
