import React from 'react';

const Header = (props) => {
    return (
        <header><p>Weather for next 5 days in {props.cityName}</p></header>
    );
};

export default Header;