import SubwayName from "./subway/subwayName.js";
import LineManager from "./subway/lineManager.js";
import SectionLine from "./subway/sectionLine.js";
import SubwayMap from "./subway/subwayMap.js";

import { DOMS } from "./util/constant.js";

export default class Subway {
  init = () => {
    SubwayName.renderStationNameInput();
    this.setInputEvent();
    this.setDeleteEvent();
    this.setMenuClickEvent();
    SubwayName.renderStationNameTable();
  };

  setMenuClickEvent = () => {
    DOMS.$app.addEventListener("click", this.selectMenu);
  };

  setInputEvent = () => {
    DOMS.$app.addEventListener("click", SubwayName.setStationNameInputEvent);
    DOMS.$app.addEventListener("click", LineManager.setLineManagerInputEvent);
  };

  setDeleteEvent = () => {
    DOMS.$app.addEventListener("click", SubwayName.setDeleteStationNameEvent);
    DOMS.$app.addEventListener("click", LineManager.setDeleteLineNameEvent);
  };

  selectMenu = ({ target }) => {
    if (target.id === "station-manager-button") {
      SubwayName.renderStationNameInput();
      SubwayName.renderStationNameTable();
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
