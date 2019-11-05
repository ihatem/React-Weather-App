import React, { Component } from "react";
import Head from "./components/head";
import Weather from "./components/weather";

import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends Component {
  state = {
    position: {
      lat: undefined,
      lon: undefined,
      name: undefined
    },
    temp: {
      fahr: undefined,
      cel: undefined,
      humidity: undefined,
      wind: undefined,
      summary: undefined,
      subSummary: undefined,
      icon: "CLEAR_DAY"
    }
  };

  getWeather = async geo => {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = `${proxy}https://api.darksky.net/forecast/${API_KEY}/${this.state.position.lat},${this.state.position.lon}`;

    axios
      .get(url)
      .then(res => {
        const { data } = res;
        this.setState(prevState => ({
          position: {
            ...prevState.position,
            name: geo ? data.timezone : this.state.position.name
          },
          temp: {
            fahr: Math.round(data.currently.temperature),
            cel: Math.round(((data.currently.temperature - 32) * 5) / 9),
            humidity: data.currently.humidity,
            wind: data.currently.windSpeed,
            summary: data.currently.summary,
            subSummary: data.hourly.summary,
            icon: data.currently.icon.replace(/-/g, "_").toUpperCase()
          }
        }));
      })
      .catch(err => {
        console.error(err);
      });
  };

  getGeoPos = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.setState(prevState => ({
          position: {
            ...prevState.position,
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          },
          temp: {
            ...prevState.temp
          }
        }));
        this.getWeather(true);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  componentDidMount() {
    this.getGeoPos();
  }

  render() {
    return (
      <div className="App">
        <Head
          position={this.state.position}
          temp={this.state.temp}
          getWeather={this.getWeather}
          getGeoPos={this.getGeoPos}
        />
        <Weather
          position={this.state.position}
          temp={this.state.temp}
          getWeather={this.getWeather}
        />
      </div>
    );
  }
}

export default App;
