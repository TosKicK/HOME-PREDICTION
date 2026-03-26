function getLocationNames() {
    fetch("https://home-prediction.onrender.com/get_location_names")
    .then(response => response.json())
    .then(data => {
        const locations = data.locations;
        const uiLocations = document.getElementById("uiLocations");

        uiLocations.innerHTML = "";

        for (let i = 0; i < locations.length; i++) {
            let opt = new Option(locations[i]);
            uiLocations.append(opt);
        }
    });
}

function onClickedEstimatePrice() {
    let sqft = document.getElementById("uiSqft").value;
    let bhk = document.getElementById("uiBHK").value;
    let bath = document.getElementById("uiBathrooms").value;
    let location = document.getElementById("uiLocations").value;

    document.getElementById("uiEstimatedPrice").innerHTML = "⏳ Estimating...";

    fetch("https://home-prediction.onrender.com/predict_home_price", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            total_sqft: sqft,
            location: location,
            bhk: bhk,
            bath: bath
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("uiEstimatedPrice").innerHTML =
            "₹ " + data.estimated_price + " Lakhs";
    })
    .catch(error => {
        document.getElementById("uiEstimatedPrice").innerHTML =
            "❌ Error predicting price";
    });
}

window.onload = getLocationNames;