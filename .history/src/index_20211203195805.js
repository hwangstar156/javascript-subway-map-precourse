import SubwayName from "./subway/subwayName";

export default class Subway {
  init = () => {
    this.renderStationNameInput();
    this.setInputEvent();
    this.setDeleteEvent();
    this.renderStationNameTable();
  };

  setInputEvent = () => {
    const $app = document.querySelector("#app");
    $app.addEventListener("click", this.setStationNameInputEvent);
  };

  setDeleteEvent = () => {
    const $app = document.querySelector("#app");
    $app.addEventListener("click", this.setDeleteStationNameEvent);
  };
}

const subway = new Subway();
subway.init();
