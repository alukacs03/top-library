let myLibrary = [];

class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
}


const form = document.getElementById('bookForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleAddingBook();
});
const titleInput = document.querySelector('#newtitle');
const authorInput = document.querySelector('#newauthor');
const pagesInput = document.querySelector('#newpages');
const readInput = document.querySelector('#newread');

Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
}

const libraryMain = document.querySelector('main');

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
                    let readDisplay = document.createElement('div');
                    if (book[property] == true) {
                        readDisplay.textContent = 'Yep!'
                    } else {
                        readDisplay.textContent = 'Not yet :('
                    }
                    readDisplay.classList.add('col2');
                    articleBody.appendChild(readDisplay);
                    let readbutton = document.createElement('button');
                    readbutton.textContent = "Toggle Read";
                    readbutton.classList.add('col12');
                    readbutton.classList.add('readbutton')
                    readbutton.addEventListener('click', toggleRead);
                    articleBody.appendChild(readbutton);
                }
            }
        }
        let deleteBookBtn = document.createElement('button');
        deleteBookBtn.textContent = 'Delete';
        deleteBookBtn.classList.add("col12")
        deleteBookBtn.classList.add('deletebutton')
        deleteBookBtn.addEventListener('click', deleteBook)
        articleBody.appendChild(deleteBookBtn);
        id += 1;
    }
}

function handleAddingBook() {
    let currTitle = titleInput.value;
    let currAuthor = authorInput.value;
    let currPages = pagesInput.value;
    let currRead = readInput.checked;
    let thisBook = new Book(currTitle, currAuthor, currPages, currRead)
    thisBook.addBookToLibrary();
    refreshLibrary();
    let form = document.getElementById('bookForm');
    form.reset();
}

function refreshLibrary() {
    let books = document.querySelectorAll('article')
    books.forEach(book => {
        book.remove();
    });
    displayBooks();
}

function deleteBook (e) {
    let index = e.target.parentElement.id;
    myLibrary.splice(index, 1);
    refreshLibrary();
}

function toggleRead (e) {
    let index = e.target.parentElement.id;
    myLibrary[index].read = !myLibrary[index].read;
    refreshLibrary();
}