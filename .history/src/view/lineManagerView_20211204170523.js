import {
  resetInput,
  resetResult,
  showInput,
  showResult,
} from "../util/reset-and-push.js";

export default class LineManagerView {
  renderLineManagerInput = (stationNameLists) => {
    const template = this.createLineManagerInputTemplate(stationNameLists);
    resetInput();
    showInput(template);
  };

  createLineManagerInputTemplate = (stationNameLists) => {
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

  renderLineManager = (lineManagerLists) => {
    resetResult();
    const template = `
      <h1>🚂지하철 노선 목록</h1>
      <br/>
      <table border="1">
        <th>노선 이름</th>
        <th>상행 종점역</th>
        <th>하행 종점역</th>
        <th>설정</th>
        ${
          lineManagerLists
            ? lineManagerLists
                .map((lineManager) => {
                  const lineName = Object.keys(lineManager);
                  const stations = Object.values(lineManager);
                  return `
                    <tr data-line-name=${lineName[0]}>
                      <td>${lineName[0]}</td>
                      <td>${stations[0][0]}</td>
                      <td>${stations[0][stations[0].length - 1]}</td>
                      <td>
                        <button class="line-delete-button">삭제</button>
                      </td>
                    </tr>
                  `;
                })
                .join("")
            : ""
        }
      </table>
    `;
    showResult(template);
  };

  resetLineManagerInput = () => {
    const $lineManagerInput = document.querySelector("#line-name-input");
    $lineManagerInput.value = "";
  };
}
