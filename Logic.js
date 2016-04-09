<!-- Updates Shopping Cart Table -->
function updateCartList() {
  // Loop over all stored values
  if(document.getElementById("cartTable").rows.length == 0) {
    store.forEach(function(key, val) {
      if(key != 'once' && key != 'BADGE'){
        addRow('cartTable', store.get(key).name, store.get(key).qnt, store.get(key).price);
      }
    });
  }
}

<!-- Adds items to the table -->
function addRow(tableID, itemName, itemQnt, itemPrice) {
  // Get a reference to the table
  var tableRef = document.getElementById(tableID);
  // Insert a row in the table at row index 0
  var newRow   = tableRef.insertRow(0);
  //store.set('COUNTER', store.get('COUNTER')++);
  // Insert a cell in the row at index 0
  var newCell  = newRow.insertCell(0);
  // Append a text node to the cell
  var newText  = document.createTextNode(itemName);
  newCell.appendChild(newText);

// ----------------------------------------------------------------
  // Insert a cell in the row at index 0
  var newCell  = newRow.insertCell(1);
  var clone = document.getElementById("minus-button").cloneNode(true),
  timestamp = Date.now();
  clone.id+='_'+timestamp;
  newCell.appendChild(clone);

  // Append a text node to the cell
  var clone = document.getElementById("qnt").cloneNode(true);
  clone.text = itemQnt;
  //var newText  = document.createTextNode(itemQnt);
  newCell.appendChild(clone);

  var clone = document.getElementById("plus-button").cloneNode(true),
  timestamp = Date.now();
  clone.id+='_'+timestamp;
  newCell.appendChild(clone);
// ----------------------------------------------------------------
// ----------------------------------------------------------------
  // Insert a cell in the row at index 0
  var newCell  = newRow.insertCell(2);
  // Append a text node to the cell
  itemPrice = parseFloat(Math.round(itemPrice * 100) / 100).toFixed(2);
  var newText  = document.createTextNode("€ "+itemPrice);
  newCell.appendChild(newText);
// ----------------------------------------------------------------
  // Insert a cell in the row at index 0
  var newCell  = newRow.insertCell(3);
  // Append a text node to the celL
  var clone = document.getElementById("edit-button").cloneNode(true),
  timestamp = Date.now();
  clone.id+='_'+timestamp;
  newCell.appendChild(clone);
// -------------------------------------------------------

// ----------------------------------------------------------------
  // Insert a cell in the row at index 0
  var newCell  = newRow.insertCell(4);
  // Append a text node to the celL

  var clone = document.getElementById("trash-button").cloneNode(true),
  timestamp = Date.now();
  clone.id+='_'+timestamp;

  newCell.appendChild(clone);


// -------------------------------------------------------

}
