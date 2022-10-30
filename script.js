let myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


const addBookBtn = document.querySelector('#addbook');
addBookBtn.addEventListener('click', handleAddingBook);
const titleInput = document.querySelector('#newtitle');
const authorInput = document.querySelector('#newauthor');
const pagesInput = document.querySelector('#newpages');
const readInput = document.querySelector('#newread');

Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
}

const libraryMain = document.querySelector('main');
console.log(libraryMain);

function displayBooks(){
    let id = 0;
    for (const book of myLibrary) {
        let articleBody = document.createElement('article');
        articleBody.id = id;
        libraryMain.appendChild(articleBody);
        for (const property in book) {
            if (typeof book[property] != 'function') {
                if (["title", "author", "pages"].includes(property)) {
                    let currDiv = document.createElement('div');
                    currDiv.classList.add(property)
                    currDiv.classList.add('col12')
                    currDiv.textContent = book[property];
                    articleBody.appendChild(currDiv);
                } else {
                    let readDiv = document.createElement('div');
                    readDiv.textContent = 'Read?';
                    readDiv.classList.add('col1');
                    articleBody.appendChild(readDiv);
                    let checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.checked = book[property];
                    checkbox.classList.add('col2')
                    articleBody.appendChild(checkbox);
                }
            }
        }
        let deleteBookBtn = document.createElement('button');
        deleteBookBtn.textContent = 'Delete';
        deleteBookBtn.classList.add("col12")
        deleteBookBtn.classList.add('deletebtn')
        deleteBookBtn.addEventListener('click', deleteBook)
        articleBody.appendChild(deleteBookBtn);
        id += 1;
    }
}

function handleAddingBook() {
    event.preventDefault();
    let currTitle = titleInput.value;
    let currAuthor = authorInput.value;
    let currPages = pagesInput.value;
    let currRead = readInput.checked;
    let thisBook = new Book(currTitle, currAuthor, currPages, currRead)
    thisBook.addBookToLibrary();
    refreshLibrary();
}

function refreshLibrary() {
    let books = document.querySelectorAll('article')
    books.forEach(book => {
        console.log(book);
        book.remove();
    });
    displayBooks();
}

function deleteBook (e) {
    let index = e.target.parentElement.id;
    myLibrary.splice(index, 1);
    console.log(e.target.parentElement.id);
    console.log(myLibrary)
    refreshLibrary();
}