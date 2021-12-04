import { getLocalStorage, setLocalStorage } from "./util/localStorage.js";

export default class Subway {
  constructor() {}

  init = () => {
    this.renderStationNameInput();
  };

  setInputEvent = () => {
    const $app = document.querySelector("#app");
    $app.addEventListener("click");
  };

  renderStationNameInput = () => {
    const template = this.createStationNameInputTemplate();
    const $app = document.querySelector("#app");
    $app.insertAdjacentHTML("beforeend", template);
  };

  createStationNameInputTemplate = () => {
    return `
        <div>역 이름<div>
        <input id="station-name-input" placeholder="역 이름을 입력해주세요"/>
        <button id="station-add-button">역 추가</button>
    `;
  };

  setStationNameInputEvent = ({ target }) => {
    if (target.id === "station-add-button") {
      const $stationNameInput = document.querySelector("#station-name-input");
      const stationName = $stationNameInput.value;
      const stationNameLists = getLocalStorage("station-name");

      if (stationNameLists) {
        setLocalStorage("station-name", [...stationNameLists, ...stationName]);
      } else {
        setLocalStorage("station-name", [stationName]);
      }

      $stationNameInput.value = "";
    }
  };
}

const subway = new Subway();
subway.init();
