import { getLocalStorage, setLocalStorage } from "../util/localStorage.js";

export default class StationNameModel {
  constructor() {
    this.stationNameLists = getLocalStorage("station-name");
  }

  get stationNames() {
    return this.stationNameLists;
  }

  deleteStationName = (stationNameId) => {
    setLocalStorage(
      "station-name",
      this.stationNameLists.filter(
        (stationName) => stationName != stationNameId
      )
    );
    this.stationNameLists = getLocalStorage("station-name");
  };

  addStationName = (stationName) => {
    if (stationNameLists) {
      setLocalStorage("station-name", [...this.stationNameLists, stationName]);
    } else {
      setLocalStorage("station-name", [stationName]);
    }
  };
}
