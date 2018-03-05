const MAX_HISTORY_SIZE = 30;
const WHITE_COLOR = '#ffffff';
const Y_KEY = 89;
const Z_KEY = 90;

let tableColorArray;
let table;
let colorPicker;
let undoButton;
let redoButton;
let previousAction;
let currentAction;
let undoHistory;
let currentHistoryEntry;
let undoState;

$(function() {
  initValues();
});

function makeGrid() {
  let inputHeight = $('#input_height').val();
  let inputWidth = $('#input_width').val();

  resetValues();

  let tableContent;
  for (let row = 0; row < inputHeight; row++) {
    tableColorArray[row] = [];
    tableContent += '<tr>';
    for (let col = 0; col < inputWidth; col++) {
      tableContent += '<td> </td>';
      tableColorArray[row][col] = WHITE_COLOR;
    }
    tableContent += '</tr>';
  }

  table.append(tableContent);
}

function initValues() {
  table = $('#pixel_canvas');
  colorPicker = $('#color_picker');
  undoButton = $("#undo-button");
  redoButton = $("#redo-button");
}

function resetValues() {
  table.empty();
  tableColorArray = [];
  undoHistory = [];
  currentHistoryEntry = [];
  undoState = -1;
  previousAction = undefined;
  currentAction = 'pencil';
}