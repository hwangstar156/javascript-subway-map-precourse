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

  renderSectionLineEdit = (target) => {
    const template = this.createSectionLineEditTemplate(target);
    resetResult();
    showResult(template);
  };

  static createSectionLineEditTemplate = (lineName) => {
    const stationNames = getLocalStorage("station-name");
    const stations = this.getStations(lineName);

    return `
        <h2>${lineName} 관리</h2>
        <h3>구간 등록</h3>
        <select id="section-station-selector">
          ${
            stationNames &&
            stationNames.map((name) => {
              return `
              <option value=${name}>${name}</option>
            `;
            })
          }
        </select>
        <input type="number" placeholder="순서" id="section-order-input"/>
        <button id="section-add-button" data-line-name=${lineName}>등록</button>
        <br/>
        <br/>
        <br/>
        <table border="1">
          <th>순서</th>
          <th>이름</th>
          <th>설정</th>
          ${
            stations
              ? stations
                  .map((station, idx) => {
                    return `
                <tr>
                  <td>${idx}</td>
                  <td>${station}</td>
                  <td>
                    <button class="section-delete-button" data-line-name=${lineName} data-idx=${idx}>노선에서 제거</button>
                  </td>
                </tr>
              `;
                  })
                  .join("")
              : ""
          }
        </table>
      `;
  };
}
