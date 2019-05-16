window.addEventListener('load', () => {
    let long;
    let lat;
    
    let temperatureDescription = document.querySelector(".temperature-description");
    let locationTimezone = document.querySelector(".location-timezone");
    let degreeDigit = document.querySelector(".degree-digit");
    const degreeUnit = document.querySelector(".degree-unit");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition (position => {
           long = position.coords.longitude;
           lat = position.coords.latitude;
        
           const proxy = `https://cors-anywhere.herokuapp.com/`;
           const api = `${proxy}https://api.darksky.net/forecast/2d2ac40ce736c5ac04abcdea78457558/${lat},${long}`
           fetch(api)
           .then(response => response.json())
           .then(data => { 
               console.log(data);
               const {temperature, icon, summary} = data.currently;
               //SET DOM ELEMENTS FROM THE API
               degreeDigit.textContent = temperature;
               locationTimezone.textContent = data.timezone;
               temperatureDescription.textContent = summary;

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
    function setIcons(iconId, icon){
        const skycons =  new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);

    }
})