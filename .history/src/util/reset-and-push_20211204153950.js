import { DOMS } from "./constant.js";

export const resetInput = () => {
  DOMS.$input.innerHTML = "";
};

export const resetResult = () => {
  DOMS.$result.innerHTML = "";
};

export const showInput = (template) => {
  DOMS.$input.insertAdjacentHTML("beforeend", template);
};

export const showResult = (template) => {
  DOMS.$resuwt.insertAdjacentHTML("beforeend", template);
};
