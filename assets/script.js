var apiKey = "9612cbacdd5ba9a49362661b9ca9dfec";
var CurrentDate = moment();


var cities = JSON.parse(localStorage.getItem('cities'));
if (cities === null){
    cities = []
}

cities.forEach(function(city){
    SearchHistory(city);
})


$(".btn").click(function(){
    cities = JSON.parse(localStorage.getItem('cities'));

    var textbox = $(this).parent().siblings("#textbox")
    var search = textbox.val()

    if (search == "" || search == null){
        return;
    }

    textbox.val("");

    if(cities === null){
        cities = [search]
    }
    else{
        cities.push(search)
    }
    
    
    
    SearchHistory(search);
    GetData(search);
    
    localStorage.setItem("cities", JSON.stringify(cities));

});

// $(".city").click(function(){
$(document).on("click", ".city", function(){
    GetData($(this).text())
});

function GetData(citySearch){
    

    var header = $("<h3>");
        header.text(citySearch + " (" + CurrentDate.format('L') + ")");
    var temperature = $("<p>");
    var humidity = $("<p>");
    var windSpeed = $("<p>");
    var UV = $("<p>");
    UV.text("UV Index:  ")


    var url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&APPID=${apiKey}&units=imperial`;
    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        var temp = response.main.temp
        temperature.text("Temperature: " + temp + String.fromCharCode(176) + "F");
        humidity.text("Humidity: " + response.main.humidity + "%")
        windSpeed.text("Wind Speed: " + response.wind.speed + " MPH");

        var icon = $("<img>");
        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        icon.attr("src",iconurl)
        
        header.append(icon);

        var lon = response.coord.lon;
        var lat = response.coord.lat

        var indexUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&APPID=${apiKey}`

        $.ajax({
            url: indexUrl,
            method: "GET"
        }).then(function(response) {
            var UvText = $("<span>");
            UvText.text(response.value)
            UvText.addClass("UV");
            UV.append(UvText);
        })

    });

    

    var details = $("<div>");
        details.addClass("details")
        details.append(header,temperature,humidity,windSpeed,UV);
    var forecastHeader = $("<h4>");
        forecastHeader.addClass("mt-3")
        forecastHeader.text("5-Day Forecast:")
    var days = $("<div>");
        days.addClass("row justify-content-between mx-1")








        var url = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&APPID=${apiKey}&units=imperial`;
        $.ajax({
            url: url,
            method: "GET"
        }).then(function(response) {
            
        
    for( i = 0; i < 5; i++ ){
        var day = $("<div>");
        day.addClass("col-2 day px-1 pt-2");
        var CurrentDate = moment();
        CurrentDate.add(i, 'days').format("L");
        var date = $("<h6>");
        date.text(CurrentDate.format("L"));

        var icon = $("<img>");
        var iconcode = response.list[i].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        icon.attr("src",iconurl)

        var temp = $("<p>");
        temp.text("Temp: " + response.list[i].main.temp +  String.fromCharCode(176) + "F");
        var humid = $("<p>");
        humid.text("Humidity: " + response.list[i].main.humidity + "%");

        day.append(date,icon,temp,humid);
        days.append(day)
    }

    var forecast = $("<div>");
    forecast.append(forecastHeader, days)

    var rightContainer = $(".right-container");
    rightContainer.empty();
    rightContainer.append(details,forecast);

    });
}

function SearchHistory(citySearch){
    var city = $("<div>");
    city.addClass("col-12 city py-2");
    city.text(citySearch)
    $(".left-container").append(city);
    
}

