/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
//define global variables
let listItemElements = document.querySelectorAll('li');
let numberPerPage = 10;
let p = document.createElement('p');
p.innerHTML = "No students found";
p.style.display = "none";

//function to show page
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

//function to create and append DOM elements
function appendPageLinks(list) {
   const pagDiv = document.createElement('div');
   const pageDiv = document.querySelector('.page');
   const ul = document.createElement('ul');
   const pagesNeeded = Math.ceil(list.length / 10);

   pagDiv.className = "pagination";

   pageDiv.appendChild(pagDiv);
   pagDiv.appendChild(ul);

   
   for(let i = 0; i < pagesNeeded; i++){
      const li = document.createElement('li');
      ul.appendChild(li);
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = i + 1;
      li.appendChild(a);
   }

   const anchors = document.querySelectorAll('a');

   ul.firstElementChild.firstElementChild.className = "active";

   for(let i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', (e) => {
   const liCollection = ul.getElementsByTagName('li');

   for(let i = 0; i < liCollection.length; i++) {
      liCollection.item(i).firstElementChild.className = "";
   }
      e.target.className = "active";
      showPage(listItemElements, e.target.textContent);
   })
}
}


//function to create and append search bar elements

function appendSearchBar () {
   const searchBarDiv = document.createElement('div');
   const searchBar = document.createElement('input');
   const searchBarButton = document.createElement('button');

   searchBar.placeholder = "Search for students...";
   searchBar.id = "search-bar";
   searchBar.setAttribute('onkeyup', 'searchStudents()');
   searchBarButton.innerHTML = "Search";
   searchBarButton.setAttribute('click', 'searchStudents()');

   searchBarDiv.appendChild(searchBar);
   searchBarDiv.appendChild(searchBarButton);
   document.querySelector('h2').appendChild(searchBarDiv);
}

appendSearchBar();

//search bar functionality

function searchStudents() {
   let search = document.querySelector('input').value.toUpperCase();
   let students = document.querySelectorAll('.student-item');
   let studentNames = document.querySelectorAll('h3');
   let searchResults = [];
   
   for(let i = 0; i < studentNames.length; i++) {
      if(studentNames[i].innerHTML.toUpperCase() === search) {
         students[i].style.display = "";
         searchResults.push(students[i]);
         document.querySelector('.page').removeChild(document.querySelector('.pagination'));
         appendPageLinks(searchResults);
         break;
      } else {
         searchResults = [];
         students[i].style.display = "none";
         p.style.display = "block";
      }
   }
      if (!search) {
      searchResults = [];
      document.querySelector('.page').removeChild(document.querySelector('.pagination'));         
      appendPageLinks(listItemElements);
      showPage(listItemElements, 1);
      p.style.display = "none";
}
      if(searchResults.length) {
         p.style.display = "none";
      }
}

//function calls
appendPageLinks(listItemElements);
showPage(listItemElements, 1);
document.querySelector('.page').appendChild(p);