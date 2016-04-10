/* Updates Shopping Cart Table */
function updateCartList() {
  // Loop over all stored values
  if(document.getElementById("cartTable").rows.length == 0) {
    store.forEach(function(key, val) {
      if(key != 'once' && key != 'BADGE' && key != 'FINALPRICE'){
        if(store.get(key).qnt != 0) {
          addRow('cartTable', store.get(key).name, store.get(key).qnt, store.get(key).price);
        }
      }
    });
  }
}

/* Ads items to the cart */
function addCart(item) {
  store.set('BADGE', ++document.getElementById("shopping-badge").innerHTML);
  var newPrice = store.get('FINALPRICE') + store.get(item.toUpperCase()).price;
  store.set('FINALPRICE', newPrice)
  store.set(item.toUpperCase(), { name: item, qnt: ++store.get(item.toUpperCase()).qnt, price: store.get(item.toUpperCase()).price});
  var tableRef = document.getElementById('cartTable'); // table reference
  var add = false; //
  for(var i = 0; i < tableRef.rows.length; i++) { // Loops through the table
    if(tableRef.rows[i].cells[0].innerHTML == item) {
      tableRef.rows[i].cells[1].getElementsByTagName("a")[0].innerHTML++;
      store.set(item.toUpperCase(), {name: item, qnt: ++store.get(item.toUpperCase()).qnt, price: store.get(item.toUpperCase()).price});
      add = false;
      break;
    } else {
      add = false;
    }
  }
  if(add == true || tableRef.rows.length == 0) addRow('cartTable', item, store.get(item.toUpperCase()).qnt, store.get(item.toUpperCase()).price);
  updateBadge();
}


/* Adds items to the table */
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

/* Updates the badge in the Main Menu*/
function getBadge() {
  document.getElementById("shopping-badge").innerHTML = store.get('BADGE');
}

/* Updates Main Menu shooping Cart */
function  updateMainMenuCart() {
  finalPrice = parseFloat(Math.round(store.get('FINALPRICE') * 100) / 100).toFixed(2);
  document.getElementById("total-price").innerHTML = "Total: € " + finalPrice;
  document.getElementById("price").innerHTML = "€ " + finalPrice;
}

/* First thing to do when loading Food Category*/
function doOnceFood() {
    // do the stuff
    store.set("once","yes");
    store.set("TOSTA", { name: "Tosta", qnt: 0, price: 2});
    store.set("SANDES", { name: "Sandes", qnt: 0, price: 1});
    store.set("BRUNCH", { name: "Brunch", qnt: 0, price: 5});
    store.set('BADGE', 0);
    store.set('FINALPRICE', 0);
}

/* Updates badge information in Item Information menus */
function updateBadge() {
  document.getElementById("shopping-badge").innerHTML = store.get('BADGE');
  finalPrice = parseFloat(Math.round(store.get('FINALPRICE') * 100) / 100).toFixed(2);
  document.getElementById("final-price").innerHTML = "€ " + finalPrice;
}

/* Updates Cart in Item Information menus */
function  updateCart() {
  finalPrice = parseFloat(Math.round(store.get('FINALPRICE') * 100) / 100).toFixed(2);
  document.getElementById("total-price").innerHTML = "Total: € " + finalPrice;
  updateCartList();
}


function deleteRow(row) {
  var d = row.parentNode.parentNode.rowIndex;
  var item = row.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML; // Name of the item
  var badge = store.get('BADGE');
  badge -= store.get(item.toUpperCase().qnt);
  store.set('BADGE', badge);
  store.remove(item.toUpperCase());
  document.getElementById('cartTable').deleteRow(d-1);
}

function tableclick(e) {
  if(!e)
   e = window.event;

  if(e.target.value == "Delete")
     deleteRow(e.target);

}
