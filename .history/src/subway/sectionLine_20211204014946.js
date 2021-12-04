import { getLocalStorage, setLocalStorage } from "../util/localStorage.js";
import LineManager from "./lineManager.js";

export default class SectionLine {
  static init = () => {
    this.setButtonClickEvent();
    const sectionButtons = document.querySelectorAll(
      ".section-line-menu-button"
    );
    sectionButtons[0].click();
  };

  static renderSectionLineInput = () => {
    const template = this.createSectionLineInputTemplate();
    const $input = document.querySelector("#input");
    $input.innerHTML = "";
    $input.insertAdjacentHTML("beforeend", template);
  };

  static setButtonClickEvent = () => {
    const $app = document.querySelector("#app");
    $app.addEventListener("click", this.renderSectionLineEdit);
  };

  static createSectionLineInputTemplate = () => {
    const lineManager = getLocalStorage("line-manager");

    return `
      <h2>구간을 수정할 노선을 선택해주세요.</h2>
      ${
        lineManager
          ? lineManager
              .map((line) => {
                const lineName = Object.keys(line);
                return `
                <button data-line-name=${lineName[0]} class="section-line-menu-button">
                  ${lineName[0]}
                </button>
              `;
              })
              .join("")
          : ""
      }
    `;
  };

  static renderSectionLineEdit = ({ target }) => {
    if (!target.classList.contains("section-line-menu-button")) {
      return;
    }
    const template = this.createSectionLineEditTemplate(target);
    const $result = document.querySelector("#result");
    $result.innerHTML = "";

    $result.insertAdjacentHTML("beforeend", template);
  };

  static createSectionLineEditTemplate = (target) => {
    const stationNames = getLocalStorage("station-name");
    const stations = getLocalStorage("line-manager")[target.dataset.lineName];
    return `
        <h2>${target.dataset.lineName} 관리</h2>
        <h3>구간 등록</h3>
        <select id="section-station-selector">
          ${
            stationNames &&
            stationNames.map((name) => {
              return `
              <option value=${name}>${name}</option>
            `;
            })
          }
        </select>
        <input type="number" placeholder="순서" id="section-order-input"/>
        <button id="section-add-button">등록</button>
        <br/>
        <br/>
        <table border="1">
          <th>순서</th>
          <th>이름</th>
          <th>설정</th>
          ${
            stations
              ? stations.map((station, idx) => {
                  return `
                <tr>
                  <td>${idx}</td>
                  <td>${station}</td>
                  <td>
                    <button class="section-delete-button">노선에서 제거</button>
                  </td>
                </tr>
              `;
                })
              : ""
          }
        </table>
      `;
  };

  static setSubmitSectionEvent = ({ target }) => {
    if (target.id === "section-add-button") {
      const $sectionOrderInput = document.querySelector("#section-order-input");
      const $sectionStationSelector = document.querySelector(
        "#section-station-selector"
      );

      const lineManager = getLocalStorage("line-manager");
      const stationName =
        $sectionStationSelector.options[$sectionStationSelector.selectedIndex]
          .value;
      const order = $sectionOrderInput.value;

      lineManager[target.dataset.lineName].splice(order, 0, stationName);
      setLocalStorage("line-manager", lineManager);
      LineManager.renderLineManager();
    }
  };
}
