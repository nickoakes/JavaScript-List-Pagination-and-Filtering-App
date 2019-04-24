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
p.id = "none-found";
document.querySelector('.page').appendChild(p);

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
      showPage(list, e.target.textContent);
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
   searchBarButton.id = "search-bar-button";
   searchBarButton.innerHTML = "Search";

   searchBarDiv.appendChild(searchBar);
   searchBarDiv.appendChild(searchBarButton);
   document.querySelector('h2').appendChild(searchBarDiv);
}

appendSearchBar();

//search bar functionality
const search = document.querySelector('#search-bar');
const searchBarButton = document.querySelector('#search-bar-button');
search.setAttribute('onkeyup', 'searchStudents(search, listItemElements)');
search.addEventListener('keyup', () => {
   if(!(document.querySelectorAll('.match').length) && search.value !== ""){
   document.querySelector('#none-found').style.display = "";
   document.querySelector('.pagination').remove();
   appendPageLinks('<ul></ul>');
   } else if(document.querySelectorAll('.match').length) {
      document.querySelector('#none-found').style.display = "none";
      document.querySelector('.pagination').remove();
      let matched = document.querySelectorAll('.match');
      for(let i = 0; i < matched.length; i++) {
         matched[i].style.display = "";
      }
      appendPageLinks(matched);
      showPage(matched, 1);     
   } else if(search.value == "") {
      document.querySelector('.pagination').remove();
      appendPageLinks(listItemElements);
      showPage(listItemElements, 1);
   }
}
)
searchBarButton.setAttribute('click', 'searchStudents(search, listItemElements)');

function searchStudents(search, students) {
   for(let i = 0; i < students.length; i++) {
      students[i].classList.remove('match');
      //document.querySelector('.pagination').remove();
    if(search.value.length !== 0 && students[i].querySelector('h3').textContent.toLowerCase().includes(search.value.toLowerCase())) {
    students[i].classList.add('match'); 
    //let matched = document.querySelectorAll('.match');
    //for(let i = 0; i < matched.length; i++) {
    //   matched[i].style.display = "";
    //}
    //appendPageLinks(matched);
    //showPage(matched, 1);
    } else if(search.value.length === 0) {
      students[i].style.display = "";
   } else {
       students[i].style.display = "none";
      }
    }
  }
   
//function calls
appendPageLinks(listItemElements);
showPage(listItemElements, 1);