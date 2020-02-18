import React, { Component } from 'react';

export default class GetMeanMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredRecord: [],
            minValue: '',
            maxValue: '',
            meanValue: '',
            modeValue: ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (JSON.stringify(state.forcastData) !== JSON.stringify(props.forcastData)){
            return { filteredRecord: props.forcastData.map((data) => data.temp) }
        }
        return null;
    }

    setValues = (value) => {
        this.setState({
            value
        });
    }

    getMin = () => {
        const filteredValues = this.state.filteredRecord.map((data) => data.min);
        const minValue = filteredValues.reduce(((accumlator, currentData) => {
            if (accumlator <= currentData) {
                return accumlator;
            } else if ( currentData <= accumlator){
                return currentData;
            }
        }));
        this.setState({
            minValue
        });
    }

    getMax = () => {
        const filteredValues = this.state.filteredRecord.map((data) => data.max);
        const maxValue = filteredValues.reduce(((accumlator, currentData) => {
            if (accumlator >= currentData) {
                return accumlator;
            } else if ( currentData >= accumlator){
                return currentData;
            }
        }));
        this.setState({
            maxValue
        });
    }

    getMean = () => {
        const filteredMinValues = this.state.filteredRecord.map((data) => data.min);
        const filteredMaxValues = this.state.filteredRecord.map((data) => data.max);
        const combineMinMax = [...filteredMinValues, ...filteredMaxValues];
        const totalMinTemp = combineMinMax.reduce(((accumlator, currentData) => {
            return accumlator += currentData;
        }));
        console.log();
        const meanValue  = totalMinTemp/(combineMinMax.length);
        this.setState({
            meanValue
        });
    }

    getMode = () => {
        const filteredMinValues = this.state.filteredRecord.map((data) => data.min);
        const filteredMaxValues = this.state.filteredRecord.map((data) => data.max);
        const combineMinMax = [...filteredMinValues, ...filteredMaxValues];
        let commonElem = [];
        combineMinMax.map((data) => {
            const elem = combineMinMax.filter((val) => data === val);
            if(elem.length > commonElem.length) {
                commonElem = elem;
            }
        });
        this.setState({
            modeValue: commonElem.length > 1 ? commonElem[0] : "No Mode found"
        });
    }

    render() {
        return (
            <div className="section">
                <div className="details-container">
                    <div className="item">
                        <p>Min Value: {this.state.minValue}</p>
                        <p>Max Value: {this.state.maxValue}</p>
                    </div>
                    <div className="item">
                        <p>Mean Value: {this.state.meanValue}</p>
                        <p>Mode Value: {this.state.modeValue}</p>
                    </div>
                </div>
                <div className="buttonContainer">
                    <div className="item">
                        <button onClick={this.getMin}>Get Min</button>
                    </div>
                    <div className="item">
                        <button onClick={this.getMax}>Get Max</button>
                    </div>
                    <div className="item">
                        <button onClick={this.getMean}>Get Mean</button>
                    </div>
                    <div className="item">
                        <button onClick={this.getMode}>Get Mode</button>
                    </div>
                </div>
            </div>
        )
    }
}