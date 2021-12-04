import LineManagerModel from "../model/lineManagerModel.js";
import SubwayMapView from "../view/subwayMapView.js";

export default class SubwayMapController {
  constructor() {
    this.model = new LineManagerModel();
    this.view = new SubwayMapView();
  }

  init = () => {
    this.view.renderSubwayMap(this.model.lineManagerLists);
  };
}
