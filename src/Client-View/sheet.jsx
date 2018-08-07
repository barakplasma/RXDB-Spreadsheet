import React, { Component } from "react";
import { last, append, remove } from "ramda";

import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";

class Spreadsheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SpreadsheetCells: []
    };
    this.editCell = this.editCell.bind(this);
  }
  async componentDidMount() {
    this.props.controller.selectFromModel(this.setState.bind(this));
  }

  componentWillUnmount() {
    this.props.controller.unsubscribeAll();
  }

  async editCell(changeArr) {
    console.log("changes ", changeArr);
    const changes = changeArr[0];
    const newCol = changes.col === 1 ? "A" : changes.col === 2 ? "B" : "C";
    this.props.controller.insertToModel(changes.row, newCol, changes.value);
  }

  transduceSpreadsheetCellsToReactDataSheet() {
    const defaultSpreadsheetCells = [
      [
        { value: "A1", id: "a1" },
        { value: "B1", id: "b1" },
        { value: "C1", id: "C1" }
      ],
      [
        { value: "A2", id: "a2" },
        { value: "B2", id: "b2" },
        { value: "C2", id: "C2" }
      ]
    ];
    // try {
    if (this.state.SpreadsheetCells.length === 0) {
      return defaultSpreadsheetCells;
    } else {
      const toDisplay = this.state.SpreadsheetCells.reduce(
        (prev, cell, index) => {
          const value = cell.cellContent;
          if (index === 0) {
            return [
              [
                { value: "", readOnly: true },
                { value: "A", readOnly: true },
                { value: "B", readOnly: true },
                { value: "C", readOnly: true }
              ],
              [{ value: index / 3 + 1, readOnly: true }, { value }]
            ];
          }
          if (cell.column === "A") {
            return [
              ...prev,
              [{ value: index / 3 + 1, readOnly: true }, { value }]
            ];
          } else {
            const lastInPrev = last(prev);
            return [...prev.slice(0, -1), [...append({ value }, lastInPrev)]];
          }
        },
        []
      );
      return toDisplay;
    }
  }

  render() {
    return (
      <div id="list-box" className="box">
        {
          <ReactDataSheet
            data={this.transduceSpreadsheetCellsToReactDataSheet()}
            valueRenderer={cell => cell.value}
            onCellsChanged={this.editCell}
          />
        }
      </div>
    );
  }
}

export default Spreadsheet;

//        <button onClick={() => this.setState({ SpreadsheetCells: [{ cellContent: 'a1', cellLocation: { row: 1, column: 'a' } }, { cellContent: 'a2', cellLocation: { row: 2, column: 'a' } }, { cellContent: 'b1', cellLocation: { row: 1, column: 'b' } }]})} >hit it</button>
