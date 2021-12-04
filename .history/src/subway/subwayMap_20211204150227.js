import { getLocalStorage } from "../util/localStorage.js";
import { DOMS } from "../util/constant.js";

export default class SubwayMap {
  static resetScreen = () => {
    DOMS.$input.innerHTML = "";
    DOMS.$result.innerHTML = "";
  };

  static renderSubwayMap = () => {
    this.resetScreen();

    const lineManager = getLocalStorage("line-manager");
    const template = `
    <div class="map">
      ${
        lineManager
          ? lineManager
              .map((line) => {
                const lineName = Object.keys(line)[0];
                const stations = Object.values(line)[0];

                return `
                <h2>${lineName}</h2>
                <ul>
                  ${stations.map((station) => `<li>${station}</li>`).join("")}
                </ul>
                <br/>
              `;
              })
              .join("")
          : ""
      }
    </div>
  `;
    DOMS.$result.insertAdjacentHTML("beforeend", template);
  };
}
