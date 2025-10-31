// active tabs
let clicked=document.getElementsByClassName("nav-link");
console.log(clicked);

for(let i=0;i<clicked.length;i++){

    clicked[i].addEventListener('click',function(e){
        for(let j=0;j<clicked.length;j++){
            clicked[j].classList.remove('active')
        }
        e.target.classList.add('active');
    })

}


// end active tabs code



let country=document.querySelector('.input');
let countryName=''
country.addEventListener('input',function(e){
    countryName=e.target.value;
});

let btn=document.querySelector('.btn');
btn.addEventListener('click',function(){
    getWeather(countryName);
})


let data=[];
async function getWeather(countryName){
    let response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b9dab529e545419a926165847240602&q=${countryName}&days=3&aqi=no&alerts=no`);
        if (response.status==200){
        let finalResponse=await response.json();
        data=finalResponse;
        console.log(data);
        displayData();
    }
    else if(response.status==404){
        alert("not found")
    }
    else if(response.status==403){
        alert('forbiden')
    }
}




function displayData(){
const forecastday1 = data.forecast.forecastday[1];
const forecastday2 = data.forecast.forecastday[2];
const allDates = [data.current.last_updated, forecastday1.date, forecastday2.date];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayOfWeek = [];
const monthArr=[];

for (let i = 0; i < allDates.length; i++) {
    const date = new Date(allDates[i]);
    const dayName = days[date.getDay()];
    const monthName=months[date.getMonth()]
    monthArr.push(monthName)
    dayOfWeek.push(dayName);
}

console.log(dayOfWeek);
console.log(monthArr);


let col=`
    <div class="col-md-4">
    <div class="d-flex justify-content-between text-light head pt-3">
        <h5 >${dayOfWeek[0]}</h5>
        <h5>${monthArr[0]}</h5>
    </div>
    <div class="body text-light p-4">
        <h5>${data.location.country}</h5>
        <div class="d-flex justify-content-between degree">
        <h1>${data.current.temp_c}℃ </h1>
            <img src="https:${data.current.condition.icon}" alt="">
        </div>
        <p>${data.current.condition.text}</p>
        <div class="d-flex pb-1">
            <i class="fa-solid fa-umbrella fa-lg"></i>
            <p class="ps-2">${data.current.gust_kph}%</p>
            <i class="fa-solid fa-wind fa-lg ms-5"></i>
            <p class="ps-2">${data.current.wind_kph}km/hr</p>
            <i class="fa-regular fa-compass fa-lg ms-5"></i>
            <p class="ps-2">${data.current.wind_dir}</p>
        </div>
    </div>

</div>
<div class="col-md-4">
    <div class="d-flex justify-content-center text-light  middle">
        <h5 >${dayOfWeek[1]}</h5>

    </div>
    <div class="bodyMiddle d-flex flex-column align-items-center pt-5 text-light">
        <img src="https:${forecastday1.day.condition.icon}" alt="">
        <h4>${forecastday1.day.maxtemp_c}℃</h4>
        <p>${forecastday1.day.mintemp_c}℃</p>
        <p>${forecastday1.day.condition.text}</p>

    </div>
</div>
<div class="col-md-4">
    <div class="d-flex justify-content-center text-light  head">
        <h5 >${dayOfWeek[2]}</h5>
    </div>
    <div class="body d-flex flex-column align-items-center pt-5 text-light">
        <img src="https:${forecastday2.day.condition.icon}" alt="">
        <h4>${forecastday2.day.maxtemp_c}℃</h4>
        <p>${forecastday2.day.mintemp_c}℃</p>
        <p>${forecastday2.day.condition.text}</p>

    </div>
</div>

    `
document.getElementById('rowData').innerHTML=col;
}


let currentCountry;

function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then(response => response.json())
        .then(data2 => {
             currentCountry = data2.countryName;
             console.log("Country Name:", currentCountry);
             
             currentCountryDisp(currentCountry);
        })
        .catch(error => {
            console.error("Error fetching country name:", error);
        });
}
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

function errorCallback(error) {
    console.error("Error getting user's location:", error);
}

async function currentCountryDisp(currentCountry) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b9dab529e545419a926165847240602&q=${currentCountry}&days=3&aqi=no&alerts=no`);
    if (response.status == 200) {
        let finalResponse = await response.json();
        data = finalResponse;
        console.log(data);
        displayData();
    } else if (response.status == 404) {
        alert("not found");
    } else if (response.status == 403) {
        alert('forbidden');
    }
}








