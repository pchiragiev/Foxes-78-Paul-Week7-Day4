
// Grabbing Form Data for a Submit Event
const form = document.querySelector('#form')
console.log(form)

// Add Event Listener for submit event(s)
form.addEventListener('submit', ( event ) => {
    event.preventDefault();
    let year = document.querySelector('#year').value;
    let round = document.querySelector('#round').value;

    console.log(event);
    console.log(year, round);
    racer_data(year, round);
})

const racer_data = async (year, round) => {
    let url = `https://ergast.com/api/f1/${year}/${round}/driverStandings.json`
    console.log(url);
    let response = await axios.get(url);
    for(let i=0; i<=6; ++i){
        let data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i];
        let driver = data.Driver
        let sponsor = data.Constructors[0]
        let row = document.getElementById('row' + i);
        console.log(row);    
        row.children[0].innerHTML=data.position 
        row.children[1].innerHTML=`<a href="${driver.url}"'>${driver.givenName} ${driver.familyName}</a>`
        row.children[2].innerHTML=driver.nationality 
        row.children[3].innerHTML=data.points 
        row.children[4].innerHTML=`<a href="${sponsor.url}"'>${sponsor.name}</a>`
    }
}