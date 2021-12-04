import SubwayName from "./subway/subwayName.js";
import LineManager from "./subway/lineManager.js";

export default class Subway {
  init = () => {
    SubwayName.renderStationNameInput();
    this.setInputEvent();
    this.setDeleteEvent();
    this.setMenuClickEvent();
    SubwayName.renderStationNameTable();
  };

  setMenuClickEvent = () => {
    const $app = document.querySelector("#app");
    $app.addEventListener("click", this.selectMenu);
  };

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
      LineManager.renderLineManagerInput();
    }
  };
}

const subway = new Subway();
subway.init();
