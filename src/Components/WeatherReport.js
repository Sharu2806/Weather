import React, { Component, Fragment } from 'react';
import moment from 'moment';

class WeatherReport extends Component{

    getDay = (date) => {
        return moment(new Date(date * 1000)).format('dddd');
    }

    getforcastData = () => this.props.forcastData.map((data, key ) => {
        return (
            <div className="item" key={`item${key}`}>
                <p>{this.getDay(data.dt)}</p>
                <p>{data.temp.day}</p>
                <p>{data.temp.night}</p>
                <p>{data.humidity}</p>
            </div>
        );
    });

    render() {
        return (
            <div className="board">
                <div className="item">
                    <p>Day/Date</p>
                    <p>Day Temperature</p>
                    <p>Night Temperature</p>
                    <p>Humidity</p>
                </div>
                {this.props.forcastData ? this.getforcastData() : null}
            </div>
        )
    }
}

export default WeatherReport;