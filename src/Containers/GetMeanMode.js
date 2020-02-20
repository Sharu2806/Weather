import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class GetMeanMode extends Component {
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

    componentDidMount() {
        const { forcastData } = this.state;
        const { forcastData: fetchedData } = this.props.location ? this.props.location.state : {};
        if (JSON.stringify(forcastData) !== JSON.stringify(fetchedData)){
            const filteredRecord = Object.values(fetchedData).map((item) => {
                    return item.map((data) => data);
                })
            
            this.setState({
                filteredRecord
            });
        }
    }

    setValues = (value) => {
        this.setState({
            value
        });
    }

    getFilteredData = (record, param) => {
        return record.map((data) => data[0][`${param}`]);
    }

    getMin = () => {
        const filteredValues = this.getFilteredData(this.state.filteredRecord, "min");
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
        const filteredValues = this.getFilteredData(this.state.filteredRecord, "max");
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
        const filteredMinValues = this.getFilteredData(this.state.filteredRecord, "min");
        const filteredMaxValues = this.getFilteredData(this.state.filteredRecord, "max");
        const combineMinMax = [...filteredMinValues, ...filteredMaxValues];
        const totalMinTemp = combineMinMax.reduce(((accumlator, currentData) => {
            return accumlator += currentData;
        }));
        const meanValue  = totalMinTemp/(combineMinMax.length);
        this.setState({
            meanValue
        });
    }

    getMode = () => {
        const filteredMinValues = this.getFilteredData(this.state.filteredRecord, "min");
        const filteredMaxValues = this.getFilteredData(this.state.filteredRecord, "max");
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

export default withRouter(GetMeanMode);