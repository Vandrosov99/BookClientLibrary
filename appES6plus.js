//вызов всех ивенотов

// создаем конструкторы для обьектов
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        //берем наш елемент с tbody
        const list = document.getElementById('bookList');

        //создаем tr элемент для tbody части таблицы
        const row = document.createElement('tr');

        //вставляем колонки
        row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete">X</a></td>`

        //вставляем в tbody конструкицю tr ---> td
        list.appendChild(row)
    }
    clearFields() {
        document.getElementById('title-id').value = "";
        document.getElementById('author-id').value = "";
        document.getElementById('code-id').value = "";
    }
    showAlert(message, className, book) {
        let test = (book !== undefined) ? book : 'lol';
        //название книги
        // bookName = book.title;
        //создаем div
        const div = document.createElement('div');
        //добавили класс
        div.className = `alert ${className}`;
        //в див вставлям message
        if (book === undefined) {
            book = '';
            div.appendChild(document.createTextNode(message));
        } else {
            div.appendChild(document.createTextNode(message + test.title));
        }



        //что бы вставить div мы должны знать что идет перед ним и что идет после него

        const container = document.querySelector('.container');
        const form = document.querySelector('form');
        container.insertBefore(div, form);


        //пропадание div с success + error
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000)
    }
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
            // console.log(target)
            const ui = new UI();
            ui.showAlert("Книга удалена", 'success');

        }

    }
}
//Local storage
class Store {

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBook() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI();
            ui.addBookToList(book);
        })
    }
    static addBook(book) {

        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static deleteBook(trg) {
        const books = Store.getBooks();

        if (trg.className === 'delete') {
            const isbn = trg.parentElement.previousElementSibling.textContent;
            books.forEach(function (book, index) {
                if (book.isbn === isbn) {
                    books.splice(index, 1);
                }
            });

            localStorage.setItem('books', JSON.stringify(books));
        }

        // books.forEach(function (book, index) {
        //     if (trg.className === 'delete') {
        //         books.splice(index, 1);
        //     }

        // })


    }
}

//все события (events)
function allEventRun() {

    document.addEventListener('DOMContentLoaded', Store.displayBook);
    //добавление книг 
    document.querySelector('form').addEventListener('submit', addBook);

    //удаление книг 

    document.querySelector('#bookList').addEventListener('click', deleteItem)
}

function addBook(e) {

    //получаем значения с инпутов
    const title = document.getElementById('title-id').value,
        author = document.getElementById('author-id').value,
        isbn = document.getElementById('code-id').value

    //создаем экземпляр класса бук ( при каждом клике новый экземпляр)
    const book = new Book(title, author, isbn);

    //создаем экземпляр класса UI(при каждом клике новый экземпляр)
    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Заполните пожалуйста все поля', 'error');
    } else {
        ui.addBookToList(book);
        Store.addBook(book);
        //обновляем поля инпута что бы не оставалась старая запись
        ui.showAlert('Книга была добавлена ', 'success', book);
        ui.clearFields();
    }

    e.preventDefault();
}


function deleteItem(e) {

    const ui = new UI();
    ui.deleteBook(e.target);
    Store.deleteBook(e.target);

    // ui.showAlert("Книга удалена", 'success');
    // console.log("test");
    e.preventDefault();
}

allEventRun();