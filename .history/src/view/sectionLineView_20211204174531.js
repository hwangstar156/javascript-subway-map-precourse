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
}
