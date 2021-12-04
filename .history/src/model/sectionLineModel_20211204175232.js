import { getLocalStorage, setLocalStorage } from "../util/localStorage.js";

export default class SectionLineModel {
  constructor() {
    this.lines = getLocalStorage("line-manager");
    this.stationNames = getLocalStorage("station-name");
  }

  static addStation = (stationName, order, lineName) => {
    const stations = this.lines.find(
      (line) => Object.keys(line)[0] === lineName
    )[lineName];
    stations.splice(order, 0, stationName);
    setLocalStorage("line-manager", lineManager);
  };

  static deleteStation = (deleteIdx, lineName) => {
    const stations = this.lines.find(
      (line) => Object.keys(line)[0] === lineName
    )[lineName];
    stations.splice(deleteIdx, 1);
    setLocalStorage("line-manager", lineManager);
  };

  updateLines = () => {
    this.lines = getLocalStorage("line-manager");
  };
}
