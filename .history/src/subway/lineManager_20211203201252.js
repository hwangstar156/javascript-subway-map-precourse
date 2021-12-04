import { getLocalStorage } from "../util/localStorage.js";

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
    `;
  };
}
