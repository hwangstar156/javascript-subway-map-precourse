import SectionLine from "./subway/sectionLine.js";
import SubwayMap from "./subway/subwayMap.js";
import StationNameController from "./controller/stationNameController.js";
import { DOMS } from "./util/constant.js";

export default class Subway {
  constructor() {
    this.stationNameController = new StationNameController();
    this.LineManagerController = new LineManagerController();
  }

  init = () => {
    this.stationNameController.init();
    this.setMenuClickEvent();
  };

  setMenuClickEvent = () => {
    DOMS.$app.addEventListener("click", this.selectMenu);
  };

  selectMenu = ({ target }) => {
    if (target.id === "station-manager-button") {
      this.stationNameController.init();
    } else if (target.id === "line-manager-button") {
      this.LineManagerController.init();
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
