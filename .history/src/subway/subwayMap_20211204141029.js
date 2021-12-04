import { getLocalStorage } from "../util/localStorage.js";

export default class SubwayMap {
  static resetScreen = () => {
    const $input = document.querySelector("#input");
    const $result = document.querySelector("#result");
    $input.innerHTML = "";
    $result.innerHTML = "";
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
                console.log(stations);
                return `
                <h2>${lineName}</h2>
                <ul>
                  ${stations.map((station) => `<li>${station}</li>`).join("")}
                <ul>
              `;
              })
              .join("")
          : ""
      }
    </div>
  `;
    const $result = document.querySelector("#result");
    $result.insertAdjacentHTML("beforeend", template);
  };
}
