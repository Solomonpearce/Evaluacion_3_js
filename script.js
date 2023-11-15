document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'd3c39f57206d5904890771c822ffaac3';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

    const searchButton = document.querySelector('.search button');
    const input = document.querySelector('.search input');
    const weathericon={
        'Clouds' : 'images/clouds.png',
        'Clear' : 'images/clear.png',
        'Rain' : 'images/rain.png',
        'Drizzle' : 'images/drizzle.png',
        'Mist' : 'images/mist.png'
    }
    input.value='';
    searchButton.addEventListener('click', function() {
        const city = input.value;
        console.log(city)
        fetch(apiUrl + city + '&appid=' + apiKey)
        .then(response => {
            if(!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod==200){
                document.querySelector('.weather-icon').src = weathericon[data.weather[0].main];
                document.querySelector('.temp').textContent=`${Math.round(data.main.temp)}°C`;
                document.querySelector('.city').textContent=data.name;
                document.querySelector('.humidity').textContent=`${data.main.humidity}%`;
                document.querySelector('.wind').textContent=`${data.wind.speed}km/h`;
                document.querySelector('.error').style.display='none';
                document.querySelector('.weather').style.display='block';
            }else{
                document.querySelector('.error').style.display='block';
            }

        })
        .catch(error => {
            console.error(error);
            document.querySelector('.error').style.display='block';
            document.querySelector('.weather').style.display='none';
            document.querySelector('.error').textContent="la ciudad no se encontró";
        });
    });
});