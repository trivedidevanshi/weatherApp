import './WeatherTable.css'
import reload from '../../library/Icons/reload.svg'

function WeatherTable(props) {
    let {displayData, reloadCityData} = props;
    let header = <tr>
                    <th></th>
                    <th>City Name</th>
                    <th>Temperature</th>
                    <th>Min Temperature</th>
                    <th>Updated at</th>
                </tr>;
    let rows = displayData.map((data,index)=>
        <tr key={data.id}>
            <td><button onClick={reloadCityData.bind(this,data,index)}><img src={reload}></img></button></td>
            <td>{data.name}</td>
            <td>{data.temp}</td>
            <td>{data.temp_min}</td>
            <td>{data.updated_at}</td>
        </tr>
    );
    return (
        <div className="WeatherTable">
            <table>
                <thead>
                    {header}
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

export default WeatherTable;