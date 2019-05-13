/*
   JavaScript List Pagination and Filtering App.
   script.js
*/

//define global variables

let listItemElements = document.querySelectorAll('li');
let numberPerPage = 10;
let p = document.createElement('p');

//add 'No students found' inner HTML to the <p> element created

p.innerHTML = "No students found";
p.style.display = "none";
p.id = "none-found";

//append <p> element to the DOM

document.querySelector('.page').appendChild(p);

//show page

function showPage(list, page) {
   let startIndex = (page * numberPerPage) - numberPerPage;
   let endIndex = page * numberPerPage;

   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

//create and append student DOM elements

function appendPageLinks(list) {
   const pagDiv = document.createElement('div');
   const pageDiv = document.querySelector('.page');
   const ul = document.createElement('ul');

//ten students per page

   const pagesNeeded = Math.ceil(list.length / 10);

   pagDiv.className = "pagination";

   pageDiv.appendChild(pagDiv);
   pagDiv.appendChild(ul);

//page navigation
   
   for(let i = 0; i < pagesNeeded; i++){
      const li = document.createElement('li');
      ul.appendChild(li);
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = i + 1;
      li.appendChild(a);
   }

   const anchors = document.querySelectorAll('a');

//make page 1 navigation item active on initial page load

   ul.firstElementChild.firstElementChild.className = "active";

//add click event listener to each page navigation element

   for(let i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', (e) => {
      const liCollection = ul.getElementsByTagName('li');

//remove and reassign active class according to the navigation link clicked

   for(let i = 0; i < liCollection.length; i++) {
      liCollection.item(i).firstElementChild.className = "";
   }
      e.target.className = "active";
      showPage(list, e.target.textContent);
   })
}
}


//create and append search bar and button

function appendSearchBar () {
   const searchBarDiv = document.createElement('div');
   const searchBar = document.createElement('input');
   const searchBarButton = document.createElement('button');

   searchBar.placeholder = "Search for students...";
   searchBar.id = "search-bar";
   searchBar.className = 'student-search';
   searchBarButton.id = "search-bar-button";
   searchBarButton.className = 'student-search';
   searchBarButton.innerHTML = "Search";

   searchBarDiv.appendChild(searchBar);
   searchBarDiv.appendChild(searchBarButton);
   document.querySelector('.page-header').appendChild(searchBarDiv);
}

appendSearchBar();

//search bar functionality
//handle pagination on search
const search = document.querySelector('#search-bar');
const searchBarButton = document.querySelector('#search-bar-button');

//search performed each time a key is pressed

search.setAttribute('onkeyup', 'searchStudents(search, listItemElements)');
search.addEventListener('keyup', () => {

//no items found despite a search term having been entered

   if(!(document.querySelectorAll('.match').length) && search.value !== ""){
   document.querySelector('#none-found').style.display = "";
   document.querySelector('.pagination').remove();
   appendPageLinks('<ul></ul>');

//search term matches with at least one item

   } else if(document.querySelectorAll('.match').length) {
      document.querySelector('#none-found').style.display = "none";
      document.querySelector('.pagination').remove();
      let matched = document.querySelectorAll('.match');
      for(let i = 0; i < matched.length; i++) {
         matched[i].style.display = "";
      }
      appendPageLinks(matched);
      showPage(matched, 1);
      
//no search term entered

   } else if(search.value == "") {
      document.querySelector('.pagination').remove();
      appendPageLinks(listItemElements);
      showPage(listItemElements, 1);
   }
}
)
searchBarButton.setAttribute('click', 'searchStudents(search, listItemElements)');

//perform search

function searchStudents(search, students) {

//remove 'match' class from all student elements

   for(let i = 0; i < students.length; i++) {
      students[i].classList.remove('match');

//handle search term matching student item(s)

    if(search.value.length !== 0 && students[i].querySelector('h3').textContent.toLowerCase().includes(search.value.toLowerCase())) {
    students[i].classList.add('match'); 

//handle no search term entered

    } else if(search.value.length === 0) {
      students[i].style.display = "";

//handle search term matching no student items

   } else {
       students[i].style.display = "none";
      }
    }
  }
   
//function calls
appendPageLinks(listItemElements);
showPage(listItemElements, 1);