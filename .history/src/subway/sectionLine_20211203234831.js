import { getLocalStorage } from "../util/localStorage.js";

export default class SectionLine {
  static renderSectionLineInput = () => {
    const template = this.createSectionLineInputTemplate();
    const $input = document.querySelector("#input");
    $input.innerHTML = "";
    $input.insertAdjacentHTML("beforeend", template);
  };

  static createSectionLineInputTemplate = () => {
    const lineManager = getLocalStorage("line-manager");

    return `
      <h2>구간을 수정할 노선을 선택해주세요.</h2>
      ${
        lineManager
          ? lineManager.map((line) => {
              return `
                <button data-line-name>${line.name}</button>
              `;
            })
          : ""
      }
    `;
  };
}
