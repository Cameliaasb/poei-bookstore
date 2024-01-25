var toggleBtn = document.getElementById("toggleBtn")
var form = document.getElementById("new-book-form")
var bookTable = document.getElementById("book-table")
var editForm = document.getElementById("edit-book-form")

// toggle
toggleBtn.addEventListener("click", toggleForm )
function toggleForm() {
  form.classList.toggle("d-none")
}

// New book
form.addEventListener("submit", (e)=> submitBook(e))

function submitBook(e) {
  e.preventDefault()
  form.classList.toggle("d-none")
  // get data
  newBook = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    price: Number(document.getElementById("price").value)   // pas de gestion des erreurs
  }

  form.reset()
  addBook(newBook)
}

function addBook(newBook) {
  // Usable data for table
  var index = document.createTextNode(lastID())
  var title = document.createTextNode(newBook.title);
  var author = document.createTextNode(newBook.author);
  var price = document.createTextNode(isNaN(newBook.price)? "" : newBook.price);

  // Insert a row at the end of table
  var newRow = bookTable.insertRow();

  // Create the cells
  var indexCell = newRow.insertCell();
  var titleCell = newRow.insertCell();
  var authorCell = newRow.insertCell();
  var priceCell = newRow.insertCell();
  var editCell = newRow.insertCell();
  var deleteCell = newRow.insertCell();

  // Insert data into cells
  indexCell.appendChild(index);
  titleCell.appendChild(title);
  authorCell.appendChild(author);
  priceCell.appendChild(price);


  // Create and append edit button
  editCell.appendChild(createButton("Editer", "btn-primary edit", editRow));
  deleteCell.appendChild(createButton("supprimer", "btn-danger delete", deleteRow));
}


// get last ID
function lastID() {
  let lastItem = bookTable.lastElementChild
  let index = lastItem ? Number(lastItem.firstElementChild.innerText) : 0    // if no element before => index starts at 0
  return index + 1
}


function createButton(string, className, clickFunction) {
  var button = document.createElement("button");
  button.className = `btn ${className}`;
  button.textContent = string;
  button.addEventListener("click", function(event) {
    clickFunction(event);
  });
  return button
}


// EDIT
editForm.addEventListener("submit", (e) => editBook(e))

function editBook(e) {
  e.preventDefault()

  // identifie la ligne à modifier
  var row = document.getElementById("editing")
  row.removeAttribute('id')

  var indexCell = row.firstElementChild
  var titleCell = indexCell.nextSibling
  var authorCell = titleCell.nextSibling
  var priceCell = authorCell.nextSibling

  // effectue la modif
  indexCell.innerText = document.getElementById("edit-index").value
  titleCell.innerText = document.getElementById("edit-title").value
  authorCell.innerText  = document.getElementById("edit-author").value
  priceCell.innerText  = document.getElementById("edit-price").value
  editForm.classList.toggle("d-none");
}

function editRow(e) {
  //get row data
  var row = e.currentTarget.parentElement.parentElement
  row.setAttribute('id',"editing");
  var indexCell = row.firstElementChild
  var titleCell = indexCell.nextSibling
  var authorCell = titleCell.nextSibling
  var priceCell = authorCell.nextSibling

  // give it to object
  var book = {
    index: indexCell.innerText,
    title: titleCell.innerText,
    author: authorCell.innerText,
    price: priceCell.innerText,
  }

  handleEditForm(book)
}


function handleEditForm(book) {
  document.getElementById("edit-index").value = book.index
  document.getElementById("edit-title").value = book.title
  document.getElementById("edit-author").value = book.author
  document.getElementById("edit-price").value = book.price
  editForm.classList.toggle("d-none");
}


// DELETE
function deleteRow(e) {
  var row = e.currentTarget.parentElement.parentElement
  row.remove();
}
