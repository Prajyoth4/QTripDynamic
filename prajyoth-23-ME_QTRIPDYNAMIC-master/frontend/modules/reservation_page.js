import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
  let data = await fetch(`${config.backendEndpoint}/reservations`)
  let jsonData = await data.json();
  //console.log(jsonData);
  return jsonData;
  }catch(err){
    return null;
  }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations)
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length == 0){
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }else{
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }
  let parentElement = document.getElementById("reservation-table")
  reservations.forEach(element => {
    let date = new Date(element.date);
    let time = new Date(element.time);
    //console.log(date.toLocaleString("en-IN", {day:"numeric", month:"numeric", year:"numeric"}))
    let dateElement = date.toLocaleString("en-IN", {day:"numeric", month:"numeric", year:"numeric"})
    //console.log(time.toLocaleString("en-IN", {day:"numeric", month:"long", year:"numeric", hour:"numeric", minute:"numeric", second:"numeric"}))
    //console.log(time.toLocaleString("en-IN", {timeStyle:"medium", dateStyle:"long"}))
    let timeElement = time.toLocaleString("en-IN", {timeStyle:"medium", dateStyle:"long"})
    let t1 = timeElement.split(" at")
    let t2 = t1.join(",")
    //console.log(element)
    parentElement.innerHTML += `
                          <tr>
                            <td>${element.id}</td>
                            <td>${element.name}</td>
                            <td>${element.adventureName}</td>
                            <td>${element.person}</td>
                            <td>${dateElement}</td>
                            <td>${element.price}</td>
                            <td>${t2}</td>
                            <td id="${element.id}"><a id="../detail/?adventure=${element.adventure}" href="../detail/?adventure=${element.adventure}"><button class="reservation-visit-button">Visit adventure</button></a></td>
                          </tr>
    `
    
  });

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
