let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        return this.title +" by " + this.author + ", " + this.pages + " pages, " + this.read;
    }
}

let addBookToLibrary = function(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read));
}

let render = function(){
    let masterDisplay = document.getElementById("masterList");

    for(let i in myLibrary){
        let bookinfo = document.createElement("div");
        bookinfo.innerHTML = myLibrary[i].info();
        bookinfo.setAttribute("data-bookIndex", i);
        bookinfo.id = "book" + i;
        bookinfo.className = "bookEntry";
        let toggleButton = document.createElement("button");
        toggleButton.innerHTML = "read/not read";
        toggleButton.onclick = function(){
            readToggle(i);
        }
        let removeButton = document.createElement("button");
        removeButton.innerHTML= "remove";
        removeButton.onclick = function(){
            removeBook(i);
        };
        bookinfo.appendChild(toggleButton);
        bookinfo.appendChild(removeButton);
        masterDisplay.appendChild(bookinfo); 
    }
}

let removeBook = function(entry){
    myLibrary.splice(entry,1);
    reset();
    render();
}

let readToggle = function(entry){
    if(myLibrary[entry].read == "not read"){
        myLibrary[entry].read = "read";
    }
    else{
        myLibrary[entry].read = "not read";
    }
    reset();
    render();
}

let reset = function(){
    let b = document.getElementById('masterList');
    let cNode = b.cloneNode(false);
    b.parentNode.replaceChild(cNode,b);
}



let addForm = function(){
    let b = document.getElementById("addbookform");
    let c = document.getElementById("addbutton");
    c.onclick = function(){addBookFromForm()};
    let ar = ["Title", "Author", "Pages", "Read_Not Read"];
    for (let i = 0; i < 4; i++) {
        let nBook = document.createElement("input");
        let labelIn = document.createElement("label");
        nBook.id = ar[i];
        labelIn.innerHTML = ar[i];
        labelIn.htmlFor =ar[i];
        b.appendChild(labelIn);
        b.appendChild(nBook);
    }
}

let addBookFromForm = function(){
    let titleIn = document.getElementById("Title").value;
    document.getElementById("Title").value = "";
    let authorIn = document.getElementById("Author").value;
    document.getElementById("Author").value = "";
    let pagesIn = document.getElementById("Pages").value;
    document.getElementById("Pages").value = "";
    let readIn = document.getElementById("Read_Not Read").value;
    document.getElementById("Read_Not Read").value = "";

    addBookToLibrary(titleIn, authorIn, pagesIn, readIn);

    reset();
    render();

}

window.addEventListener("load" ,function(){
    addBookToLibrary("Harry Potter", "jk rowling", "100000", "read");
    addBookToLibrary("Harry Potter2", "jkj rowling", "200000", "read");
    addBookToLibrary("Harry Potter3", "jkjk rowling", "300000", "not read");
    
    render();
});

