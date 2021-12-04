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
  };

  setEvent = () => {
    DOMS.$app.addEventListener("click", this.setLineManagerInputEvent);
    DOMS.$app.addEventListener("click", this.setDeleteLineNameEvent);
  };

  setLineManagerInputEvent = ({ target }) => {
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

  setDeleteLineNameEvent = ({ target }) => {
    if (!target.classList.contains("line-delete-button")) {
      return;
    }
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }

    const lineNameId = target.closest("tr").dataset.lineName;
    this.deleteLine(lineNameId);
    this.renderLineManager();
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
