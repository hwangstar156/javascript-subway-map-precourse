import {
  resetInput,
  resetResult,
  showInput,
  showResult,
} from "../util/reset-and-push";

export default class StationNameView {
  renderStationNameInput = () => {
    const template = this.createStationNameInputTemplate();
    resetInput();
    showInput(template);
  };

  createStationNameInputTemplate = () => {
    return `
        <div>역 이름</div>
        <input id="station-name-input" placeholder="역 이름을 입력해주세요"/>
        <button id="station-add-button">역 추가</button>
    `;
  };

  renderStationNameTable = (stationNameLists) => {
    resetResult();
    const template = `
      <h1>🚂 지하철 역 목록</h1>
      <table border="1">
        <th>역 이름</th>
        <th>설정</th>
        ${
          stationNameLists &&
          stationNameLists
            .map((stationName) => {
              return `
              <tr data-station-name= ${stationName}>
                <td>${stationName}</td>
                <td>
                  <button class="station-delete-button">삭제</button>
                </td>
              </tr>`;
            })
            .join("")
        }
      </table>
    `;
    showResult(template);
  };
}
