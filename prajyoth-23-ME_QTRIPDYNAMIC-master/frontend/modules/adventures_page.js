
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //let result = search.slice(6);
  let url = new URLSearchParams(search)
  let result = url.get('city')
  //console.log(result);
  return result;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  let url = `${config.backendEndpoint}/adventures?city=${city}`
  //console.log(config)
  //console.log(url)
  let data1 = await fetch(url);
  let data = await data1.json();

  return data
  }catch(err){
    return null
  }
}

function addNewAdventure(city){
  //console.log("It works")
  document.getElementById("addNewAdventure").addEventListener("click", addNewPost);
  
  function addNewPost(){
    //console.log("It works inside post")
    fetch(`${config.backendEndpoint}/adventures/new`, {
      method:"POST",
      body:JSON.stringify({"city":city}),
      headers:{"Content-Type":"application/json"}
    })
  }
}
//<div class="card-body d-flex flex-column activity-card-text"></div>
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let contentElement = document.getElementById("data");
  adventures.forEach(element => {
    let htmlString = `
    <div class="col-6 col-lg-3 position-relative pb-2">
      <a id="${element.id}" href="detail/?adventure=${element.id}">
        <div class="category-banner">${element.category}</div>
          <div class="activity-card">
            <img src=${element.image}>
            <div class = "d-flex w-100 px-2 justify-content-between">
            <p>${element.name}</p>
            <p>₹ ${element.costPerHead}</p>
            </div>
            <div class = "d-flex w-100 px-2 justify-content-between">
            <p>Duration</p>
            <p>${element.duration} Hours</p>
            </div>
          </div>
      </a>
    </div>
  `
  //console.log(htmlString)
  contentElement.innerHTML += htmlString;
  });
}


{/* <a id="${element.id}" href="detail/?adventure=${element.id}">
    <div class="category-banner">${element.category}</div>
        <div class="activity-card">
        <img src=${element.image}>
            <div class = "d-flex w-100 px-2 justify-content-between">
            <p>${element.name}</p>
            <p>₹ ${element.costPerHead}</p>
            </div>
            <div class = "d-flex w-100 px-2 justify-content-between">
            <p>Duration</p>
            <p>${element.duration} Hours</p>
            </div>
          </div>
        </div>
      </a> */}
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let result = list.filter((element)=>{
    return (element.duration >= low && element.duration <= high)
  })
  return result

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  //console.log(list, "before filter by category")
  let result = list.filter((element)=>{
    
    for (let i=0; i<categoryList.length; i++){
      //console.log(element.category === categoryList[i])
      if (element.category === categoryList[i]){
        return true;
      }
    }
    return false;
  })
  //console.log(result, "after filter by category")
  return result
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  //console.log(filters)
  //console.log(list, "before filter function")
  let result;
  if (filters.category.length > 0){
    result = filterByCategory(list, filters.category);
  }
  else{
    result = list
  }
  if (filters.duration.length > 0){
    //console.log(filters.duration)
    let durationArray = filters.duration.split("-");
    result = filterByDuration(result, parseInt(durationArray[0]), parseInt(durationArray[1]));
  }
  else{
    result = result;
  }
  //console.log(result, "after filter function")
  // Place holder for functionality to work in the Stubs
  return result;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // let buttons = document.getElementsByClassName("closeButton")
  // console.log(buttons)
  // console.log(buttons.length)
  // for (let i=0; i<buttons.length; i++){
  //   console.log(buttons[i])
  // }
  //.addEventListener("click", removeCategory);
  // function removeCategory(event){
    
  //   //console.log(event.target.value)
  //   if (event.target.value !== undefined){
  //     console.log("removeCategory invoked")
  //           document.getElementById("data").textContent = "";
  //           document.getElementById("category-list").textContent = "";

  //           let category = event.target.value;
  //           document.getElementById("category-select").selectedIndex = 0;

  //           // filters["category"].push(category);
  //           // filters["category"] = filters["category"].filter(onlyUnique);
  //           const index = filters["category"].indexOf(category);
  //           if (index > -1) { // only splice array when item is found
  //             filters["category"].splice(index, 1); // 2nd parameter means remove one item only
  //           }


  //           generateFilterPillsAndUpdateDOM(filters);
  //           let filteredAdventures = filterFunction(adventures, filters);
  //           addAdventureToDOM(filteredAdventures);

  //           // TODO: MODULE_FILTERS
  //           // 1. Invoke saveFiltersToLocalStorage here
  //           saveFiltersToLocalStorage(filters);
  //   }
  // }

  document.getElementById("duration-select").value = filters.duration;
  let domElement = document.getElementById("category-list");
  //domElement.addEventListener("click", removeCategory);
  if (filters.category.length > 0){
    filters.category.forEach((element)=>{
     domElement.innerHTML += `
    <div class="category-filter">
    <div>
      ${element}
      <button value="${element}" type="button" class="btn-close closeButton" aria-label="Close"></button>
      </div>
    </div>
    `
    })
    
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  addNewAdventure
};
