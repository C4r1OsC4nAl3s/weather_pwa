import {config} from "../config.js"

export async function getLocationInfo(location){
    var url = config.api.url
    + 'locations/v1/cities/geoposition/search'
    + '?apikey=' + config.api.key
    + '&q=' + location.latitude + ',' + location.longitude;
    // console.log(url);

    return await fetch(url)
    .then( result => { return result.json() })
    .catch( error => { console.log(error) });
}

export async function getForecastInfo(code){
    var url = config.api.url 
    + 'forecasts/v1/daily/5day/' + code + '/'
    + '?apikey=' + config.api.key
    + '&metric=' + config.metric;
    // console.log(url);
    return await fetch(url)
    .then( result => { return result.json(); })
    .catch( error => { console.log(error); });
}