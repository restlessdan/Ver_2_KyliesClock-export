import document from "document";
import { HeartRateSensor } from "heart-rate";
import { goals } from "user-activity";
import { today } from "user-activity";
import * as messaging from "messaging"
import { localStorage } from "local-storage";
import * as simpleSettings from "./simple/device-settings";
//import { battery } from "power";

let hrmData = document.getElementById("hrm-data");
let stepData = document.getElementById("steps-data");
let hrm = new HeartRateSensor();

import clock from "clock";

import Weather from '../common/weather/device'

let hourHand = document.getElementById("hours");
let hour_hand = document.getElementById("hour-hand");
let minHand = document.getElementById("mins");
let min_hand = document.getElementById("min-hand");
let secHand = document.getElementById("secs");
let background = document.getElementById("background");

let provider = 0
// Enter your own api keys below
const PROVIDERS = [{ name : 'darksky', key : '7e818ab726ef76c5bb1cb8dbf60890dc' }]

// Create the weather object
let weather = new Weather();

//to add new screen on click, so that more detailed weather information can be shown to the watch face.
let showWeather = function(data){
  if (data) {
    document.getElementById("temperature").text = data.temperatureC.toFixed(1) + "°C"
    document.getElementById("description").text = data.description
  }
}

// Display the weather data received from the companion
weather.onsuccess = showWeather

weather.onerror = (error) => {
  console.log("Weather error " + JSON.stringify(error))
  
  document.getElementById("location").text = JSON.stringify(error)
}

let fetchWeather = function(){
  // Set the provider : yahoo / owm / wunderground / darksky / weatherbit
  weather.setProvider(PROVIDERS[provider].name)
  // set your api key
  weather.setApiKey(PROVIDERS[provider].key)
  
  document.getElementById("temperature").text = "--"
  document.getElementById("description").text = "--"
  
  weather.fetch()
}

showWeather( weather.getData() )

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  fetchWeather()
}

function settingsCallback(data){
  if (!data) {
    return;
  }
  if (data.colorBackground) {
    background.style.fill = data.colorBackground;
  }
  if (data.colorHourHand) {
    hour_hand.style.fill = data.colorHourHand;
  }
  if (data.colorMinHand) {
    min_hand.style.fill = data.colorMinHand;
  }
}

// Update the clock every second
clock.granularity = "seconds";

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

function getDay(index) {

  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[index];
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();
  
  let dateText1 = document.getElementById("day");
  let dateText2 = document.getElementById("date");
 
  //battery retreival
  //var bat = (Math.floor(battery.chargeLevel) + "%");
  //let battery = document.getElementById("battery");
  
  //battery.text = bat;
  dateText1.text = getDay(today.getDay());
  dateText2.text = today.getDate();
  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
}

// Update the clock every tick event
clock.ontick = () => updateClock();

hrm.start();

function refreshData() {
  let stepArc = document.getElementById("steps_arc");
  let StepGoal = goals.steps;
  let StepProgress = today.local.steps;
  
  let data = {
    hrm: {
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    }
  };
  if (hrm.heartRate == null){
    hrmData.text = "--";
  }
  else {hrmData.text = hrm.heartRate;}
  
  stepData.text = StepProgress;
 
  if(StepProgress >= 10000){
    stepArc.sweepAngle = 225;
    stepArc.style.fill = "springgreen";
  }
  else { 
    stepArc.sweepAngle = (StepProgress / 10000) * 225;
    stepArc.style.fill = "cyan";
  }
}

refreshData();
simpleSettings.initialize(settingsCallback);
setInterval(refreshData, 1000);