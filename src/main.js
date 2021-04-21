import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './js/weather-service.js'

function getElements(response) {
    if (response[845]) {
        $("#date-today").text(`This data was pulled from ${Date(response[845].First_UTC)}`)
        $("#season").text(`The current season is: ${response[845].Northern_season}`)
        $("#pressure-elements").html(`<li>${response[845].PRE.av}</li> <li>${response[845].PRE.ct}</li> <li>${response[845].PRE.mn}</li> <li>${response[845].PRE.mx}</li>`)
    } else {
        $("#show-errors").text(`${response}`)
    }
}

$(document).ready(function () {
    $("#main-page").submit(function (event) {
        event.preventDefault();

        WeatherService.getWeather()
            .then(function (response) {
                getElements(response)
            });
    });
});