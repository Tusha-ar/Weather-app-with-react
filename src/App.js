import React, { Component } from 'react'
import './App.css'
import Skycons from 'react-skycons'

export class App extends Component {

  constructor(){
    super();
    this.state={
      temp : null,
      humid: 0,
      windSpeed: 0,
      summary: "",
      icon: "",
      unit: "F"
    }
  }

  componentDidMount(){
    let lat;
    let long;
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(pos=>{
        lat = pos.coords.latitude;
        long = pos.coords.longitude;
        
        
        let proxy = `https://cors-anywhere.herokuapp.com/`;
        let api = `${proxy}https://api.darksky.net/forecast/b9ec8785be758ca20484c4940d52e161/${lat},${long}`;
        fetch(api)
        .then(response=>{
          return response.json();
        })
        .then(data=>{
          console.log(data);
          this.setState({
            temp: (data.currently.temperature).toPrecision(2),
            humid: data.currently.humidity,
            windSpeed: data.currently.windSpeed,
            summary: data.currently.summary,
            icon: (data.currently.icon).toUpperCase().replace(/-/g,"_")
          })
        })
      })
    }
  }
  toCelcius=()=>{
    const celcius = ((this.state.temp - 32 )* 5/9).toPrecision(2)
    if(this.state.unit === "F")
    {
    this.setState({
      temp : celcius,
      unit : "C"
    })
  }
  else 
  {
    const farn = ((this.state.temp * 9/5) + 32).toPrecision(2)
    this.setState({
      temp: farn,
      unit: "F"
    })
  }
  }
  render() {

    if(!this.state.temp){
      return(
        <div>
          Loading ...
        </div>
      )
    }
      const {temp,humid,windSpeed,summary,icon,unit} = this.state;
    return (
      <div className="full">

        <div className="temp" onClick={this.toCelcius}>{temp}
        <span>{unit}</span>
        </div>
        <div className="summary">{summary}</div>
        <div className="humid">Humidity: {humid}</div>
        <div className="speed">WindSpeed: {windSpeed}</div>
      </div>
    )
  }
}

export default App
