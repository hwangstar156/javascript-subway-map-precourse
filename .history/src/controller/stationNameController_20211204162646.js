import StationNameModel from "../model/stationNameModel.js";
import StationNameView from "../view/stationNameView.js";
import {
  isDuplicatedStationName,
  isInvalidStationNameLength,
} from "../util/check-valid.js";

export default class StationNameController {
  constructor() {
    this.model = new StationNameModel();
    this.view = new StationNameView();
  }

  setStationNameInputEvent = ({ target }) => {
    if (target.id === "station-add-button") {
      const $stationNameInput = document.querySelector("#station-name-input");
      const stationName = $stationNameInput.value;
      const alertMessage = this.createAlertMessage(stationName);

      if (alertMessage) {
        alert(alertMessage);
        return;
      }

      this.addStationName(stationName);
      $stationNameInput.value = "";
      this.renderStationNameTable();
    }
  };

  static setDeleteStationNameEvent = ({ target }) => {
    if (!target.classList.contains("station-delete-button")) {
      return;
    }
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }
    const stationNameId = target.closest("tr").dataset.stationName;
    this.deleteStationName(stationNameId);
    this.renderStationNameTable();
  };

  static createAlertMessage = (stationName) => {
    const stationNameLists = getLocalStorage("station-name");
    if (isDuplicatedStationName(stationNameLists, stationName)) {
      return "역 이름이 중복되었습니다";
    }
    if (isInvalidStationNameLength(stationName)) {
      return "역 이름은 2글자 이상으로 적어주세요";
    }

    return "";
  };
}
