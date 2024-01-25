var toggleBtn = document.getElementById("toggleBtn")
var form = document.getElementById("new-book-form")


var bookTable = document.getElementById("book-table")

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

  // Insert data into cells
  indexCell.appendChild(index);
  titleCell.appendChild(title);
  authorCell.appendChild(author);
  priceCell.appendChild(price);
}


// get last ID
function lastID() {
  let index = Number(bookTable.lastElementChild.lastElementChild.firstElementChild.innerText)
  return index + 1
}
