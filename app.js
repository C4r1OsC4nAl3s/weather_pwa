const cardt = (img, dayname, date, desc, degrees) => {
    const card = document.createElement('div');
    // card.innerText = content;
    card.setAttribute('class','card');

    const weather = document.createElement('div');
    weather.setAttribute('class','weather');
    // weather.setAttribute('src','./img/01-s.png');

    const imgw = document.createElement('img');
    imgw.src = img;
    imgw.alt = 'imagen de clima';
    
    const dayName = document.createElement('p');
    dayName.innerText = dayname;

    const datep = document.createElement('p');
    datep.setAttribute('class','date');
    datep.innerHTML = date;

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
    degree.innerHTML = degrees;

    const csign = document.createElement('span');
    csign.innerHTML = "°C";

    const descp = document.createElement('p');
    descp.setAttribute('class','desc');
    descp.innerHTML = desc;


    card.appendChild(infodiv);
    infodiv.appendChild(cento);
    infodiv.appendChild(descp);

    cento.appendChild(numberd);
    numberd.appendChild(degree);
    numberd.appendChild(csign);

    const main = document.querySelector('.main');
    main.appendChild(card);

}

cardt('./img/01-s.png','wednesday','45-jan-25','sunny',44);

cardt('./img/01-s.png','wednesday','45-jan-25','sunny',44);