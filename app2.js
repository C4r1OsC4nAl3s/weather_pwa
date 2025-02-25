import {config} from "./config.js";

// console.log(config);
import { getLocationInfo, getForecastInfo } from "./providers/accuweather.js";
import { getGeoLocation } from "./providers/location.js";


document.addEventListener('DOMContentLoaded', () => {
    deploy(); // Llamar a deploy() al cargar la página
});

let button = document.querySelector('#degrees');
button.addEventListener('click',() => {
    config.metric = !config.metric;
    deploy();
    // console.log(config.metric);
});


const card = (date, cast, temp) => {

    const thisDate = new Date(date);
    let year = thisDate.getFullYear();
    let month = thisDate.getMonth();
    let day = thisDate.getDay();
    let daty = thisDate.getDate();
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const Days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    let textDate = months[month] + ", " + daty + ", " + year;
    let actualDay = Days[day];
    
    //console.log(`this day: ${daty}`);
    //console.log(`this date slice: ${date.slice(0,10)}`);
    //console.log(`this date: ${thisDate}`);
    


    let unit = temp.Maximum.Unit;
    let max = temp.Maximum.Value;
    let min = temp.Minimum.Value;
    let tempText = `Min: ${min}°${unit} | Max: ${max}°${unit}`;

    // //console.log(`year: ${year}`);
    // //console.log(`textDate: ${textDate}`);

    let contento = document.querySelector('.content');
    // let barw = document.querySelector('.barw');

    let newCard = document.createElement('div');
    newCard.classList.add('card');

    let dailyClass = document.createElement('div');
    dailyClass.classList.add('daily');

        let dayText = document.createElement('p');
        dayText.innerHTML = actualDay;
        // dayText.classList.add();

        let forecastImg = document.createElement('img');
        (cast.Icon > 9)?
        forecastImg.src = config.api.icons + cast.Icon + "-s.png"
        :
        forecastImg.src = config.api.icons +"0" + cast.Icon + "-s.png";

        forecastImg.alt = cast.IconPhrase;

        let todayForecastText = document.createElement('p');
        todayForecastText.innerHTML = cast.IconPhrase;

        dailyClass.appendChild(dayText);
        dailyClass.appendChild(forecastImg);
        dailyClass.appendChild(todayForecastText);

    newCard.appendChild(dailyClass);

    let forecastClass = document.createElement('div');
    forecastClass.classList.add('forecast');

        let dateText = document.createElement('p');
        dateText.innerHTML = textDate;
        dateText.classList.add('date');

        let temperatureText = document.createElement('p');
        temperatureText.innerHTML= tempText;
        temperatureText.classList.add('tempi');
        

        forecastClass.appendChild(dateText);
        forecastClass.appendChild(temperatureText);
    
    newCard.appendChild(forecastClass);

    contento.appendChild(newCard);
}




const deploy = async () => {
    let contento = document.querySelector('.content');
    contento.innerHTML = '';

    //console.log('ooooooooooooooooooooooooooooooooooooooooo');
    let coords = await getGeoLocation();
    //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    //console.log(coords);
    //console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    let locationInfo = await getLocationInfo(coords);
    //console.log(locationInfo);
    let forecast = await getForecastInfo(locationInfo.Key);
    //console.log(forecast);
    //console.log('ooooooooooooooooooooooooooooooooooooooooo');

    
    forecast.DailyForecasts.forEach((fore) => {
       card(fore.Date, fore.Day, fore.Temperature);  
    //    //console.log('one card');   
    });

    // console.log("finished");
}


// deploy();

// console.log("Register service worker");
// if('serviceWorker' in navigator){
//     navigator.serviceWorker.register('sw.js')
//     .then((reg) => { console.log('Service worker registred', reg); })
//     .catch((error) => { console.log(); });
// }else{
//     console.log('Service Worker not supported');
// }
// console.log('ejecutado');


const menuicon = document.querySelector('#menuicon');
const menuside = document.querySelector('#menuham');
menuicon.addEventListener('click',()=>{
    menuside.classList.toggle('menuhid');
    
});