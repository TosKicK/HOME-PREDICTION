function getLocationNames() {
    fetch("http://127.0.0.1:5000/get_location_names")
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

    // ✅ Show loading BEFORE fetch
    document.getElementById("uiEstimatedPrice").innerHTML = "⏳ Estimating Price...";

    fetch("http://127.0.0.1:5000/predict_home_price", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
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
        console.error("Error:", error);
        document.getElementById("uiEstimatedPrice").innerHTML =
            "❌ Error predicting price";
    });
}

window.onload = getLocationNames;