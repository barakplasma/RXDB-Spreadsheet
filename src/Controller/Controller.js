import * as Database from "../Model/Database";
import { range } from "ramda";

export default class Controller {
  constructor(databaseConnection) {
    if (typeof databaseConnection === undefined) {
      throw new Error("Cannot be called directly");
    }
    this.db = databaseConnection;
    this.subs = [];
  }

  static async build() {
    const databaseConnection = await Database.get();
    return new Controller(databaseConnection);
  }

  async initializeData() {
    this.selectFromModel(async SpreadsheetCells => {
      if (SpreadsheetCells.SpreadsheetCells.length < 3) {
        const columns = ["A", "B", "C"];
        const rows = range(1, 21);
        await Promise.all(
          rows.map(row =>
            Promise.all(
              columns.map(col => this.insertToModel(row, col, `${col}${row}`))
            )
          )
        );
      }
    });
  }

  async insertToModel(cellRow, cellColumn, newCellContent) {
    return await this.db.spreadsheet.upsert({
      cellContent: newCellContent,
      id: `${cellRow}_${cellColumn}`,
      row: cellRow,
      column: cellColumn
    });
  }

  async selectFromModel(callback) {
    const sub = this.db.spreadsheet
      .find()
      .sort({ row: 1, column: 1 })
      .$.subscribe(SpreadsheetCells => {
        if (!SpreadsheetCells) return;
        console.log("reload SpreadsheetCells-list ");
        callback({ SpreadsheetCells });
      });
    this.subs.push(sub);
  }

  unsubscribeAll() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}

/**
 * this.state.SpreadsheetCells.forEach(cell => {
        toRender[cell.cellLocation.row][cell.cellLocation.column.charCodeAt(0) - 97] = {
          value: cell.cellContent
        };
      });
 */
