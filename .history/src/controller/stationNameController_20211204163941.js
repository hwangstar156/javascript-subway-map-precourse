import StationNameModel from "../model/stationNameModel.js";
import StationNameView from "../view/stationNameView.js";
import {
  isDuplicatedStationName,
  isInvalidStationNameLength,
} from "../util/check-valid.js";
import { DOMS } from "../util/constant.js";

export default class StationNameController {
  constructor() {
    this.model = new StationNameModel();
    this.view = new StationNameView();
  }

  init = () => {
    this.view.renderStationNameInput();
    this.view.renderStationNameTable(this.model.stationNameLists);
    this.setEvent();
  };

  setEvent = () => {
    DOMS.$app.addEventListener("click", this.setStationNameInputEvent);
    DOMS.$app.addEventListener("click", this.setDeleteStationNameEvent);
  };

  setStationNameInputEvent = ({ target }) => {
    if (target.id === "station-add-button") {
      const $stationNameInput = document.querySelector("#station-name-input");
      const stationName = $stationNameInput.value;
      const stationNameLists = this.model.stationNames;
      const alertMessage = this.createAlertMessage(
        stationNameLists,
        stationName
      );

      if (alertMessage) {
        alert(alertMessage);
        return;
      }

      this.model.addStationName(stationName);
      this.view.resetStationNameInput();
      this.view.renderStationNameTable(this.model.stationNames);
    }
  };

  setDeleteStationNameEvent = ({ target }) => {
    if (!target.classList.contains("station-delete-button")) {
      return;
    }
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }
    const stationNameId = target.closest("tr").dataset.stationName;
    this.model.deleteStationName(stationNameId);
    this.view.renderStationNameTable(this.model.stationNames);
  };

  createAlertMessage = (stationNameLists, stationName) => {
    if (isDuplicatedStationName(stationNameLists, stationName)) {
      return "역 이름이 중복되었습니다";
    }
    if (isInvalidStationNameLength(stationName)) {
      return "역 이름은 2글자 이상으로 적어주세요";
    }

    return "";
  };
}
