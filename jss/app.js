let signDegree = false;

const cardt = (img, dayname, date, desc, degreesMin, degreesMax, celsi) => {
    const card = document.createElement('div');
    // card.innerText = content;
    card.setAttribute('class','card');

    const weather = document.createElement('div');
    weather.setAttribute('class','weather');
    // weather.setAttribute('src','./img/01-s.png');

    const imgw = document.createElement('img');
    const imgpath = `./img/accuweather/sites/default/files/01-s.png`;
    (img > 9)? imgw.src = `./img/accuweather/sites/default/files/${img}-s.png`
    :
    imgw.src = `./img/accuweather/sites/default/files/0${img}-s.png`;
    imgw.alt = 'imagen de clima';

    const format = date.slice(0,10);
    // console.log(`fecha: ${format}`);
    const arrDate = format.split('-');
    q = arrDate[1];

    function calcularDiaSemana() {
        let day = parseInt(arrDate[2]);//dia 12
        let month = parseInt(arrDate[1]);//mes 01
        let year = parseInt(arrDate[0]);//year 2025
    

        // Si el mes es enero o febrero, lo consideramos como el 13 o 14 del año anterior
        if (month < 3) {
          month += 12;
          year--;
        }
      
        const K = year % 100; // Año dentro del siglo
        const J = Math.floor(year / 100); // Siglo
      
        // Fórmula de Zeller
        const h = (day + Math.floor((13 * (month + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) - 2 * J) % 7;
      
        // La fórmula devuelve valores de 0 a 6 (sábado = 0, domingo = 1, lunes = 2, ..., viernes = 6)
        // Convertimos a un formato más común: domingo = 0, lunes = 1, ..., sábado = 6
        const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      
        return daysOfWeek[h];
      }
    
    const dayName = document.createElement('p');
    dayName.innerText = calcularDiaSemana();

    const datep = document.createElement('p');
    datep.setAttribute('class','date');

    // const format = date.slice(0,10);
    // console.log(`fecha: ${format}`);
    // const arrDate = format.split('-');

    const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    datep.innerHTML = `${arrDate[2]}, ${month[parseInt(arrDate[1])-1]}, ${arrDate[0]}`;

    card.appendChild(weather);
    weather.appendChild(imgw);
    weather.appendChild(dayName);
    weather.appendChild(datep);

    const infodiv = document.createElement('div');
    infodiv.setAttribute('class','info');

    const cento = document.createElement('div');
    cento.setAttribute('class','cent');

    const numberd = document.createElement('div');
    numberd.setAttribute('class','number');

    const degree = document.createElement('p');
    degree.setAttribute('class','temp');
    // degree.innerHTML = degrees;
    degree.innerHTML = `${parseInt(degreesMin)} - ${parseInt(degreesMax)}`;


    const csign = document.createElement('span');
    csign.innerHTML = "°F";
    
   function convertion (temp){
    let conversion = (temp * 9/5) + 32;
    return parseInt(conversion);
   }

    const descp = document.createElement('p');
    descp.setAttribute('class','desc');
    descp.innerHTML = desc;

    const buttonS = document.createElement('button');
    buttonS.setAttribute('class','unit');
    buttonS.innerHTML = "°F/°C";

    console.log("degreesMin: " +degreesMin);

    buttonS.addEventListener('click', () => {
        signDegree = !signDegree;
        if(signDegree==true){
            csign.innerHTML = "°C"
            degree.innerHTML = `${degreesMin} - ${degreesMax}`;
        }else{
            csign.innerHTML = "°F";
            // let conversion = (temp * 9/5) + 32;
            degree.innerHTML = `${convertion(degreesMin)} - ${convertion(degreesMax)}`;
        } 
        // degree.innerHTML = degrees;
        
    });
    


    card.appendChild(infodiv);
    infodiv.appendChild(buttonS);
    infodiv.appendChild(cento);
    infodiv.appendChild(descp);

    cento.appendChild(numberd);
    numberd.appendChild(degree);
    numberd.appendChild(csign);

    const main = document.querySelector('.main');
    main.appendChild(card);

}

// cardt('./img/01-s.png','wednesday','45-jan-25','sunny',44);

// cardt('./img/01-s.png','wednesday','45-jan-25','sunny',44);

// const endpoint = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/241912?apikey=6pjdRdSpsAugsAl5F4h2xmrFq5zMO6bT&language=en-us&details=false&metric=false';
// const datas = async () => {
//     await fetch(endpoint)
//     .then((response) => {
//         // console.log(response);
//         const promesa = response.json();
//         promesa
//         .then((data) => {
//             return data;
//         }).catch((error) => {
//             console.log(error);
//         });
//     }).catch((error) => {
//         console.log(error);
//     });
// }
// const data = datas();
// console.log(data);
//cdmx 242560
const endpoint = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/241912?apikey=6pjdRdSpsAugsAl5F4h2xmrFq5zMO6bT&language=en-us&details=false&metric=false`;

// Función asíncrona para obtener los datos
const datas = async () => {
    try {
        const response = await fetch(endpoint); // Hacer fetch
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`); // Manejar errores HTTP
        }
        const data = await response.json(); // Convertir a JSON
        return data; // Retornar los datos procesados
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
};

// Usar la función asíncrona y manejar la promesa
(async () => {
    const data = await datas(); // Esperar los datos
    console.log(data);
    if (data) {
        // Iterar sobre los datos obtenidos
        data.DailyForecasts.forEach((forecast) => {
            // console.log(`Fecha: ${forecast.Date}`);
            // console.log(`Mínima: ${forecast.Temperature.Minimum.Value}°${forecast.Temperature.Minimum.Unit}`);
            // console.log(`Máxima: ${forecast.Temperature.Maximum.Value}°${forecast.Temperature.Maximum.Unit}`);
            cardt(forecast.Day.Icon,'wednesday',forecast.Date,forecast.Day.IconPhrase, forecast.Temperature.Minimum.Value ,forecast.Temperature.Maximum.Value, forecast.Temperature.Minimum.Unit);
        });
    }
})();
