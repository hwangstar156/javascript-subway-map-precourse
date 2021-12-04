import {
  isDuplicatedStationName,
  isInvalidStationNameLength,
} from "../util/check-valid.js";
import { setLocalStorage, getLocalStorage } from "../util/localStorage.js";
import { DOMS } from "../util/constant.js";
import {
  resetInput,
  resetResult,
  showInput,
  showResult,
} from "../util/reset-and-push.js";

export default class SubwayName {
  static renderStationNameInput = () => {
    const template = this.createStationNameInputTemplate();
    resetInput();
    showInput(template);
  };

  static createStationNameInputTemplate = () => {
    return `
        <div>역 이름</div>
        <input id="station-name-input" placeholder="역 이름을 입력해주세요"/>
        <button id="station-add-button">역 추가</button>
    `;
  };

  static setStationNameInputEvent = ({ target }) => {
    if (target.id === "station-add-button") {
      const $stationNameInput = document.querySelector("#station-name-input");
      const stationName = $stationNameInput.value;
      const alertMessage = this.createAlertMessage(stationName);

      if (alertMessage) {
        alert(alertMessage);
        return;
      }

      this.addStationName(stationName);
      $stationNameInput.value = "";
      this.renderStationNameTable();
    }
  };

  static addStationName = (stationName) => {
    const stationNameLists = getLocalStorage("station-name");

    if (stationNameLists) {
      setLocalStorage("station-name", [...stationNameLists, stationName]);
    } else {
      setLocalStorage("station-name", [stationName]);
    }
  };

  static deleteStationName = (stationNameId) => {
    const stationNameLists = getLocalStorage("station-name");
    setLocalStorage(
      "station-name",
      stationNameLists.filter((stationName) => stationName != stationNameId)
    );
  };

  static renderStationNameTable = () => {
    const stationNameLists = getLocalStorage("station-name");
    resetResult();

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
              <tr data-station-name= ${stationName}>
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
    showResult(template);
  };

  static setDeleteStationNameEvent = ({ target }) => {
    if (!target.classList.contains("station-delete-button")) {
      return;
    }
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }
    const stationNameId = target.closest("tr").dataset.stationName;

    this.renderStationNameTable();
  };

  static createAlertMessage = (stationName) => {
    const stationNameLists = getLocalStorage("station-name");
    if (isDuplicatedStationName(stationNameLists, stationName)) {
      return "역 이름이 중복되었습니다";
    }
    if (isInvalidStationNameLength(stationName)) {
      return "역 이름은 2글자 이상으로 적어주세요";
    }

    return "";
  };
}
