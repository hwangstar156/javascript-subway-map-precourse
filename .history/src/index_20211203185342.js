export default class Subway {
  constructor() {}

  init = () => {
    this.renderSubwayNameInput();
  };

  renderSubwayNameInput = () => {
    const template = this.createSubwayNameInputTemplate();
    const $app = document.querySelector("#app");
    $app.insertAdjacentHTML("beforeend", template);
  };

  createSubwayNameInputTemplate = () => {
    return `
      <form>
        <div>역 이름<div>
        <input id="station-name-input"/>
        <button id="station-add-button">역 추가</button>
      </form>
    `;
  };
}

const subway = new Subway();
subway.init();
