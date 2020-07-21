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
    // console.log(list);
    const row = document.createElement('tr');
    
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class='delete'>X</a></td>`;
    list.appendChild(row);
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
    // const errorDiv = document.querySelector('h1');
    // errorDiv.appendChild(div); 
}

UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
    //Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    //instantiate Book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    if(title === '' | author === '' | isbn === ''){
        //Error alert
        ui.showAlert('Please fill in all fields', 'error')
    } else {

    //Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', 'success');

    //Clear fields
    ui.clearFields();

    }
    

    
    
    
    e.preventDefault();
});