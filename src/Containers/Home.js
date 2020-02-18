import React, { Component } from 'react';
import axios from 'axios';
import { Header, WeatherReport, GetMeanMode } from '../Components/index';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            forcastDetails: []
        }
    }

    fetchWeatherData = () => {
        //const url = `https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${this.state.cityName}&lat=35&lon=139&cnt=5&units=metric%20or%20imperial`
        const url = 'http://localhost:3000';
        axios.get(url, 
            /* {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "d96c2b1439mshc4ab675fad44763p1f7ba4jsn5375fc3fbfdc"
        } }*/).then((response) => {
            console.log(response);
            this.setState(() => {
                return {
                    cityName: response.data.city.name,
                    forcastDetails: response.data.list
                }
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    onChangeInput = (e) => {
        const { target: { value } } = e;
        const { state } = this;
        state["cityName"] = value;
    }

    onBlur = (e) => {
        const { target: { value } } = e;
        this.setState((state) => {
            state["cityName"] = value;
            return { ...state };
        });
    }
    render() {
        return(
            <div>
                <Header cityName={this.state.cityName} />
                <div className="section">
                    <input type="text" id="searchCity" value={this.state.cityName} onChange={this.onChangeInput} onBlur={this.onBlur} />
                    <button onClick={this.fetchWeatherData} disable={(this.state.cityName !== '').toString()}>Search</button>
                </div>
                {this.state.forcastDetails.length > 0 ? <WeatherReport forcastData={this.state.forcastDetails} /> : null}
                {this.state.forcastDetails.length > 0 ? <GetMeanMode forcastData={this.state.forcastDetails} /> : null}
            </div>
        );
    }
}

export default Home;