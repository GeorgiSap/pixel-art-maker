$(function() {
  initValues();

  $('#sizePicker').on('submit', function(event) {
    event.preventDefault();
    makeGrid();
  });

  table.on('click auxclick', 'td', function(event) {
    let clickedCell = $(this);
    let row = clickedCell.parent().index();
    let col = clickedCell.index();
    let colorBasedOnEventType = (event.type === 'click') ? colorPicker.val() : WHITE_COLOR;
    let checkedRadioButtonId = $('input:radio[name=action]:checked').attr('id');

    switch (checkedRadioButtonId) {
      case 'pencil' :
      paintCell(clickedCell, row, col, colorBasedOnEventType);
        break;
      case 'fill_with_color' :
      fillWithColor(row, col, colorBasedOnEventType);
        break;
      case 'eraser' : 
      paintCell(clickedCell, row, col, WHITE_COLOR);
        break;
      case 'pick_color' :
      pickColor(row, col, event.type);
        break;
    }
  });

  $('input:radio[name=action]').change(function() {
    previousAction = currentAction;
    currentAction = $('input:radio[name=action]:checked').attr('id');
  });

  table.contextmenu(function() {
    return false;
  });

  undoButton.click(function() {
    undo();
  });

  redoButton.click(function() {
    redo();
  });

  $(document).keydown(function(event) {
    if(event.which === Z_KEY && event.ctrlKey ) {
      event.preventDefault();
      if (!(undoButton.prop("disabled"))) {
        undo();
      }
    }
    if(event.which === Y_KEY && event.ctrlKey ) {
      event.preventDefault();
      if (!(redoButton.prop("disabled"))) {
        redo();
      }
    }   
  });
});