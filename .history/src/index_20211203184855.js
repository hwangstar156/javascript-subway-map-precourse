export default class Subway {
  constructor() {}

  init = () => {};

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
