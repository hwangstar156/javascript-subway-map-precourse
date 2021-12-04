import { getLocalStorage, setLocalStorage } from "../util/localStorage.js";

export default class LineManager {
  static renderLineManagerInput = () => {
    const template = this.createLineManagerInputTemplate();
    const $input = document.querySelector("#input");
    $input.innerHTML = "";
    $input.insertAdjacentHTML("beforeend", template);
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

      this.addLine(lineName, startStation, endStation);
      $lineManagerInput.value = "";
    }
  };

  addLine = (lineName, startStation, endStation) => {
    const lineManagerLists = getLocalStorage("line-manager");
    const lineManager = { lineName, startStation, endStation };

    if (lineManagerLists) {
      setLocalStorage("line-manager", [...lineManagerLists, lineManager]);
    } else {
      setLocalStorage("line-manager", [lineManager]);
    }
  };

  renderLineManager = () => {
    const $result = document.querySelector("#result");
    const lineManagerLists = getLocalStorage("line-manager");
    $result.innerHTML = "";

    const template = `
      <h1>🚂지하철 노선 목록</h1>
      <br/>
      <th>노선 이름</th>
      <th>상행 종점역</th>
      <th>하행 종점역</th>
      <th>설정</th>
      ${
        lineManagerLists &&
        lineManagerLists.map((lineManager) => {
          return `
            <tr data-line-name=${lineManager.lineName}>
              <td>${lineManager.lineName}</td>
              <td>${lineManager.startStation}</td>
              <td>${lineManager.endStation}</td>
              <td>
                <button class="line-delete-button">삭제</button>
              </td>
            </tr>
          `;
        })
      }
    `;
  };
}
