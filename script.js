document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    let unit = document.querySelector('input[name="unit"]:checked').value;

    if(input !== '') {
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=0f8a407c224c204588e7c370331948ea&units=${unit}&lang=pt_br`;
        
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
            });
        } else {
            clearInfo();
            showWarning('Localização não encontrada.');
        }
    };
});

function showInfo(json) {
    showWarning('');

    let unit = document.querySelector('input[name="unit"]:checked').value;

    var tempUnit = '';

    var speedUnit = '';

    if(unit === 'metric') {
        var tempUnit = 'ºC';
    } else {
        var tempUnit = 'K';
    };


    if(unit === 'metric') {
        var speedUnit = 'km/h';
    } else {
        var speedUnit = 'mph';
    };

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>${tempUnit}</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>${speedUnit}</span>`;


    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
    
    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function switchLight() {
    const circle = document.querySelector('.switchArea');
    const circleProperties = window.getComputedStyle(circle, null);
    let circlePosition = circleProperties.getPropertyValue("justify-content");
    if (circlePosition === 'flex-end'){
        document.querySelector('.switchArea').style.justifyContent = 'flex-start';  
        document.querySelector('.switchCircle').style.backgroundColor = '#FFF'; 
        document.querySelector('.switchArea').style.backgroundColor = '#000'; 
        document.querySelector('body').style.backgroundColor = '#EEE';
        document.querySelector('.clima').style.color = '#000';
        document.querySelector('.switchLight').style.color = '#000';
        document.querySelector('footer').style.color = '#000';
        document.querySelector('.aviso').style.color = '#000';
        document.querySelector('.titulo').style.color = '#000';
        document.querySelector('.tempInfo').style.color = '#000';
        document.querySelector('.ventoInfo').style.color = '#000';
        document.querySelector('.tempTitulo').style.color = '#FFF';
        document.querySelector('.ventoTitulo').style.color = '#FFF';
        document.querySelector('.sist_unidade').style.color = '#000';
        document.querySelector('.cidade').style.color = '#000';
    } else {
        document.querySelector('.switchCircle').style.backgroundColor = '#000'; 
        document.querySelector('.switchArea').style.backgroundColor = '#FFF'; 
        document.querySelector('.switchArea').style.justifyContent = 'flex-end';  
        document.querySelector('body').style.backgroundColor = '#333';
        document.querySelector('.clima').style.color = '#FFF';
        document.querySelector('.switchLight').style.color = '#FFF';
        document.querySelector('footer').style.color = '#FFF';
        document.querySelector('.aviso').style.color = '#FFF';
        document.querySelector('.titulo').style.color = '#FFF';
        document.querySelector('.tempInfo').style.color = '#FFF';
        document.querySelector('.ventoInfo').style.color = '#FFF';
        document.querySelector('.tempTitulo').style.color = '#777';
        document.querySelector('.ventoTitulo').style.color = '#777';
        document.querySelector('.sist_unidade').style.color = '#FFF';
        document.querySelector('.cidade').style.color = '#FFF';

    }
};
