/* Updates Shopping Cart Table */
function updateCartList() {
  // Loop over all stored values
  if(document.getElementById("cartTable").rows.length == 0) {
    store.forEach(function(key, val) {
      if(key != 'once' && key != 'BADGE' && key != 'FINALPRICE' && key != 'STATETABLE' && key != 'STATEOPEN'){
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
  store.set('FINALPRICE', newPrice);
  var newqnt = store.get(item.toUpperCase()).qnt + 1;
  store.set(item.toUpperCase(), { name: item, qnt: newqnt, price: store.get(item.toUpperCase()).price, state: "Em processamento"});
  var tableRef = document.getElementById('cartTable'); // table reference
  var add = false; //
  for(var i = 0; i < tableRef.rows.length; i++) { // Loops through the table
    if(tableRef.rows[i].cells[0].innerHTML == item) {
      tableRef.rows[i].cells[1].getElementsByTagName("a")[0].innerHTML++;
      store.set(item.toUpperCase(), {name: item, qnt: store.get(item.toUpperCase()).qnt++, price: store.get(item.toUpperCase()).price, state: "Em processamento"});
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
// -------------------------------------------------------

// ----------------------------------------------------------------
  // Insert a cell in the row at index 0
  var newCell  = newRow.insertCell(3);
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
  document.getElementsByClassName("total-price")[0].innerHTML = "Total: € " + finalPrice;
  document.getElementsByClassName("final-price")[0].innerHTML = "€ " + finalPrice;
}

/* First thing to do when loading Food Category*/
function doOnceFood() {
    // do the stuff
    store.set("once","yes");
    store.set("TOSTA", { name: "Tosta", qnt: 0, price: 2, state: "Em processamento"});
    store.set("SANDES", { name: "Sandes", qnt: 0, price: 1, state: "Em processamento"});
    store.set("BRUNCH", { name: "Brunch", qnt: 0, price: 5, state: "Em processamento"});

    store.set("LIMONADA", { name: "Limonada", qnt: 0, price: 1, state: "Em processamento"});
    store.set("ICEDTEA", { name: "IcedTea", qnt: 0, price: 1, state: "Em processamento"});
    store.set("BATIDO", { name: "Batido", qnt: 0, price: 2.5, state: "Em processamento"});

    store.set("SWEETCAPPUCCINO", { name: "SweetCappuccino", qnt: 0, price: 1.5, state: "Em processamento"});
    store.set("SPECIALMOKA", { name: "SpecialMoka", qnt: 0, price: 2.5, state: "Em processamento"});
    store.set("CAPPUCHOC", { name: "Cappuchoc", qnt: 0, price: 2.0, state: "Em processamento"});

    store.set('BADGE', 0);
    store.set('FINALPRICE', 0);
    store.set('STATETABLE', list);
    store.set('STATEOPEN', 0);
}

/* Updates badge information in Item Information menus */
function updateBadge() {
  document.getElementById("shopping-badge").innerHTML = store.get('BADGE');
  finalPrice = parseFloat(Math.round(store.get('FINALPRICE') * 100) / 100).toFixed(2);
  document.getElementsByClassName("final-price")[0].innerHTML = "€ " + finalPrice;
}

/* Updates Cart in Item Information menus */
function  updateCart() {
  checkBadge();
  finalPrice = parseFloat(Math.round(store.get('FINALPRICE') * 100) / 100).toFixed(2);
  document.getElementsByClassName("total-price")[0].innerHTML = "Total: € " + finalPrice;
  document.getElementsByClassName("final-price")[0].innerHTML = "€ " + finalPrice;
  document.getElementsByClassName("final-price")[1].innerHTML = "€ " + finalPrice;
  updateCartList();
}


function deleteRow(row) {
  var d = row.parentNode.parentNode.rowIndex; // Row index
  var item = row.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML; // Name of the item
  var badge = store.get('BADGE'); // Badge information
  badge -= store.get(item.toUpperCase()).qnt;
  store.set('BADGE', badge); // Updates the badge
  var price = store.get('FINALPRICE') - (store.get(item.toUpperCase()).qnt * store.get(item.toUpperCase()).price);
  store.set('FINALPRICE', price); // Updates the final price
  var cpyPrice = store.get(item.toUpperCase()).price;
  store.remove(item.toUpperCase()); // Removes the item form the local storage
  store.set(item.toUpperCase(), { name: item, qnt: 0, price: cpyPrice, state: "Em processamento"});
  document.getElementById('cartTable').deleteRow(d-1); // Deletes the item
  updateBadge();
  updateCart();

  //updateMainMenuCart();
}

function DecrementQuantity(row) {
  var d = row.parentNode.parentNode.rowIndex; // Row index
  var item = row.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML; // Name of the item
  if (store.get(item.toUpperCase()).qnt > 1) {
    var newQnt = store.get(item.toUpperCase()).qnt - 1;
    cpyPrice = store.get(item.toUpperCase()).price;
    store.set(item.toUpperCase(), { name: item, qnt: newQnt, price: cpyPrice, state: "Em processamento"});

    var badge = store.get('BADGE'); // Badge information
    store.set('BADGE', --badge); // Updates the badge

    var price = store.get('FINALPRICE') - store.get(item.toUpperCase()).price;
    store.set('FINALPRICE', price); // Updates the final price

    row.parentNode.parentNode.getElementsByTagName("a")[0].innerHTML = newQnt; // Quantity of the item

    updateBadge();
    updateCart();
  }
}

function IncrementQuantity(row) {
  var d = row.parentNode.parentNode.rowIndex; // Row index
  var item = row.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML; // Name of the item
  addCart(item);
  updateCart();
}

/* Function responsible for handeling table clicks*/
function tableclick(e) {
  if (!e)
   e = window.event;
  if (e.target.value == "Delete")
     deleteRow(e.target);
  else if (e.target.value == "Minus")
     DecrementQuantity(e.target);
  else if (e.target.value == "Plus")
     IncrementQuantity(e.target);

}

function searchItem(item) {

}


function ActionConfirmed(id) {
    $("#confirmModal").modal("hide"); // Hides window when confirm is clicked
}


function cashPayInfo() {
  document.getElementsByClassName("final-price")[1].innerHTML = "Total: € " + finalPrice; // Final price from cash option
  document.getElementsByClassName("final-price")[2].innerHTML = " Total: € " + finalPrice; // Final price from credit card option
}

function addToProcessTable(tableID, itemName, itemQnt, itemPrice, state) {
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

  var newCell  = newRow.insertCell(1);
  // Append a text node to the cell
  var clone = document.getElementById("qnt").cloneNode(true);
  clone.text = itemQnt;
  //var newText  = document.createTextNode(itemQnt);
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

// ----------------------------------------------------------------
  // Insert a cell in the row at index 0
  var newCell  = newRow.insertCell(3);
  // Append a text node to the cell
  //var newText  = document.createTextNode(state);


  var para = document.createElement("p");                       // Create a <p> element
  var t = document.createTextNode(state[0]);      // Create a text node
  para.appendChild(t);
  para.style.color = state[1]
  para.style.fontSize = "15px"
  newCell.appendChild(para);
// ----------------------------------------------------------------
}


function paymentDone() {
  // Loop over all stored values
  $('#shoopingCart, #cashPay, #payNow, #confirmModal, #payInGroup, #crediCardPay, #stateMenu').modal('hide');
  var list = [];
  statelist = store.get('STATETABLE');
  for (x in statelist) {
    list.push(statelist[x])
  }
  if(document.getElementById("cartTable").rows.length != 0) {
    store.forEach(function(key, val) {
      if(key != 'once' && key != 'BADGE' && key != 'FINALPRICE' && key != 'STATETABLE' && key != 'STATEOPEN'){
        if(store.get(key).qnt != 0) {
          //addToProcessTable('stateTable', store.get(key).name, store.get(key).qnt, store.get(key).price);
          list.push(store.get(key))

          var cpyPrice = store.get(key.toUpperCase()).price;
          store.remove(key.toUpperCase()); // Removes the item form the local storage
          store.set(key.toUpperCase(), { name: key, qnt: 0, price: cpyPrice, state: "Em processamento"});

        }
      }
    });
    store.set('STATETABLE', list);
    store.set('BADGE', 0);
    store.set('FINALPRICE', 0);
    updateBadge();
    updateCart();
    updateCartList();
    $('#processOrder').modal('show');

  }
}

// Function used to update state cart list
function updateStateCard() {
  if (document.getElementById("stateTable").rows.length != store.get('STATETABLE').length) {
    var list = store.get('STATETABLE');
    var total = 0;
    for (key in list) {
      if (list[key].state.localeCompare("Em processamento") == 0)
        addToProcessTable('stateTable', list[key].name, list[key].qnt, list[key].price, ["Em processamento", "orange"]);
      else
        addToProcessTable('stateTable', list[key].name, list[key].qnt, list[key].price, ["Processado", "green"]);
      total += list[key].price * list[key].qnt;
    }
    total = parseFloat(Math.round(total * 100) / 100).toFixed(2);
    document.getElementsByClassName("processing-price")[0].innerHTML = "Total: € " + total;
  }

}

function simulateProcessing() {
  store.set('STATEOPEN',1);
  var list = store.get('STATETABLE');
  for (key in list) {
    list[key].state = "Processado";
  }
  store.set('STATETABLE', list);
  updateStateCard();
  destroyModals();
}
function destroyModals(){
  location.reload();
}

function closeModals(numb) {
  $('#shoopingCart, #processOrder, #keyPad, #cashPay, #payNow, #confirmModal, #payInGroup, #crediCardPay, #stateMenu').modal('hide');
  destroyModals();
  if(numb == 2) {
    store.set('STATEOPEN',1);
  } else {
    store.set('STATEOPEN',0);
  }
}


function ActionConfirmed() {
  $('#payInGroup,#confirmModal, #keyPad').modal('hide');
}

function selectedOption() {
  var qnt = $('#payDividor').find(":selected").index();
  price = store.get('FINALPRICE');
  total = parseFloat(Math.round((price/(qnt+2)) * 100) / 100).toFixed(2);
  document.getElementsByClassName("totalDividerText")[0].innerHTML = "Total por pessoa: €" + total;

}

function addPin(val) {
  $('#PIN').val($('#PIN').val() + val);
}
function goBackPIN() {

}

function checkPIN() {
  if ($('#PIN').val().length != 0) paymentDone();
  else alert("Introduza o PIN")
}

function checkBadge() {
  var badge = store.get('BADGE');
  if (badge == 0) {
    $('a.payButton').attr('disabled', true);
    $('a.payButton').prop('disabled', true);
    $('a.divideButton').attr('disabled', true);
    $('a.divideButton').prop('disabled', true);
  } else {
    $('a.payButton').attr('disabled', false);
    $('a.payButton').prop('disabled', false);
    $('a.divideButton').attr('disabled', false);
    $('a.divideButton').prop('disabled', false);
  }
}
