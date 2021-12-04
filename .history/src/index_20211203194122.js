import { getLocalStorage, setLocalStorage } from "./util/localStorage.js";

export default class Subway {
  constructor() {}

  init = () => {
    this.renderStationNameInput();
    this.setInputEvent();
    this.renderStationNameTable();
  };

  setInputEvent = () => {
    const $app = document.querySelector("#app");
    $app.addEventListener("click", this.setStationNameInputEvent);
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
        setLocalStorage("station-name", [...stationNameLists, stationName]);
      } else {
        setLocalStorage("station-name", [stationName]);
      }

      $stationNameInput.value = "";
      this.renderStationNameTable();
    }
  };

  renderStationNameTable = () => {
    const $app = document.querySelector("#app");
    const stationNameLists = getLocalStorage("station-name");

    const template = `
      <h1>🚂 지하철 역 목록</h1>
      <table border="1">
        <th>역 이름</th>
        <th>설정</th>
        ${
          stationNameLists &&
          stationNameLists
            .map((stationName) => {
              return `
              <tr id=${stationName}>
                <td>${stationName}</td>
                <td>
                  <button class="station-delete-button">삭제</button>
                </td>
              </tr>`;
            })
            .join("")
        }
      </table>
    `;
    $app.insertAdjacentHTML("beforeend", template);
  };

  setDeleteStationNameEvent = ({ target }) => {
    if (target.id === "station-delete-button") {
      const stationNameId = target.closest("tr").id;
      console.log(stationNameId);
      const stationNameLists = getLocalStorage("station-name");
      setLocalStorage(
        "station-name",
        stationNameLists.filter((stationName) => stationName != stationNameId)
      );
      this.renderStationNameTable();
    }
  };
}

const subway = new Subway();
subway.init();
