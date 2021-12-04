import LineManagerModel from "../model/lineManagerModel.js";
import StationNameModel from "../model/stationNameModel.js";
import {
  isDuplicatedLineName,
  isInvalidLineName,
} from "../util/check-valid.js";
import { DOMS } from "../util/constant.js";
import LineManagerView from "../view/lineManagerView.js";

export default class LineManagerController {
  constructor() {
    this.lineManagerModel = new LineManagerModel();
    this.stationNamesModel = new StationNameModel();
    this.view = new LineManagerView();
  }

  init = () => {
    this.setEvent();
    this.view.renderLineManagerInput(this.stationNamesModel.stationNames);
    this.view.renderLineManagerTable(this.lineManagerModel.lineMangerLists);
  };

  setEvent = () => {
    DOMS.$app.addEventListener("click", this.setLineManagerInputEvent);
    DOMS.$app.addEventListener("click", this.setDeleteLineNameEvent);
  };

  setLineManagerInputEvent = ({ target }) => {
    if (target.id !== "line-add-button") {
      return;
    }
    const $startStation = document.querySelector(
      "#line-start-station-selector"
    );
    const $lineManagerInput = document.querySelector("#line-name-input");
    const $endStation = document.querySelector("#line-end-station-selector");

    const startStation =
      $startStation.options[$startStation.selectedIndex].value;
    const endStation = $endStation.options[$endStation.selectedIndex].value;
    const lineName = $lineManagerInput.value;

    const alertMessage = this.createAlertMessage(
      this.lineManagerModel.lineManagerLists,
      lineName
    );

    if (alertMessage) {
      alert(alertMessage);
      return;
    }

    this.lineManagerModel.addLine(lineName, startStation, endStation);
    this.view.resetLineManagerInput();
    this.view.renderLineManagerTable(this.lineManagerModel.lineManagerLists);
  };

  setDeleteLineNameEvent = ({ target }) => {
    if (!target.classList.contains("line-delete-button")) {
      return;
    }
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }
    const lineNameId = target.closest("tr").dataset.lineName;
    this.lineManagerModel.deleteLine(lineNameId);
    this.view.renderLineManagerTable(this.lineManagerModel.lineManagerLists);
  };

  createAlertMessage = (lineManagerLists, newName) => {
    if (isDuplicatedLineName(lineManagerLists, newName)) {
      return "호선이 중복되었습니다";
    }
    if (isInvalidLineName(newName)) {
      return "올바른 호선을 입력해주세요";
    }

    return "";
  };
}
