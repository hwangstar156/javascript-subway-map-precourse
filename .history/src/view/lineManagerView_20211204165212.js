export default class LineManagerView {
  renderLineManagerInput = (stationNameLists) => {
    const template = this.createLineManagerInputTemplate(stationNameLists);
    resetInput();
    showInput(template);
  };

  static createLineManagerInputTemplate = (stationNameLists) => {
    return `
        <div>노선 이름<div>
        <input id="line-name-input" placeholder="노선 이름을 입력해주세요"/>
        <br/>
        <br/>
        상행종점
        <select id="line-start-station-selector">
          ${
            stationNameLists &&
            stationNameLists.map((stationName) => {
              return `
              <option value=${stationName}>${stationName}</option>
            `;
            })
          }
        </select>
        <br/>
        하행종점
        <select id="line-end-station-selector">
        ${
          stationNameLists &&
          stationNameLists.map((stationName) => {
            return `
            <option value=${stationName}>${stationName}</option>
          `;
          })
        }
        </select>
        <br/>
        <br/>
        <button id="line-add-button">노선 추가</button>
    `;
  };
}
