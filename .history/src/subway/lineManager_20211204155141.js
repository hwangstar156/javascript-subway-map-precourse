import {
  isDuplicatedLineName,
  isInvalidLineName,
} from "../util/check-valid.js";
import { getLocalStorage, setLocalStorage } from "../util/localStorage.js";
import { DOMS } from "../util/constant.js";
import { resetInput, resetResult, showInput } from "../util/reset-and-push.js";
export default class LineManager {
  static renderLineManagerInput = () => {
    const template = this.createLineManagerInputTemplate();
    resetInput();
    showInput(template);
  };

  static createLineManagerInputTemplate = () => {
    const stationNameList = getLocalStorage("station-name");
    return `
        <div>노선 이름<div>
        <input id="line-name-input" placeholder="노선 이름을 입력해주세요"/>
        <br/>
        <br/>
        상행종점
        <select id="line-start-station-selector">
          ${
            stationNameList &&
            stationNameList.map((stationName) => {
              return `
              <option value=${stationName}>${stationName}</option>
            `;
            })
          }
        </select>
        <br/>
        하행종점
        <select id="line-end-station-selector">
        ${
          stationNameList &&
          stationNameList.map((stationName) => {
            return `
            <option value=${stationName}>${stationName}</option>
          `;
          })
        }
        </select>
        <br/>
        <br/>
        <button id="line-add-button">노선 추가</button>
    `;
  };

  static setLineManagerInputEvent = ({ target }) => {
    if (target.id === "line-add-button") {
      const $startStation = document.querySelector(
        "#line-start-station-selector"
      );
      const $lineManagerInput = document.querySelector("#line-name-input");
      const $endStation = document.querySelector("#line-end-station-selector");

      const startStation =
        $startStation.options[$startStation.selectedIndex].value;
      const endStation = $endStation.options[$endStation.selectedIndex].value;
      const lineName = $lineManagerInput.value;
      const alertMessage = this.createAlertMessage(lineName);

      if (alertMessage) {
        alert(alertMessage);
        return;
      }

      this.addLine(lineName, startStation, endStation);
      $lineManagerInput.value = "";
      this.renderLineManager();
    }
  };

  static addLine = (lineName, startStation, endStation) => {
    const lineManagerLists = getLocalStorage("line-manager");
    const lineManager = {};
    lineManager[lineName] = [startStation, endStation];

    if (lineManagerLists) {
      setLocalStorage("line-manager", [...lineManagerLists, lineManager]);
    } else {
      setLocalStorage("line-manager", [lineManager]);
    }
  };

  static renderLineManager = () => {
    const lineManagerLists = getLocalStorage("line-manager");
    DOMS.$result.innerHTML = "";

    const template = `
      <h1>🚂지하철 노선 목록</h1>
      <br/>
      <table border="1">
        <th>노선 이름</th>
        <th>상행 종점역</th>
        <th>하행 종점역</th>
        <th>설정</th>
        ${
          lineManagerLists
            ? lineManagerLists
                .map((lineManager) => {
                  const lineName = Object.keys(lineManager);
                  const stations = Object.values(lineManager);
                  return `
                    <tr data-line-name=${lineName[0]}>
                      <td>${lineName[0]}</td>
                      <td>${stations[0][0]}</td>
                      <td>${stations[0][stations[0].length - 1]}</td>
                      <td>
                        <button class="line-delete-button">삭제</button>
                      </td>
                    </tr>
                  `;
                })
                .join("")
            : ""
        }
      </table>
    `;
    DOMS.$result.insertAdjacentHTML("beforeend", template);
  };

  static setDeleteLineNameEvent = ({ target }) => {
    if (!target.classList.contains("line-delete-button")) {
      return;
    }
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }

    const lineNameId = target.closest("tr").dataset.lineName;
    const lineManagerList = getLocalStorage("line-manager");
    setLocalStorage(
      "line-manager",
      lineManagerList.filter(
        (lineManager) => Object.keys(lineManager)[0] !== lineNameId
      )
    );
    this.renderLineManager();
  };

  static createAlertMessage = (newName) => {
    const lineManagerLists = getLocalStorage("line-manager");
    if (isDuplicatedLineName(lineManagerLists, newName)) {
      return "호선이 중복되었습니다";
    }
    if (isInvalidLineName(newName)) {
      return "올바른 호선을 입력해주세요";
    }

    return "";
  };
}
