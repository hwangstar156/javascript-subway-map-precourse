import { getLocalStorage } from "../util/localStorage.js";

export default class SubwayMap {
  static renderSubwayMap = () => {
    const lineManager = getLocalStorage("line-manager");
    const template = `
    <div class="map">
      ${
        lineManager
          ? lineManager.map((line) => {
              const lineName = Object.keys(line)[0];
              const stations = Object.values(line);

              return `
                <h2>${lineName}</h2>
                <ul>
                  ${stations.map((station) => `<li>${station}</li>`)}
                <ul>
              `;
            })
          : ""
      }
    </div>
  `;
  };
}
