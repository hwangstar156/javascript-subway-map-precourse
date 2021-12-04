import SubwayName from "./subway/subwayName.js";

export default class Subway {
  init = () => {
    SubwayName.renderStationNameInput();
    this.setInputEvent();
    this.setDeleteEvent();
    SubwayName.renderStationNameTable();
  };

  setMenuClickEvent = () => {};

  setInputEvent = () => {
    const $app = document.querySelector("#app");
    $app.addEventListener("click", SubwayName.setStationNameInputEvent);
  };

  setDeleteEvent = () => {
    const $app = document.querySelector("#app");
    $app.addEventListener("click", SubwayName.setDeleteStationNameEvent);
  };

  selectMenu = ({ target }) => {
    if (target.id === "station-manager-button") {
      SubwayName.renderStationNameInput();
      SubwayName.renderStationNameTable();
    } else if (target.id === "line-manager-button") {
    }
  };
}

const subway = new Subway();
subway.init();
