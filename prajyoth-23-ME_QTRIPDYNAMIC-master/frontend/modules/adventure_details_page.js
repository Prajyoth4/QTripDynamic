import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  //console.log(search)
  let url = new URLSearchParams(search)
  let id = url.get('adventure')
  //console.log(id)
  return id;


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
  let data = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
  let dataJson = await data.json()
  //console.log(dataJson)
  return dataJson;
  }catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log(adventure)
  let headerElement = document.getElementById("adventure-name");
  headerElement.textContent = adventure.name
  let subtitleElement = document.getElementById("adventure-subtitle");
  subtitleElement.textContent = adventure.subtitle
  let galleryElement = document.getElementById("photo-gallery");
  adventure.images.forEach(src => {
    galleryElement.innerHTML += `<img class="activity-card-image" src=${src}>`
  });
  let contentElement = document.getElementById("adventure-content");
  contentElement.textContent = adventure.content

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let galleryElement = document.getElementById("photo-gallery");
  //console.log(images)
  galleryElement.innerHTML = ""
  galleryElement.innerHTML = `
<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="addCarouselImages">
   
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
`
let carouselElement = document.getElementById("addCarouselImages");
images.forEach((src, index) => {
  let childElement = document.createElement("div");
  childElement.classList.add("carousel-item")
  if (index === 0){
    childElement.classList.add("active")
  }
  // let imageElement = document.createElement("img");
  // imageElement.classList.add("d-block", "w-100")
  // image
  childElement.innerHTML = `<img src="${src}" class="d-block w-100" alt="...">`
  carouselElement.appendChild(childElement)
  // carouselElement.innerHTML += `
  // <div class="carousel-item active">
  //   <img src="..." class="d-block w-100" alt="...">
  // </div>
  // `
})

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  //console.log(adventure.available)
  if (adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none"
    document.getElementById("reservation-panel-available").style.display = "block"
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead
  }else{
    document.getElementById("reservation-panel-sold-out").style.display = "block"
    document.getElementById("reservation-panel-available").style.display = "none"
  }
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  //reservation-cost
  //console.log(adventure.costPerHead*persons)
  document.getElementById("reservation-cost").textContent = adventure.costPerHead*persons

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  
  document.getElementById("myForm").addEventListener("submit", postToBackend)
  //postToBackend()
  function postToBackend(event){
    event.preventDefault();
    console.log("This is the form submit event", event.target.date)
    let formElement = document.getElementById("myForm")
    // console.log("This is the form element", formElement)
    // console.log("This is the form element name", formElement.elements["name"].value)
    // console.log("This is the form element date", formElement.elements["date"].value)
    // let {name, date, person} = formElement
    // console.log("This is the form element", formElement)
    // console.log("This is the form element name", name)
    // console.log("This is the form element date", date)
    // console.log("This is the form element person", person)
  try{
  fetch(`${config.backendEndpoint}/reservations/new`, {method:'post', body:JSON.stringify(
  //   {
  //   name: event.target.name,
  //   date: event.target.date,
  //   person: event.target.person,
  //   adventure:adventure.id
  // }
  {
    name: formElement.elements["name"].value,
    date: formElement.elements["date"].value,
    person: formElement.elements["person"].value,
    adventure:adventure.id
  }
  // {
  //   name: name.value,
  //   date: date.value,
  //   person: person.value,
  //   adventure:adventure.id
  // }
  //event
  //{name, date, person, adventure}
  ),headers:{"content-type":"application/json"}}
  ).then(res=>res.json())
  alert("Success!")
  console.log("After Success")
  window.location.reload()
}catch(err){
  alert("Failed!")
  console.log("After Failure")
  return null;
}
  // document.getElementById("myForm")
  // console.log("It works")
  // console.log(event.target.name.value, "Name")
  // console.log(event.target.date.value, "Name")
  // console.log(event.target.person.value, "Name")
}

  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  //console.log(adventure)
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
