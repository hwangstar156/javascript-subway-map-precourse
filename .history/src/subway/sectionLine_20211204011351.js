import { getLocalStorage } from "../util/localStorage.js";

export default class SectionLine {
  constructor() {
    this.setButtonClickEvent();
  }

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
                return `
                <button data-line-name=${line.lineName} class="section-line-menu-button">
                  ${line.lineName}
                </button>
              `;
              })
              .join("")
          : ""
      }
    `;
  };

  static renderSectionLineEdit = (event) => {
    const template = this.createSectionLineEditTemplate(event);
  };

  static createSectionLineEditTemplate = ({ target }) => {
    if (target.classList.contains("section-line-menu-button")) {
      const stationNames = getLocalStorage("station-name");

      return `
        <h2>${target.dataset.lineName}</h2>
        <br/>
        <h3>구간 등록</h3>
        <br/>
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
      `;
    }
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
    }
  };
}
