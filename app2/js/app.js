
window.addEventListener('load', () => {
    let location = document.querySelector('.location-timezone');
    let degreeDigit = document.querySelector('.degree-digit');
    let temperatureDiscription = document.querySelector('.temperature-description');
    let degreeUnit = document.querySelector(".degree-unit");



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const api = `${proxy}https://api.darksky.net/forecast/2d2ac40ce736c5ac04abcdea78457558/${lat},${long}`;

        fetch(api)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            location.textContent = data.timezone;
            const {temperature, summary, icon} = data.currently;
            degreeDigit.textContent = temperature;
            temperatureDiscription.textContent = summary;

            //Set Icons
            setIcons(document.querySelector("#icon1"), icon);

            //Convert from Farenheight to Celcius
            let celcius = (temperature - 32) * (5/9);
            degreeUnit.addEventListener('click', () =>{
                if (degreeUnit.textContent === "F"){
                    degreeUnit.textContent = "C";
                    degreeDigit.textContent = Math.floor(celcius)
                } else {
                    degreeUnit.textContent = "F";
                    degreeDigit.textContent = temperature;
                }
            })

            })
        })

    }
    let currentTime = document.querySelector(".current-time");

    currentTime.textContent = new Date().toLocaleTimeString('en-US',
        { hour12: true,
        hour: "numeric",
        minute: "numeric"});

    let apiSearch = `api.openweathermap.org/data/2.5/weather?q=lagos&APPID=b3512dc0dae234ec7f451cc5623d518a`;
        fetch(apiSearch)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })

    function setIcons(iconId, icon) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
})
