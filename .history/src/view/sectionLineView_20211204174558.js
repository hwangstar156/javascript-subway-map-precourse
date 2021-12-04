import {
  showInput,
  resetInput,
  resetResult,
  showResult,
} from "../util/reset-and-push";

export default class SectionLineView {
  renderSectionLineInput = () => {
    const template = this.createSectionLineInputTemplate();
    resetInput();
    showInput(template);
  };

  createSectionLineInputTemplate = (lineManager) => {
    return `
      <h2>구간을 수정할 노선을 선택해주세요.</h2>
      ${
        lineManager
          ? lineManager
              .map((line) => {
                const lineName = Object.keys(line);
                return `
                <button data-line-name=${lineName[0]} class="section-line-menu-button">
                  ${lineName[0]}
                </button>
              `;
              })
              .join("")
          : ""
      }
    `;
  };
}
