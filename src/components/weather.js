import React, { Component } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import CountUp from 'react-countup';

class Weather extends Component {

    state = {
        celOn: true
    }
    
    switchCel = () => {
        this.setState({ celOn: !this.state.celOn })
    }

    render() {
        return (
            <div className="weather">
                <div className="visual">
                    <ReactAnimatedWeather
                        icon={this.props.temp.icon}
                        color='#22A7F0'
                        size='300'
                        animate='true'
                    />
                    <div className="text">
                        <h3>{this.props.temp.summary}</h3>
                        <p>{this.props.temp.subSummary}</p>
                    </div>
                </div>
                <div className="figures">
                    <div className="figuresWrap">
                        <div className="mainFigureWrap">
                            <CountUp
                                start={!this.state.celOn ? this.props.temp.cel : this.props.temp.fahr}
                                end={this.state.celOn ? this.props.temp.cel : this.props.temp.fahr}
                                duration={2}
                                >
                                {({ countUpRef, start }) => (
                                    <h1 ref={countUpRef}></h1>
                                )}
                            </CountUp> 
                        </div>
                        <div onClick={this.switchCel} className="CelSwitchWrap">
                            <div className={"CelSwitch" + (this.state.celOn ? "" : " transition")}>
                                <h3>C°</h3>
                                <h3>F°</h3>
                            </div>
                        </div>
                    </div>
                    <div className="addFigures">
                        <div className="wind">
                            <span></span>
                            <p>{this.props.temp.wind} m/s</p>
                        </div>
                        <div className="humidity">
                            <span></span>
                            <p>{this.props.temp.humidity}%</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Weather;
