document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("weatherForm");
    const cityInput = document.getElementById("ville");
    const longitudeInput = document.getElementById("long");
    const latitudeInput = document.getElementById("latitude");
    const weatherResult = document.getElementById("form1"); // Div contenant le formulaire et les résultats

    // Clé API (remplacez par votre propre clé)
    const API_KEY = "951984a8d2b5e7508eedab48ed6afad5";
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";

    // Fonction pour récupérer les données météo
    async function fetchWeather(city) {
        try {
            const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`);
            if (!response.ok) {
                throw new Error("Ville non trouvée");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erreur lors de l'appel API :", error);
            return null;
        }
    }

    // Fonction pour effacer les anciens résultats
    function clearPreviousResults() {
        const oldResults = weatherResult.querySelectorAll(".weather-info");
        oldResults.forEach(result => result.remove());
    }

    // Fonction pour mettre à jour les champs Longitude, Latitude et afficher d'autres données
    function updateFields(data) {
        // Efface les anciens résultats
        clearPreviousResults();

        if (data) {
            longitudeInput.value = data.coord.lon || "Non disponible";
            latitudeInput.value = data.coord.lat || "Non disponible";

            // Crée les nouveaux éléments pour afficher les données
            const temperature = document.createElement("p");
            temperature.textContent = `Température : ${data.main.temp}°C`;
            temperature.classList.add("weather-info"); // Classe pour identifier les éléments ajoutés

            const conditions = document.createElement("p");
            conditions.textContent = `Conditions : ${data.weather[0].description}`;
            conditions.classList.add("weather-info"); // Classe pour identifier les éléments ajoutés

            weatherResult.appendChild(temperature);
            weatherResult.appendChild(conditions);
        } else {
            longitudeInput.value = "Erreur";
            latitudeInput.value = "Erreur";
        }
    }

    // Écouteur d'événement sur le formulaire
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        const city = cityInput.value.trim();

        if (city === "") {
            alert("Veuillez entrer une ville.");
            return;
        }

        longitudeInput.value = "Chargement...";
        latitudeInput.value = "Chargement...";
        const data = await fetchWeather(city);
        updateFields(data);
    });
});
