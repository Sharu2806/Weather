import React, { Component } from 'react';
import axios from 'axios';
import { Header, NewLayout } from '../Components/index';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            name: '',
            forcastDetails: []
        }
    }

    setFetchedData = (res) => {
        const weatherData = {};
        res.list.filter((data, i) => {
            const key = data.dt_txt.substring(0,10);
            let obj = {};
            obj = {
                "min": data.main.temp_min,
                "max": data.main.temp_max,
                "humidity": data.main.humidity,
                "icon": data.weather[0].icon,
                "time": data.dt_txt.substring(11,19),
                "date": data.dt
            }
            if(weatherData.hasOwnProperty(key)) {
                weatherData[key].push(obj);
            } else {
                weatherData[key] = [];
                weatherData[key].push(obj);
            }
        })
        this.setState(() => {
            return {
                cityName: res.city.name,
                forcastDetails: weatherData
            }
        })
    }

    fetchWeatherData = () => {
        if(this.state.name !== '') {
            const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.name}&appid=fbd00013df4d8827181824be982f254e&units=metric`;
            axios.get(url)
            .then((response) => {
                this.setFetchedData(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    onChangeInput = (e) => {
        const { target: { value } } = e;
        this.setState(() => {
            return { name: value }
        })
    }

    render() {
        const checkLength = Object.values(this.state.forcastDetails).length;
        return(
            <div>
                <Header cityName={this.state.name} onChange={this.onChangeInput} fetchWeather={this.fetchWeatherData} />
                {checkLength > 0 ? <NewLayout forcastData={this.state.forcastDetails} cityName={this.state.cityName} /> : null}
            </div>
        );
    }
}

export default Home;