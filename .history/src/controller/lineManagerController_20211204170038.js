import {
  isDuplicatedLineName,
  isInvalidLineName,
} from "../util/check-valid.js";
import { DOMS } from "../util/constant.js";

export default class LineManagerController {
  setEvent = () => {
    DOMS.$app.addEventListener("click", this.setLineManagerInputEvent);
    DOMS.$app.addEventListener("click", this.setDeleteLineNameEvent);
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

  static setDeleteLineNameEvent = ({ target }) => {
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

  static createAlertMessage = (lineManagerLists, newName) => {
    if (isDuplicatedLineName(lineManagerLists, newName)) {
      return "호선이 중복되었습니다";
    }
    if (isInvalidLineName(newName)) {
      return "올바른 호선을 입력해주세요";
    }

    return "";
  };
}
