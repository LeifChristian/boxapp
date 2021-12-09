import React, { Component, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import {
    SafeAreaView,
    ScrollView,
    StatusBar, Platform,
    StyleSheet,
    Text, 
    useColorScheme,
    View,
    TextInput, 
    Button,
    PermissionsAndroid,
  } from 'react-native';

  import Form from 'react-native-form'
  import BaseHeader from './BaseHeader'

  // import Geolocation from 'react-native-geolocation-service';

//   import Form from 'react-native-form'


// import styles from './AppCSS';
// import GoogleMapReact from 'google-map-react';
// import { geolocated } from "react-geolocated";
// import { useState, useEffect } from "react";

class Weather extends Component {

  constructor(props) {
    super(props);
            this.state = {
              city: 'Cabo Rojo',
              country: '',
              count: 0,
              switch: 'off',
              lat: '',
              long: '',
              windspeed: '',
              temperature: '',
              description: '',
              rain: '',
              text: '',
              url: ''
          
              };
    
  }


  changeHandler = (e) => {
    this.setState({
      city: e.target.value
    });
    e.preventDefault();
    
  }


  submitForm = async (e) => {
    
    //   alert(this.state.city + " city");

    this.setState({rain: ''});

    const API_KEY='e37662e2508a1d950408d6a6ebb47251';
    // e.preventDefault();
    this.setState({city: this.state.city.toLowerCase()})
    // alert (`Your current city is ${this.state.city}`)
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${API_KEY}`);
    const response = await api_call.json();

    console.log(`response code ${response.cod}`)

    const forecast_api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${API_KEY}`);
    const forecast_response = await forecast_api_call.json();

    console.log(`forecast response code ${forecast_response.cod}`);

    if (response.cod === '404') {alert('City Not Found!');}

    else {

      let TempInF = response.main.temp * (9/5) - 459.67;
      let shortTempInF = TempInF.toFixed(2);
      let windVar = response.wind.speed*2.23694;
      // let windVar = response.wind.speed;
      let windOtherVar=windVar.toFixed(2);
      console.log(` It's ${shortTempInF} °F`);
  
      this.setState({
      lat: response.coord.lat,
      long: response.coord.lon,
      temp: shortTempInF,
      city: response.name,
      windspeed: windOtherVar,
      count: this.state.count+1,
      rain: response.weather[0].description,
      })
    //   document.getElementById('formInput').value='';
    console.log(response)
    console.log(windOtherVar)
    
        }
      }

 getLocation = async () => {  

    
        Geolocation.getCurrentPosition(
            (position) => {
            //   console.log(position.coords);
            this.setState({lat: position.coords.latitude, long: position.coords.longitude})
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
     

    //   alert(this.state.lat + " LAT" + this.state.long);
  
    const API_KEY='e37662e2508a1d950408d6a6ebb47251';

    // const crd = position.coords;
    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);

    // const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${API_KEY}`);
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&appid=e37662e2508a1d950408d6a6ebb47251`);
    const response = await api_call.json();
    console.log(response);

    const forecast_api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=e37662e2508a1d950408d6a6ebb47251`);
    const forecast_response = await forecast_api_call.json();

//     console.log(`forecast response temp ${forecast_response['list'][0]['main']['temp']}`);

    if (response.cod ==="400") {alert('Error')}
            else {let TempInF = response.main.temp * (9/5) - 459.67;
  let wind =response.wind.speed;
//   console.log("wind: " +wind);
  let shortTempInF = TempInF.toFixed(2);
  let windVar = response.wind.speed*2.23694;
  // let windVar = response.wind.speed;
  let windOtherVar=windVar.toFixed(2);
            //  console.log(` It's ${this.shortTempInF} °F`)
            
         

            this.setState({
            temp: shortTempInF,
            windspeed: windOtherVar,
            city: response.name,
            count: this.state.count+1,
            rain: response.weather[0].description
            });

console.log('rainng! ' + this.state.rain);
let windRound = 2.23694*this.state.windspeed;
// windRound = this.state.windspeed;
// let windFixed= windRound.toFixed(2);
// console.log(windRound.toFixed(2));
console.log(`Lat: ${this.state.lat} Long: ${this.state.long} mapped to state `);
        }
        }

  render() {
    return (

            <WebView 
        style={styles.WebViewStyle} 
        source={{uri: 'https://Google.com'}} 
        javaScriptEnabled={true}
        domStorageEnabled={true}  />

 
 
   
  )

  }
}

const styles = StyleSheet.create({
    container2: {
      marginTop: 40,
      textAlign: 'center'
    },
    container: {
        marginTop: 20,
        textAlign: 'center'
      },

    bigBlue: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
    },
    red: {
      color: 'red',
    },

buttonContainer: {
    marginTop: .5
}
  });

export default Weather;