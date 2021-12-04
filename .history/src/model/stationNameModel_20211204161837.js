import { getLocalStorage, setLocalStorage } from "../util/localStorage.js";

export default class StationNameModel {
  constructor() {
    this.stationNameLists = getLocalStorage("station-name");
  }

  deleteStationName = (stationNameId) => {
    setLocalStorage(
      "station-name",
      this.stationNameLists.filter(
        (stationName) => stationName != stationNameId
      )
    );
  };

  addStationName = (stationName) => {
    if (stationNameLists) {
      setLocalStorage("station-name", [...this.stationNameLists, stationName]);
    } else {
      setLocalStorage("station-name", [stationName]);
    }
  };
}
