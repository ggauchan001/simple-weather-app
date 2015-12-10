$(document).ready(function () {

    console.log("hello");


    weatherApp = {

        $targetArea: $("#weather"),

        weatherApiKey: "",

        localStorageKey: "openWeatherApi",


        getFormData: function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apikey").val().trim();
                weatherApp.saveApiKey();
            }
            var zip = $("#zip").val().trim();
            if (zip === null) {
                (weatherApp.$targetArea.html("Enter a zip code.")).insertBefore($("#form"));
            }
            else if(zip.length != 5) {
                (weatherApp.$targetArea.html("Zip code is not valid. It must be 5 characters long!")).insertBefore($("#form"));
            } 
            else {
                weatherApp.getWeatherData(zip);
            }

            console.log(apikey);
            console.log(zip);
        },

        getWeatherData: function (zipcode) {
            var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

            $.getJSON(url, function (data) {
                if (data.cod === 200) {

                    // THIS IS WHERE YOU WOULD ADD THE DATA TO THE PAGE
                    weatherDesc = data.weather[0].description;
                    //weatherApp.$targetArea.html(weatherDesc);

                    weatherCity = data.name;

                    weatherCurrentTemp = data.main.temp;
                    weatherMaxTemp = data.main.temp_max;
                    weatherMinTemp = data.main.temp_min;
                    weatherCountry = data.sys.country;
                    weatherHumidity = data.main.humidity;
                    weatherWindSpeed = data.wind.speed;
                    //                                    console.log(weatherDesc);
                    //                                    console.log(weatherCity);
                    //                                    console.log(weatherMaxTemp);
                    //                                    console.log(weatherMinTemp);
                    //                                    console.log(weatherCountry);
                    //                                    console.log(weatherHumidity);
                    //                                    console.log(weatherWindSpeed);

                    weatherApp.$targetArea.html(
                        "</br><li><b>Success!</b>" +
                        "<li>Here is the weather information for " +"<b>"+ weatherCity +"</b>" +
                        "<li>Currently, " + weatherDesc +
                        "<li> Current Temperature: " + weatherCurrentTemp +"°F"+
                        "<li> Maximum Temperature: " + weatherMaxTemp +"°F"+
                        "<li> Minimum Temperature: " + weatherMinTemp +"°F"+
                        "<li> Humidity: " + weatherHumidity +" %"+
                        "<li> Wind Speed: " + weatherWindSpeed +" mph"
                    );



                } else {
                    weatherApp.$targetArea.html("Sorry, no weather data available.!");
                }

            }).fail(function () {
                weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
            });


        },

        loadApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this brower.");
            } else {
                // Get API key
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    //weatherApp.$targetArea.html("Sorry, no Api Key was found.");
                    return false;
                }
                return true;

            }

        },

        saveApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this brower. ");
            } else {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.$targetArea.html("Sorry, you must enter an API Key.");
                } else {
                    localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                    $("#apidiv").attr("class", "hide");
                }
            }
        }
    }


    $("#submit").click(function () {

        weatherApp.getFormData();
        return false;

    });

    weatherApp.loadApiKey();
    if (weatherApp.loadApiKey()) {
        $("#apidiv").attr("class", "hide");
    }


});