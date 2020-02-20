import React from 'react';

const Header = (props) => {
    return (
        <div className="section">
            <input type="text" id="searchCity" value={props.cityName} onChange={props.onChange} />
            <button onClick={props.fetchWeather}>Search</button>
        </div>
    );
};

export default Header;