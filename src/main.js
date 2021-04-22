import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './js/weather-service.js'
import Photos from './js/photos.js'
import ImageOfTheDay from './js/image-of-the-day';

function getElements(response) {
    let latestDay = response.sol_keys.length - 1;
    let todaysDate = response.sol_keys[latestDay];
    if (response[todaysDate]) {
        $("#date-today").text(`This data was pulled from ${Date(response[todaysDate].First_UTC)}`)
        $("#season").text(`The current season is: ${response[todaysDate].Northern_season}`)
        $("#pressure-elements").html(`<p>Average air pressure reading: ${response[todaysDate].PRE.av}</p> <p>Current data point count: ${response[todaysDate].PRE.ct}</p> <p>Minimum reading: ${response[todaysDate].PRE.mn}</p> <p>Maximum reading: ${response[todaysDate].PRE.mx}</p>`)
        console.log(response)
    } else {
        $("#show-weather-errors").text(`${response}`)
    }
}

function getPhotoElements(response) {
    if (response.photos[0] === undefined) {
        $("#show-photo-errors").text("There are no photos for this day")
    }
    else if (response.photos[0].img_src) {
        $("#displayImage").html(`<img src=${response.photos[0].img_src} width="100%">`);
    } else {
        $("#show-photo-errors").text(`${response}`);
    }
}

function getPhotoOfTheDay(response) {
    let backgroundImageUrl = response.hdurl;
    if (response.hdurl) {
        $("body").css("background-image", `url(${backgroundImageUrl})`);
        console.log("response: " + response);
        console.log("backgroundImageUrl " + backgroundImageUrl);
    } else {
        let url = "./../assets/img/background-image.jpg"
        $("body").css("background-image", `url(${url})`);
        console.log("This is the else section");
        console.log("response: " + response);
        console.log("backgroundImageUrl " + backgroundImageUrl);
    }
}

function addTodayInput() {
    let today = new Date().toISOString().slice(0, 10);
    $('#input').append(`<input type="date" id="earthDate" class="form-control" value="${today}">`);
}



$(document).ready(function () {
    ImageOfTheDay.getDailyPhoto()
        .then(function (response) {
            getPhotoOfTheDay(response);
        });

    // getPhotoOfTheDay();
    addTodayInput();
    WeatherService.getWeather()
        .then(function (response) {
            getElements(response)
        });
    $("#main-page").submit(function (event) {
        event.preventDefault();
        $("#show-photo-errors").html("");
        $("#displayImage").html("");
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
