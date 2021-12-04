import SectionLineModel from "../model/sectionLineModel.js";
import SectionLineView from "../view/sectionLineView.js";
import { DOMS } from "../util/constant.js";

export default class SectionLineController {
  constructor() {
    this.model = new SectionLineModel();
    this.view = new SectionLineView();
  }

  init = () => {
    this.setEvent();
    const sectionButtons = document.querySelectorAll(
      ".section-line-menu-button"
    );
    this.view.renderSectionLineEdit(sectionButtons[0]);
  };

  setEvent = () => {
    DOMS.$app.addEventListener("click", this.setSelectedMenuEvent);
    DOMS.$app.addEventListener("click", this.setAddStationEvent);
    DOMS.$app.addEventListener("click", this.setDeleteSectionEvent);
  };

  setSelectedMenuEvent = (event) => {
    if (!event.target.classList.contains("section-line-menu-button")) {
      return;
    }
    const lineName = event.target.dataset.lineName;
    const stations = this.getStations(lineName);

    this.view.renderSectionLineEdit(
      this.model.stationNames,
      stations,
      lineName
    );
  };

  getCurrentSelectedLineName = (lineName) => {
    const $buttons = document.querySelectorAll(".section-line-menu-button");
    const currentBtn = Array.from($buttons).filter(
      (button) => button.dataset.lineName === lineName
    )[0];

    return currentBtn.dataset.lineName;
  };

  getStations = (lineName) => {
    return this.model.lines.find((line) => Object.keys(line)[0] === lineName)[
      lineName
    ];
  };

  setAddStationEvent = ({ target }) => {
    if (target.id !== "section-add-button") {
      return;
    }

    const $sectionOrderInput = document.querySelector("#section-order-input");
    const $sectionStationSelector = document.querySelector(
      "#section-station-selector"
    );

    const lineName = target.dataset.lineName;
    const selectedStationName =
      $sectionStationSelector.options[$sectionStationSelector.selectedIndex]
        .value;
    const order = $sectionOrderInput.value;

    if (this.cantAddStation(lineName, selectedStationName)) {
      alert("역이름이 중복되었습니다");
      return;
    }

    this.addStation(stationName, order, lineName);
    this.renderSelectedSection(lineName);
  };

  setDeleteSectionEvent = ({ target }) => {
    const lineName = target.dataset.lineName;
    if (!target.classList.contains("section-delete-button")) {
      return;
    }
    if (!confirm("정말로 삭제하시겠습니까")) {
      return;
    }
    if (!this.canDeleteStation(lineName)) {
      alert("2개 이하의 역개수는 지울수 없습니다");
      return;
    }
    const deleteIdx = target.dataset.idx;
    this.deleteStation(deleteIdx, lineName);
    this.renderSelectedSection(lineName);
  };

  canDeleteStation = (lineName) => {
    const stations = this.getStations(lineName);
    return stations.length > 2;
  };

  cantAddStation = (lineName, newStation) => {
    const stations = this.getStations(lineName);
    return stations.some((station) => station === newStation);
  };
}
