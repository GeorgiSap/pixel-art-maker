function undo() {
  applyChanges(undoHistory[undoState], true);
  undoState--;
  redoButton.prop('disabled', false);
  if (undoState < 0) {
    undoButton.prop('disabled', true);
  }
}

function redo() {
  undoState++;
  applyChanges(undoHistory[undoState], false);

  if (undoState >= undoHistory.length - 1) {
    redoButton.prop('disabled', true);
  }
  undoButton.prop('disabled', false);
}

function applyChanges(historyEntry, isUndo) {
  let newColor = isUndo ? historyEntry.fromColor : historyEntry.toColor;

  historyEntry.cells.forEach(function(cell) {
    table.find('tr').eq(cell.row).find('td').eq(cell.col).css('background-color', newColor);
    tableColorArray[cell.row][cell.col]  = newColor;
  });
}

function addToHistory(changedCells, fromColor, toColor) {
  undoButton.prop('disabled', false);
  redoButton.prop('disabled', true);

  if (undoState !== undoHistory.length - 1) {
    preserveUndoneChanges();
  }

  let historyEntry = {'cells':changedCells, 'fromColor':fromColor, 'toColor':toColor};
  undoHistory.push(historyEntry);
  undoState++;
  
  if (undoHistory.length > MAX_HISTORY_SIZE) {
    undoHistory.shift();
    undoState--;
  }
}

function preserveUndoneChanges() {
  for (let index = undoHistory.length - 1; index > undoState; index--) {
    let currentEntry = undoHistory[index];
    let newEntry = {};
    newEntry.cells = currentEntry.cells;
    newEntry.fromColor = currentEntry.toColor;
    newEntry.toColor = currentEntry.fromColor;
    undoHistory.push(newEntry);
  }

  undoState = undoHistory.length - 1;
  while (undoHistory.length > MAX_HISTORY_SIZE) {
    undoHistory.shift();
    undoState--;
  }
}