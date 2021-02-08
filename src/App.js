import React, {useState} from 'react';

import './App.css';
import CitySelector from "./components/CitySelector/CitySelector";
import WeatherTable from "./components/WeatherTable/WeatherTable";
import {apiKey} from "../src/data/data";

function App() {

    const [selectedCities, setSelectedCities] = useState([]);
    const [displayData, setDisplayData] = useState([]);

    function loadData(fetchCities) {
        let apiCalls = fetchCities.map((city) => fetch(`http://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${apiKey}`));
        return Promise.all(apiCalls).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            }))
                .then(function (data) {
                    return data.map(weatherData => (
                        {
                            id: weatherData.id,
                            name: weatherData.name,
                            temp: weatherData.main.temp,
                            temp_min: weatherData.main.temp_min,
                            updated_at: new Date().toLocaleString().split(",")[1]
                        }
                    ));
                }).catch(error => {
                    // if there's an error, log it
                    console.log(error);
                });
        })
    }

    function addCities(city) {
        let cityDetails = city.target.value;
        let cityData = cityDetails.split("|");
        if (!selectedCities.find(ele => ele.id === cityData[0])) {
            setSelectedCities([...selectedCities, {id: Number(cityData[0]), name: cityData[1]}]);
            loadData([{id: cityData[0], name: cityData[1]}]).then(function (data) {
                setDisplayData([...displayData, ...data]);
            })
        }
    }

    function removeCities(id) {
        // Filter out the cities other than the city to be removed
        setSelectedCities(selectedCities.filter(ele => ele.id != id));
        setDisplayData(displayData.filter(ele => ele.id != id));
    }

    function reloadAllData() {
        setDisplayData([]);
        loadData(selectedCities).then(data => {
            setDisplayData(data);
        });
    }

    function reloadCityData(city, index) {
        loadData([city]).then(data => {
            setDisplayData([...displayData.slice(0, index), ...data, ...displayData.slice(index + 1)]);
        });
    }

    return (
        <div className="App">
            <CitySelector addCities={addCities} removeCities={removeCities}
                          selectedCities={selectedCities}></CitySelector>
            <div className="WeatherTableContainer">
                <WeatherTable displayData={displayData} reloadCityData={reloadCityData}></WeatherTable>
            </div>
            <button onClick={reloadAllData} className="ReloadButton">Reload</button>
        </div>
    );
}

export default App;
