import LineManager from "./subway/lineManager.js";
import SectionLine from "./subway/sectionLine.js";
import SubwayMap from "./subway/subwayMap.js";
import StationNameController from "./controller/stationNameController.js";
import { DOMS } from "./util/constant.js";

export default class Subway {
  constructor() {
    this.stationNameController = new StationNameController();
  }
  init = () => {
    this.stationNameController.init();
    this.setInputEvent();
    this.setDeleteEvent();
    this.setMenuClickEvent();
  };

  setMenuClickEvent = () => {
    DOMS.$app.addEventListener("click", this.selectMenu);
  };

  setInputEvent = () => {
    DOMS.$app.addEventListener("click", LineManager.setLineManagerInputEvent);
  };

  setDeleteEvent = () => {
    DOMS.$app.addEventListener("click", LineManager.setDeleteLineNameEvent);
  };

  selectMenu = ({ target }) => {
    if (target.id === "station-manager-button") {
      this.stationNameController.init();
    } else if (target.id === "line-manager-button") {
      LineManager.renderLineManagerInput();
      LineManager.renderLineManager();
    } else if (target.id === "section-manager-button") {
      SectionLine.renderSectionLineInput();
      SectionLine.init();
    } else if (target.id === "map-print-manager-button") {
      SubwayMap.renderSubwayMap();
    }
  };
}

const subway = new Subway();
subway.init();
