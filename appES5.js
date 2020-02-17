//вызов всех ивенотов
allEventRun();
// создаем конструкторы для обьектов
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function (book) {

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
UI.prototype.clearFields = function () {
    document.getElementById('title-id').value = "";
    document.getElementById('author-id').value = "";
    document.getElementById('code-id').value = "";
}
UI.prototype.showAlert = function (message, className) {

    //создаем div
    div = document.createElement('div');
    //добавили класс
    div.className = `alert ${className}`;
    //в див вставлям message
    div.appendChild(document.createTextNode(message));


    //что бы вставить div мы должны знать что идет перед ним и что идет после него

    const container = document.querySelector('.container');
    const form = document.querySelector('form');
    container.insertBefore(div, form);


    //пропадание div с success + error
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000)

}

//все события (events)
function allEventRun() {
    document.querySelector('form').addEventListener('submit', addBook);
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
        //обновляем поля инпута что бы не оставалась старая запись
        ui.showAlert('Книга была добавлена ', 'success');
        ui.clearFields();
    }

    e.preventDefault();
}