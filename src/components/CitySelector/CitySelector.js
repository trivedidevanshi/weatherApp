import {cities} from "../../data/data";

import Tag from "../../library/Tag/Tag"
import './CitySelector.css'

function CitySelector(props) {
    let {selectedCities, addCities, removeCities} = props;
    let optionItems = cities
        .filter(city=>!selectedCities.find(selectedCity=>city.id===selectedCity.id))
        .map((city) =>
        <option key={city.id} value={city.id+"|"+city.name}>{city.name}</option>
    );
    let cityData = selectedCities.map((city)=>
        <Tag key = {city.id} id={city.id} name={city.name} removeCities={removeCities}/>
    );

    return (
        <div className="CitySelector">
            <span>
                {cityData}
            </span>
            <select onChange={addCities} defaultValue={""}>
                <option value="" >Choose a city...</option>
                {optionItems}
            </select>
        </div>
    );
}

export default CitySelector;
