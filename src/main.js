import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './js/weather-service.js'
import Photos from './js/photos.js'

function getElements(response) {
    if (response[849]) {
        $("#date-today").text(`This data was pulled from ${Date(response[849].First_UTC)}`)
        $("#season").text(`The current season is: ${response[849].Northern_season}`)
        $("#pressure-elements").html(`<li>${response[849].PRE.av}</li> <li>${response[849].PRE.ct}</li> <li>${response[849].PRE.mn}</li> <li>${response[849].PRE.mx}</li>`)
    } else {
        $("#show-weather-errors").text(`${response}`)
    }
}

function getPhotoElements(response) {
    if (response.photos[0] === undefined) {
        $("#show-photo-errors").text("There are no photos for this day")
    }
    else if (response.photos[0].img_src) {
        $("#displayImage").html(`<img src=${response.photos[0].img_src}>`);
    } else {
        $("#show-photo-errors").text(`${response}`);
    }
}

function addTodayInput() {
    let today = new Date().toISOString().slice(0, 10);
    $('#input').append(`<input type="date" id="earthDate" class="form-control" value="${today}">`);
}

$(document).ready(function () {
    addTodayInput();
    WeatherService.getWeather()
        .then(function (response) {
            getElements(response)
        });
    $("#main-page").submit(function (event) {
        event.preventDefault();
        $("#show-photo-errors").val("");
        const roverName = $('#roverName').val();
        const earthDate = $('#earthDate').val();
        $('#roverName').val("");
        $('#earthDate').val("");

        Photos.getPhotos(roverName, earthDate)
            .then(function (response) {
                getPhotoElements(response);
            });
    });
});
