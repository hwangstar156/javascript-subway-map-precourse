import SubwayName from "./subway/subwayName.js";

export default class Subway {
  init = () => {
    SubwayName.renderStationNameInput();
    this.setInputEvent();
    this.setDeleteEvent();
    SubwayName.renderStationNameTable();
  };

  setInputEvent = () => {
    const $app = document.querySelector("#app");
    $app.addEventListener("click", SubwayName.setStationNameInputEvent);
  };

  setDeleteEvent = () => {
    const $app = document.querySelector("#app");
    $app.addEventListener("click", SubwayName.setDeleteStationNameEvent);
  };
}

const subway = new Subway();
subway.init();
