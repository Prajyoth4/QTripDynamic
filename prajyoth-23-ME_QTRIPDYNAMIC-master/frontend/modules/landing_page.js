import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  //console.log("From init()")
  //console.log(config.backendEndpoint + "/cities")
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let data1 = await fetch(config.backendEndpoint + "/cities");
  let data = await data1.json();
  //console.log(data[0])
  return data
  }catch(err){
    return null;
  }
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let contentElement = document.getElementById("data");
  contentElement.innerHTML += `
  <div class="col-6 col-xl-3 tileContainer"><a id="${id}" href="pages/adventures/?city=${id}"><div class="tile">
  <div class="tile-text">
    <h3>${city}</h3>
    <p>${description}</p>
  </div>
  <img src=${image}>
</div></a></div>
`

}

export { init, fetchCities, addCityToDOM };
