function paintCell(cell, row, col, color) {
  let previousColor = tableColorArray[row][col];
  if (previousColor !== color) {
    cell.css('background-color', color);
    tableColorArray[row][col]  = color;
    addToHistory([{'row' : row, 'col' : col}], previousColor, color);
  }
}

function pickColor(row, col, eventType) {
  if (eventType === 'click') {
    let cellColor = tableColorArray[row][col];
    colorPicker.val(cellColor);
  }

  $('#' + previousAction).prop('checked', true);
  currentAction = previousAction;
}

function fillWithColor(row, col, newColor) {
  previousColor = tableColorArray[row][col];
  fillCellWithColor(row, col, newColor);

  if (currentHistoryEntry.length > 0) {
    addToHistory(currentHistoryEntry, previousColor, newColor);
    currentHistoryEntry = [];
  }
}

function fillCellWithColor(row, col, newColor) {
  if (tableColorArray[row] != undefined && tableColorArray[row][col] != undefined && tableColorArray[row][col] != newColor) {
    table.find('tr').eq(row).find('td').eq(col).css('background-color', newColor);
    currentHistoryEntry.push({'row' : row, 'col': col});
    let color = tableColorArray[row][col];
    tableColorArray[row][col] = undefined;

    for (let rowIndex = row - 1; rowIndex <= row + 1; rowIndex++) {
      for (let colIndex = col - 1; colIndex <= col + 1; colIndex++) {
        if (!(rowIndex === row && colIndex === col)) {
          updateColor(rowIndex, colIndex, color, newColor);
        }
      }
    }

    tableColorArray[row][col] = newColor;
  }
}

function updateColor(row, col, color, newColor) {
  if (tableColorArray[row] != undefined && tableColorArray[row][col] != undefined && tableColorArray[row][col] === color) {
    fillCellWithColor(row, col, newColor);
  }
}