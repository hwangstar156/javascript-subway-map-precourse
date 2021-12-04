import StationNameController from "./controller/stationNameController.js";
import { DOMS } from "./util/constant.js";
import LineManagerController from "./controller/lineManagerController.js";
import SectionLineController from "./controller/sectionLineController.js";
import SubwayMapController from "./controller/subwayMapController.js";

export default class Subway {
  constructor() {
    this.stationNameController = new StationNameController();
    this.LineManagerController = new LineManagerController();
    this.sectionLineController = new SectionLineController();
    this.subwayMapController = new SubwayMapController();
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
      this.sectionLineController.init();
    } else if (target.id === "map-print-manager-button") {
      this.subwayMapController.init();
    }
  };
}

const subway = new Subway();
subway.init();
