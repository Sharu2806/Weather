import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default class NewLayout extends Component {
    getWeatherForDay = () => {
        let list = [];
        return Object.values(this.props.forcastData).map((item, i) => {
            const day = moment(new Date(item[i].date * 1000)).format('dddd');
            const weatherList = item.map((data, i) => {
                return (
                        <div className="item" key={`${i}_record`}>
                            <p>{data.time}</p>
                            <img src={`https://openweathermap.org/img/wn/${data.icon}.png`} alt="cloud" />
                            <p><span>{data.min}&#8451; </span><span> {data.max}&#8451;</span></p>
                            <p>Humidity: {data.humidity}</p>
                        </div>
                )
            });
            return (<div className="flex-box">
                <p className="item">{day}</p>
                {weatherList}
            </div>)
        })
    }
    render() {
        return (
            <section className="section">
                <div className="section-head">
                    <header className="item">Weather in {this.props.cityName}</header>
                    <Link className="item" to={{pathname: "/statistics", state: { forcastData: this.props.forcastData}}}>
                        Find More..
                    </Link>
                </div>
                <div className="details">
                    {this.getWeatherForDay()}
                </div>
            </section>
        )
    }
}