const bookForm = document.getElementById('book-form')
const bookList = document.getElementById('book-list');
const title = document.getElementById('title');
const author = document.getElementById('author');
const isbn = document.getElementById('isbn');
const container = document.querySelector('.container');

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
        bookList.appendChild(row);
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div, bookForm);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        this.title = '';
        this.author = '';
        this.isbn = '';
    }
}
//Local Storage
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => {
            const ui = new UI;
            ui.addBookToList(book);
        })
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(book));

    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        console.log('remove', books);

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listeners for add book
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = this.title.value;
    const author = this.author.value;
    const isbn = this.isbn.value;

    //Instantiate book
    const book = new Book(title, author, isbn);
    const ui = new UI();
    if(title.trim() && author.trim() && isbn.trim()){
        ui.addBookToList(book);
        Store.addBook(book);

        ui.showAlert('Book added!', 'success');
        ui.clearFields();
    } else {
        ui.showAlert('Please fill in all the fields', 'error');
    }
})

//Event Listener for delete
bookList.addEventListener('click', (e) => {
    e.preventDefault();

    const ui = new UI();
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    ui.showAlert('Book Removed!', 'success');
})

