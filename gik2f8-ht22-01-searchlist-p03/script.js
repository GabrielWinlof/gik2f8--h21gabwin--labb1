'use strict';

let bookList = [];

window.addEventListener('load', () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
});

searchField.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);


function renderBookList(bookList) {
  const existingElement = document.querySelector('.book-list');
  const root = document.getElementById('root');
 
  existingElement && root.removeChild(existingElement);
  bookList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', BookList(bookList));
  const booklista = document.querySelectorAll('.book-list__item');
  console.log(booklista);
  booklista.forEach(bookloop);
}

function bookloop(book){
  book.addEventListener("mouseover", (event) => {
    console.log(event.pageX);
    let x = event.pageX;
    let y = event.pageY;
  const bookdetails = getBookDetails(event.target.id).then((booke)=> {
  const html = `<div id="bookdetails" class="flex bg-emerald-200 text-black-200 absolute rounded-md border-nautral-900 left-[${x+10 }px] top-[${y+10 }px]">
   ID: ${booke.id} <br> Title: ${booke.title} <br> Author: ${booke.author} <br> Pages: ${booke.pages} <br> ReleseDate: ${booke.releaseDate}  
  <img src ="${booke.coverImage}" width="100px" height = "200px" onerror="this.style.display='none'" </img></div>`
  book.insertAdjacentHTML("beforeend", html);
  console.log(booke);
    });
  });
  book.addEventListener("mouseout", (event) => {
    const element = document.getElementById("bookdetails");
    if(element){
      element.remove();
    }
    

  });

}

async function getBookDetails(id) {
  const url = `https://gik2f8-labs.herokuapp.com/books/${id}`;
  const result = await fetch(url)
    .then((result) => result.json())
    .catch((e) => e);
  return result;
}





  




