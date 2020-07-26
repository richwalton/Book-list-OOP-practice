// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    
    const row = document.createElement('tr');
    
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class='delete'>X</a></td>`;
    
    list.appendChild(row);
    console.log('working');
}
    
//Show Alert
UI.prototype.showAlert = function(message, className) {
    //Create div
    const div = document.createElement('div');
    //Add Class
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

//Delete book
UI.prototype.deleteBook = function(target) {
       target.parentElement.parentElement.remove(); 
}

// Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


// Storage Constructor
function Storage() {}
Storage.prototype.getBooks = function(){
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}
Storage.prototype.displayBooks = function(){
    const books = Storage.prototype.getBooks();

    books.forEach(function(book){
        const ui = new UI;
        //Add book to UI
        ui.addBookToList(book);
    });
}

Storage.prototype.addBook = function(book){
    const books = Storage.prototype.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
}

Storage.prototype.removeBook = function(isbn){
    const books = Storage.prototype.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Storage.prototype.displayBooks);

// Event Listeners for add a book
document.getElementById('book-form').addEventListener('submit', function(e){
    //Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    //Instantiate Book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    
    // Validate
    if(title === '' | author === '' | isbn === ''){
        //Error alert
        ui.showAlert('Please fill in all fields', 'error')
    } else {

    //Add book to list
    ui.addBookToList(book);

    // Add to local storage
    Storage.prototype.addBook(book);

    // Show success
    ui.showAlert('Book Added!', 'success');

    //Clear fields
    ui.clearFields();

    }
    e.preventDefault();
});
// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    // Instantiate UI
    const ui = new UI();
    
    if(e.target.className === 'delete') {
    
    ui.deleteBook(e.target);

    // Remove from local storage
    Storage.prototype.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show message
    ui.showAlert('Book Removed', 'success');
    }
    e.preventDefault();
});