import { getLocalStorage, setLocalStorage } from "../util/localStorage.js";

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
    $app.addEventListener("click", this.setSelectedMenuEvent);
    $app.addEventListener("click", this.setSubmitSectionEvent);
    $app.addEventListener("click", this.setDeleteSectionEvent);
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

  static setSelectedMenuEvent = (event) => {
    if (!event.target.classList.contains("section-line-menu-button")) {
      return;
    }
    this.renderSectionLineEdit(event.target);
  };

  static renderSectionLineEdit = (target) => {
    const template = this.createSectionLineEditTemplate(target);
    const $result = document.querySelector("#result");
    $result.innerHTML = "";

    $result.insertAdjacentHTML("beforeend", template);
  };

  static renderSelectedSection = (lineName) => {
    const buttons = document.querySelectorAll(".section-line-menu-button");
    const currentBtn = Array.from(buttons).filter(
      (button) => button.dataset.lineName === lineName
    )[0];
    this.renderSectionLineEdit(currentBtn);
  };

  static createSectionLineEditTemplate = (target) => {
    const stationNames = getLocalStorage("station-name");
    const stations = getLocalStorage("line-manager").find(
      (line) => Object.keys(line)[0] === target.dataset.lineName
    )[target.dataset.lineName];
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
        <button id="section-add-button" data-line-name=${
          target.dataset.lineName
        }>등록</button>
        <br/>
        <br/>
        <br/>
        <table border="1">
          <th>순서</th>
          <th>이름</th>
          <th>설정</th>
          ${
            stations
              ? stations
                  .map((station, idx) => {
                    return `
                <tr>
                  <td>${idx}</td>
                  <td>${station}</td>
                  <td>
                    <button class="section-delete-button" data-line-name=${target.dataset.lineName} data-idx=${idx}>노선에서 제거</button>
                  </td>
                </tr>
              `;
                  })
                  .join("")
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
      const stations = lineManager.find(
        (line) => Object.keys(line)[0] === target.dataset.lineName
      )[target.dataset.lineName];
      const stationName =
        $sectionStationSelector.options[$sectionStationSelector.selectedIndex]
          .value;
      const order = $sectionOrderInput.value;

      stations.splice(order, 0, stationName);
      setLocalStorage("line-manager", lineManager);
      this.renderSelectedSection(target.dataset.lineName);
    }
  };

  static setDeleteSectionEvent = ({ target }) => {
    if (!target.classList.contains("section-delete-button")) {
      return;
    }
    if (!confirm("정말로 삭제하시겠습니까")) {
      return;
    }
    const lineManager = getLocalStorage("line-manager");
    const stations = lineManager.find(
      (line) => Object.keys(line)[0] === target.dataset.lineName
    )[target.dataset.lineName];
    const deleteIdx = target.dataset.idx;
    stations.splice(deleteIdx, 1);

    setLocalStorage("line-manager", lineManager);
    this.renderSelectedSection(target.dataset.lineName);
  };

  canDeleteStation = (lineName) => {
    const lineManager = getLocalStorage("line-manager");
    const stations = lineManager.find(
      (line) => Object.keys(line)[0] === lineName
    )[target.dataset.lineName];

    return stations.length > 2;
  };
}
